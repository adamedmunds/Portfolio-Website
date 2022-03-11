from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()


def connect_to_mongo() -> MongoClient:
    client = MongoClient(os.getenv('MONGOLOCALURI'))
    return client


def createUser(user: dict):
    client = connect_to_mongo()
    database = client['database']
    user_collection = database['users']
    result = user_collection.find_one({'_id': str(user["id"])})
    if not result:
        user_collection.insert_one({
            "_id": user["id"],
            "displayName": user["displayName"],
            "email": user["email"],
            "isVerified": user["isVerified"],
            "photo": user["photoURL"],
            "createdAt": user["createdAt"],
            "role": "user",
            "activePokedexes": ["all"]
        })
    client.close()


def getUser(userId: str):
    client = connect_to_mongo()
    database = client['database']
    user_collection = database['users']
    result = user_collection.find_one({'_id': userId})
    client.close()
    if result:
        return result
