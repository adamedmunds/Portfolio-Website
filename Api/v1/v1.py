import time
from flask import Blueprint
from flask_restx import Api, Resource, reqparse
from Functions.Functions import rpn_api_endpoint
from Api.UtilFunctions.Database import createUser, getUser

blueprint = Blueprint("api", __name__)

api = Api(
    blueprint,
    version="1.0",
    title="MightyLx's Api",
    description="A simple api I built",
    docs="/docs",
)

parser = reqparse.RequestParser()
parser.add_argument("rpn", type=str)

user = reqparse.RequestParser()
user.add_argument(name="user", type=dict, location="json", required=True)

userId = reqparse.RequestParser()
userId.add_argument(name="userId", required=True)


@api.route("/rpn")
class CalculateRpn(Resource):
    @api.expect(parser)
    def post(self) -> dict[str, str]:
        d = rpn_api_endpoint(parser.parse_args()["rpn"])
        return {"data": d}

    def get(self) -> dict:
        return {"time": time.time()}


@api.route("/createUser")
class CreateFirestoreUser(Resource):
    @api.expect(user)
    def post(self) -> dict:
        data = user.parse_args()["user"]
        createUser(data)
        return {"data": "Success"}


@api.route("/getUser")
class GetUser(Resource):
    @api.expect(userId)
    def get(self) -> dict:
        data = getUser(userId.parse_args()["userId"])
        return {"data": data}
