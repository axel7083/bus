from flask import Flask, jsonify, request

from Code.Point2D import Point2D

app = Flask(__name__)


@app.route("/")
def hello():
    return jsonify(message="Hello World!")


@app.route("create/line/<string:name>")
def create_line(name):
    data = request.get_json()
    points = [Point2D(pt["x"], pt["y"]) for pt in data["path"]]
