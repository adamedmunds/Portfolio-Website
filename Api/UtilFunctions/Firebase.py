import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("key.json")

firebase_admin.initialize_app(cred)

db = firestore.client()


def createUser(user: dict):
    result = db.collection("users").document(user["id"]).get()
    if not result.exists:
        db.collection("users").document(user["id"]).set(
            {
                "id": user["id"],
                "displayName": user["displayName"],
                "email": user["email"],
                "isVerified": user["isVerified"],
                "photo": user["photoURL"],
                "createdAt": user["createdAt"],
                "role": "user",
                "activePokedexes": ["all"]
            }
        )
        db.collection("users").document(user["id"]).collection("all").document("1").set(
            {
                "id": 1,
                "name": "bulbasaur"
            }
        )


def getUserAvatar(userId: str):
    result = db.collection("users").document(userId).get()
    if result.exists:
        return result.to_dict()["photo"]


def getUser(userId: str):
    result = db.collection("users").document(userId).get()
    if result.exists:
        return result.to_dict()