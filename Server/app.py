from flask import Flask, jsonify, request

from Code.Line import Line
from Code.Point2D import Point2D

app = Flask(__name__)


@app.route("/")
def hello():
    return jsonify(message="Hello World!")


# {
#   path : [
#       {x:x,y:y},
#       ...
#   ],
#   limits : {
#       f"{x};{y}" : {
#           limit:limit_km_per_hour,
#           end  : {x:x,y:y}
#       }
#   }
# }
# the coordinates of path[0] must exist in limits
# if path[0] != path[-1] a line will be created between those two points to close the loop


@app.route("create/line/<string:name>")
def create_line(name):
    data = request.get_json()
    points = [Point2D(pt["x"], pt["y"]) for pt in data["path"]]
    lines = []
    for i in range(len(points) - 1):
        lines.append(
            Line(points[i], points[i + 1])
        )

    if points[0] != points[-1]:
        lines.append(
            Line(points[-1], points[0])
        )
