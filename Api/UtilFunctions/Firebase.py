import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("key.json")

firebase_admin.initialize_app(cred)

db = firestore.client()


def createUser(user: dict):
    db.collection("users").document(user["id"]).set(
        {
            "id": user["id"],
            "displayName": user["displayName"],
            "email": user["email"],
            "isVerified": user["isVerified"],
            "photo": user["photoURL"],
            "createdAt": user["createdAt"],
            "role": "user",
        }
    )


def getUserAvatar(userId: str):
    result = db.collection("users").document(userId).get()
    if result.exists:
        return result.to_dict()["photo"]
