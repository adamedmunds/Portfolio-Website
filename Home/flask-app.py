from flask import Flask, send_from_directory
from Api.v1.v1 import blueprint as api

app = Flask(__name__, static_folder="../frontend/build", static_url_path="/")
app.register_blueprint(api, url_prefix="/api/v1")


@app.route("/", defaults={"path": ""})
def serve(path):
    return send_from_directory(app.static_folder, "index.html")


@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, "index.html")
