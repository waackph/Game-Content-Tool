import sys
from pymongo import MongoClient

def get_collection_content(collection):
    CONNECTION_STRING = "mongodb://root:rootpw@127.0.0.1:5012"
    client = MongoClient(CONNECTION_STRING)
    db = client['conscious_db']
    coll = db[collection]
    for x in coll.find():
        print(x)
        print()

if __name__ == "__main__":
    get_collection_content(sys.argv[1])
