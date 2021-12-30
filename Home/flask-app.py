from flask import Flask
from Api.v1.v1 import blueprint as api
from Home.Blueprints.v1 import home

app = Flask(__name__)
app.register_blueprint(api, url_prefix="/api/v1")
app.register_blueprint(home)
