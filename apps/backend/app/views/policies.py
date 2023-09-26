from flask import Blueprint, jsonify, request, current_app
from flask_cors import CORS
from ..database import TypedCurrentApp

policies_bp = Blueprint('policies', __name__, url_prefix='/policies')
cors = CORS(policies_bp, resources={r'/*': {'origins': '*'}})
app: TypedCurrentApp = current_app


@policies_bp.route('/', methods=['POST'])
def create_policy():
    data = request.get_json()
    new_policy = app.db.create_policy(**data)
    return jsonify(new_policy), 201


@policies_bp.route('/', methods=['GET'])
def get_policies():
    policies_list = app.db.read_policies()
    return jsonify(policies_list)


@policies_bp.route('/<string:id>', methods=['GET'])
def get_policy(id):
    policy = app.db.read_policy(id=id)
    if policy != None:
        return jsonify(policy)
    return jsonify(None), 404


@policies_bp.route('/<string:id>', methods=['PUT'])
def update_policy(id):
    data = request.get_json()
    new_policy = app.db.update_policy(id=id, **data)
    return jsonify(new_policy)


@policies_bp.route('/<string:id>', methods=['DELETE'])
def delete_policy(id):
    deleted = app.db.delete_policy(id=id)
    if deleted == True:
        return '', 204
    return '', 404
