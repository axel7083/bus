from flask import Flask, request

from backend.models.Line import Line
from backend.models.Point2D import Point2D
from osm import *
from flask_cors import CORS
import json

from utils.time import simulateLine

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})


@app.route('/explore', methods=['GET'])
def explore():
    lat = request.args.get("lat", default=0, type=float)
    long = request.args.get("lon", default=0, type=float)

    return query_features(lat, long, dist=5.0)


@app.route('/ways', methods=['GET'])
def ways():
    node_id = request.args.get("node_id", default="0", type=str)
    return get_ways(node_id)


@app.route('/nodes', methods=['GET'])
def nodes():
    way_id = request.args.get("way_id", default="0", type=str)
    return get_nodes(way_id)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/stats', methods=['POST'])
def stats_line():
    data = request.get_json()
    print(data)
    return simulateLine(data)


allowed = ["motorway", "trunk", "primary", "secondary", "tertiary", "residential", "unclassified"]


@app.route('/explorer_node', methods=['GET'])
def explorer_node():
    node_id = request.args.get("node_id", default="0", type=str)
    ways = json.loads(get_ways(node_id))['elements']
    output = {"geometries": {}}

    all_nodes = []

    for way in ways:
        if 'tags' not in way:
            continue

        if 'highway' not in way['tags'] or way['tags']['highway'] not in allowed:
            continue

        nodes = [elem for elem in json.loads(get_nodes(way['id']))['elements'] if elem['type'] == "node"]
        geometry = {}
        for node in nodes:
            all_nodes.append(f'{node["id"]}')
            geometry[node['id']] = {
                'lat': node['lat'],
                'lon': node['lon'],
                'index': way['nodes'].index(node['id']),
            }

        output["geometries"][way['id']] = {
            'name': (way['tags']['name'] if 'name' in way['tags'] else "unknown"),
            'geometry': geometry
        }

    nodes_meta = {}
    payload = get_node_geom(all_nodes)

    try:
        elements = json.loads(payload)['elements']
        for element in elements:
            assert element['type'] == "way"
            for node in element['nodes']:
                if node not in nodes_meta:
                    nodes_meta[node] = [element['id']]
                else:
                    nodes_meta[node].append(element['id'])
    except ValueError as e:
        print(e)

    output['nodes_meta'] = nodes_meta
    return json.dumps(output)


@app.route("/create/line/<string:name>")
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


if __name__ == '__main__':
    app.run()
