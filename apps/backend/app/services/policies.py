from .execute import find_by
from ..database import TypedCurrentApp


def contains_only_start_node(data):
    decisions = find_by(elems=data['nodes'], param='type', value='decision')
    comparisons = find_by(elems=data['nodes'],
                          param='type', value='comparison')

    return not decisions and not comparisons


def create_policy_service(app: TypedCurrentApp, data):
    return app.db.create_policy(
        edges=data['edges'], nodes=data['nodes'], title=data['title'], viewport=data['viewport'])


def update_policy_service(app: TypedCurrentApp, id, data):
    return app.db.update_policy(
        id=id, edges=data['edges'], nodes=data['nodes'], title=data['title'], viewport=data['viewport'])
