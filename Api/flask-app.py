from flask import Flask
from flask_restx import Resource, Api, reqparse
from Functions.Functions import rpn_api_endpoint

app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('rpn', type=str)


@api.route('/api')
class CalculateRpn(Resource):
    @api.expect(parser)
    def post(self):
        d = rpn_api_endpoint(parser.parse_args()["rpn"])
        return {"data": d}
