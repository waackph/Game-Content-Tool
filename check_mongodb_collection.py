import sys
from pymongo import MongoClient
from bson import json_util
import json

###
# This script can either print the data of a given collection of the MongoDB (parameter 'print')
# or export the data as a JSON file in a form that is valid for the conscious game engine
# (parameter 'export').
###


# Method to get a given collection from the mongodb
def get_collection_content(collection):
    CONNECTION_STRING = "mongodb://root:rootpw@127.0.0.1:5012"
    client = MongoClient(CONNECTION_STRING)
    db = client['conscious_db']
    coll = db[collection]
    return list(coll.find({}, {'_id': False}))
    # for x in coll.find():
    #     print(x)
    #     print()


# Helper method to check if a Thought-Object is a default input and therefore can be removed.
def is_default_thought(thought):
    return (len(thought['Links']) > 0
            and thought['Links'][0]['Option'] == "First link"
            and len(thought['Links'][0]['NextNode']['Links']) == 0)


# Modify a given object to fit the data structure definition of the conscious game engine.
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
        if 'EventThought' in obj.keys() and type(obj['EventThought']) == dict and is_default_thought(obj['EventThought']):
            obj['EventThought'] = None
        if 'sequence' in obj.keys() and not obj['sequence'].get('Commands'):
            obj['sequence'] = None
        if 'EntrySequence' in obj.keys() and not obj['EntrySequence'].get('Commands'):
            obj['EntrySequence'] = None
        if 'CombineItem' in obj.keys() and not obj['CombineItem'].get('Name'):
            obj['CombineItem'] = None
        # Remove file ending of texturePath
        if obj.get('texturePath'):
            obj['texturePath'] = remove_file_ext(obj['texturePath'])
        if obj.get('CloseTexturePath'):
            obj['CloseTexturePath'] = remove_file_ext(obj['CloseTexturePath'])
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


# Prepare the JSON file to export. This must be a valid format for the conscious game engine.
def prepare_json(li):
    l_dict = {}
    room_idx = 0
    for i, d in enumerate(li):
        room_idx += 1
        if i < 2:
            # skip prototype rooms
            continue
        # remove invalid properties from room
        del d['Name']
        del d['texturePath']
        del d['__v']
        # Merge Items and Characters into a Things List
        d['Things'] = d['Items']
        d['Things'].extend(d['Characters'])
        del d['Characters']
        del d['Items']
        # Change 'xyType' Fields to '$type'; remove _id, x and y fields
        d['Things'] = modify_dict(d['Things'])
        if 'EntrySequence' in d.keys():
            d['EntrySequence'] = modify_dict(d['EntrySequence'])
        if 'Thought' in d.keys():
            d['Thought'] = modify_dict(d['Thought'])
        l_dict[str(room_idx)] = d
    return l_dict

def remove_file_ext(name: str, ext: str = ".png"):
    return name.split(ext)[0]

# The main method checks the given parameter and prints or exports the data from the mongodb
# given a valid parameter ('print' or 'export')
if __name__ == "__main__":
    li = get_collection_content(sys.argv[1])
    if sys.argv[2] == 'print':
        print(json.loads(json_util.dumps(li)))
    elif sys.argv[2] == 'export':
        with open('conscious_content_data_mod_extended.json', 'w') as file:
            l_dict = prepare_json(li)
            json_data = json.loads(json_util.dumps(l_dict))
            json.dump(json_data, file, indent=2)
