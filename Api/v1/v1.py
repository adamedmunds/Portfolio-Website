import time
from flask import Blueprint
from flask_restx import Api, Resource, reqparse
from Functions.Functions import rpn_api_endpoint

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


@api.route("/rpn")
class CalculateRpn(Resource):
    @api.expect(parser)
    def post(self) -> dict[str, str]:
        d = rpn_api_endpoint(parser.parse_args()["rpn"])
        return {"data": d}

    def get(self) -> dict:
        return {"time": time.time()}
