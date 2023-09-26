from flask import Blueprint, jsonify, request, current_app
from flask_cors import CORS
from ..database import TypedCurrentApp

diagrams_bp = Blueprint('diagrams', __name__, url_prefix='/diagrams')
cors = CORS(diagrams_bp, resources={r'/*': {'origins': '*'}})
app: TypedCurrentApp = current_app


@diagrams_bp.route('/', methods=['POST'])
def create_diagram():
    data = request.get_json()
    new_diagram = app.db.create_diagram(**data)
    return jsonify(new_diagram), 201


@diagrams_bp.route('/', methods=['GET'])
def get_diagrams():
    diagrams_list = app.db.read_diagrams()
    return jsonify(diagrams_list)


@diagrams_bp.route('/<string:id>', methods=['GET'])
def get_diagram(id):
    diagram = app.db.read_diagram(id=id)
    if diagram != None:
        return jsonify(diagram)
    return jsonify(None), 404


@diagrams_bp.route('/<string:id>', methods=['PUT'])
def update_diagram(id):
    data = request.get_json()
    new_diagram = app.db.update_diagram(id=id, **data)
    return jsonify(new_diagram)


@diagrams_bp.route('/<string:id>', methods=['DELETE'])
def delete_diagram(id):
    deleted = app.db.delete_diagram(id=id)
    print(deleted)
    if deleted == True:
        return '', 204
    return '', 404
