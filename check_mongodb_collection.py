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
        # change type field name to '$type'
        has_type = [k for k in obj.keys() if 'type' in k.lower()]
        if has_type and len(has_type) == 1:
            obj['$type'] = obj[has_type[0]]
            del obj[has_type[0]]
        for k in obj.keys():
            if type(obj[k]) == dict or type(obj[k]) == list:
                obj[k] = modify_dict(obj[k])
    return obj

def prepare_json(l):
    # TODO: General stuff to change in the GCT
    # [x] Types: use following pattern - "conscious.[Objectname], conscious"
    # [x] [Room] Combine "Items" and "Characters" List into "Things" List
    # [x] [Room] remove "__v"
    # [x] [Room] Add fields SoundFilePath, LightMapPath
    # [x] [Thing] add DrawOrder field
    # [x] [Door] add fields InitPlayerPosX, InitPlayerPosY, CloseTexturePath, RoomId
    # [ ] [ThoughtNode] rename _id to Id, add field LinkageId
    # [ ] [ThoughtLink] ValidMoods must have value 0 as default (no empty list)
    # [ ] [ThoughtNode/ThoughtLink] Add type info (DataHolderX)
    # [x] [TreeStructure] node/link: remove x, y
    # [x] [TreeStructure] link: remove _id, Id (removed in post processing script)
    # [x] [sequence] remove field _currentIndex and SequenceFinished; 
    # [x] [sequence] rename _commands -> Commands
    # [x] [sequence] debug for room views
    # [ ] [Command] only use valid fields for the respective command type
    # [ ] [Command] Add missing commands
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
        d['EntrySequence'] = modify_dict(d['EntrySequence'])
        l_dict[str(i+1)] = d
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
