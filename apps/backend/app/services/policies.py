from .execute import find_by
from ..database import TypedCurrentApp


def contains_only_start_node(data):
    decisions = find_by(elems=data['edges'],
                        param='targetHandle', value='decision-target')
    comparisons = find_by(elems=data['edges'],
                          param='targetHandle', value='target')

    return not decisions and not comparisons


def all_comparisons_filled(data):
    for edge in data['edges']:
        if edge['targetHandle'] == 'target':
            target = find_by(elems=data['nodes'],
                             param='id', value=edge['target'])
            targetData = target['data']
            if targetData['parameter'].strip() == '' or targetData['value'].strip() == '' and targetData['operation'] != '=':
                return False
    return True


def create_policy_service(app: TypedCurrentApp, data):
    return app.db.create_policy(
        edges=data['edges'], nodes=data['nodes'], title=data['title'], viewport=data['viewport'])


def update_policy_service(app: TypedCurrentApp, id, data):
    return app.db.update_policy(
        id=id, edges=data['edges'], nodes=data['nodes'], title=data['title'], viewport=data['viewport'])
