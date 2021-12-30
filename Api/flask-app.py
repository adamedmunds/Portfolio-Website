from flask import Flask
from flask_restx import Resource, Api
from Functions.Functions import rpn_api_endpoint

app = Flask(__name__)
api = Api(app)


@api.route('/api')
class CalculateRpn(Resource):
    def get(self):
        d = rpn_api_endpoint("1 2+3/5+2A*DA3ASD*5/3*")
        return {"data": d}
