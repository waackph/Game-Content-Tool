import sys
from pymongo import MongoClient
from bson import json_util
import json

def get_collection_content(collection):
    CONNECTION_STRING = "mongodb://root:rootpw@127.0.0.1:5012"
    client = MongoClient(CONNECTION_STRING)
    db = client['conscious_db']
    coll = db[collection]
    return list(coll.find({}, {'_id': False}))
    # for x in coll.find():
    #     print(x)
    #     print()

def is_default_thought(thought):
    return (len(thought['Links']) > 0 
            and thought['Links'][0]['Option'] == "First link"
            and len(thought['Links'][0]['NextNode']['Links']) == 0)

def modify_dict(obj):
    # If obj is a list of dict, then call the function for each dict
    if type(obj) is list and len(obj) > 0 and type(obj[0]) is dict:
        for i, d in enumerate(obj):
            obj[i] = modify_dict(d)
    # If a dict, then modify it accordingly
    elif type(obj) is dict:
        # remove unneeded fields
        fields_to_remove = ['_id', 'x', 'y']
        for field in fields_to_remove:
            if field in obj.keys():
                del obj[field]
        # if dialog link: remove Id field as well (used for graphinput)
        if '_nextNodeId' in obj.keys() and 'Id' in obj.keys():
            del obj['Id']
        # Remove default data structures
        if 'Thought' in obj.keys() and type(obj['Thought']) == dict and is_default_thought(obj['Thought']):
            obj['Thought'] = None
        if 'ThoughtSequence' in obj.keys() and not obj['ThoughtSequence'].get('Commands'):
            obj['ThoughtSequence'] = None
        if 'EntrySequence' in obj.keys() and not obj['EntrySequence'].get('Commands'):
            obj['EntrySequence'] = None
        if 'CombineItem' in obj.keys() and not obj['CombineItem'].get('Name'):
            obj['CombineItem'] = None
        # Remove file ending of texturePath
        if obj.get('texturePath'):
            obj['texturePath'] = obj['texturePath'].split('.png')[0]
        # Remove node if no further thought exists ('lastnode')
        if obj.get('IsFinal') and obj.get('NextNode').get('Thought') == 'lastnode':
            obj['NextNode'] = None
        # Remove last node, if last dialog edge
        if obj.get('_dialogLine') and obj.get('_nextNodeId') and obj.get('isFinalDialogOption'):
            obj['_nextNodeId'] = 0
        # Change thoughtlink to finalthoughtlink if isfinal is true
        if obj.get('IsFinal') and obj.get('linkType'):
            obj['linkType'] = 'conscious.DataHolderFinalThoughtLink, conscious'
        # change type field name to '$type' and reorder so that $type is at first position
        has_type = [k for k in obj.keys() if 'type' in k.lower()]
        if has_type and len(has_type) == 1:
            new_obj = {'$type': obj[has_type[0]]}
            del obj[has_type[0]]
            new_obj.update(obj)
            obj = new_obj
        for k in obj.keys():
            if type(obj[k]) == dict or type(obj[k]) == list:
                obj[k] = modify_dict(obj[k])
    return obj

def prepare_json(l):
    # General stuff to change in the GCT
    # [x] Types: use following pattern - "conscious.[Objectname], conscious"
    # [x] [Room] Combine "Items" and "Characters" List into "Things" List
    # [x] [Room] remove "__v"
    # [x] [Room] Add fields SoundFilePath, LightMapPath
    # [x] [Thing] add DrawOrder field
    # [x] [Door] add fields InitPlayerPosX, InitPlayerPosY, CloseTexturePath, RoomId
    # [x] [ThoughtNode] rename _id to Id, add field LinkageId
    # [x] [ThoughtLink] ValidMoods must have value 0 as default (no empty list)
    # [x] [ThoughtNode/ThoughtLink] Add type info (DataHolderX)
    # [x] [Thought] default thought data structure must have unique IDs (currently its just hard coded as 1, 2, ...)
    # [x] [ThoughtNode/Link] UI: Clicking different nodes/edges leads to "too much recursion" error 
    #   -> This has happened because of the changed data model, leading to Ids being undefined
    # [x] [TreeStructure] node/link: remove x, y
    # [x] [TreeStructure] link: remove _id, Id (removed in post processing script)
    # [x] [sequence] remove field _currentIndex and SequenceFinished; 
    # [x] [sequence] rename _commands -> Commands
    # [x] [sequence] debug for room views
    # [x] [Command] only use valid fields for the respective command type
    # [x] [Command] Add missing commands with types
    # [x] [Defaults] If on submit a default data structure is still the same, then do not submit it to the backend or submit it as null
    # [x] [Changes] things that needed to be changed to be similar to Game Data Structure:
        # /- texturePath: "textures/..." -> "Backgrounds/..."
        # /- Thought: null stead of default thought data structure
        # /- Add correct song file name: Red_Curtains
        # /- Most important: $type always needs to be on first position of keys in an object
        # /- Defaults: also remove defautSequence, defaultCommand, defaultNode, defaultLink, defaultCombineItem, defaultCombineThought
    # [x] [ThoughtLink] Add IsSuccessEdge and UnlockId (edge to be unlocked - can be any thoughtlink)
    # [x] [ThoughtGraph] Quickfix: Can't remove nodes and edges... needs to be fixed
    l_dict = {}
    for i, d in enumerate(l):
        # remove invalid properties from room
        del d['Name']
        del d['texturePath']
        del d['__v']
        # Merge Items and Characters in to a Things List
        d['Things'] = d['Items']
        d['Things'].extend(d['Characters'])
        del d['Characters']
        del d['Items']
        # Change 'xyType' Fields to '$type'; remove _id, x and y fields
        d['Things'] = modify_dict(d['Things'])
        if 'EntrySequence' in d.keys():
            d['EntrySequence'] = modify_dict(d['EntrySequence'])
        l_dict[str(i+2)] = d
    return l_dict

if __name__ == "__main__":
    l = get_collection_content(sys.argv[1])
    if sys.argv[2] == 'print':
        print(json.loads(json_util.dumps(l)))
    elif sys.argv[2] == 'export':
        with open('conscious_content_data_mod.json', 'w') as file:
            l_dict = prepare_json(l)
            json_data = json.loads(json_util.dumps(l_dict))
            json.dump(json_data, file, indent=2)
