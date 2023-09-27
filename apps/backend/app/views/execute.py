from flask import Blueprint, jsonify, request, current_app
from flask_cors import CORS
from ..database import TypedCurrentApp
from ..services.execute import find, decision_cicle_start, check_missing_parameters

execute_bp = Blueprint('execute', __name__, url_prefix='/execute')
cors = CORS(execute_bp, resources={r'/*': {'origins': '*'}})
app: TypedCurrentApp = current_app


@execute_bp.route('/<string:id>', methods=['POST'])
def execute(id):
    data = request.get_json()
    policy = app.db.read_policy(id)

    missing_parameters = check_missing_parameters(data, policy.nodes)
    if len(missing_parameters) != 0:
        return jsonify({'message': f'Missing needed parameters: {", ".join(missing_parameters)}'}), 400

    start = find(policy.edges, 'start')
    start_node = find(policy.nodes, start['target'])
    result = decision_cicle_start(data, policy.edges, policy.nodes, start_node)

    return jsonify({'decision': result})
