from flask import Blueprint, jsonify, request, current_app, abort
from flask_cors import CORS
from ..database import TypedCurrentApp
from ..services.policies import contains_only_start_node, create_policy_service, update_policy_service

policies_bp = Blueprint('policies', __name__, url_prefix='/policies')
cors = CORS(policies_bp, resources={r'/*': {'origins': '*'}})
app: TypedCurrentApp = current_app


@policies_bp.route('/', methods=['POST'])
def create_policy():
    data = request.get_json()

    if contains_only_start_node(data):
        abort(400, description='At least one comparison or decision is required')
    try:
        new_policy = create_policy_service(app, data)
        return jsonify(new_policy), 201
    except KeyError:
        abort(400, description='Missing required arguments')


@policies_bp.route('/', methods=['GET'])
def get_policies():
    policies_list = app.db.read_policies()
    return jsonify(policies_list)


@policies_bp.route('/<string:id>', methods=['GET'])
def get_policy(id):
    policy = app.db.read_policy(id)
    if not policy:
        abort(404)
    return jsonify(policy)


@policies_bp.route('/<string:id>', methods=['PUT'])
def update_policy(id):
    data = request.get_json()
    policy = app.db.read_policy(id)
    if not policy:
        abort(404)

    if contains_only_start_node(data):
        print('contains start')
        abort(400, description='At least one comparison or decision is required')
    try:
        new_policy = update_policy_service(app, id, data)
        return jsonify(new_policy)
    except KeyError:
        abort(400, description='Missing required arguments')


@policies_bp.route('/<string:id>', methods=['DELETE'])
def delete_policy(id):
    deleted = app.db.delete_policy(id)
    if not deleted:
        abort(404)
    return '', 204
