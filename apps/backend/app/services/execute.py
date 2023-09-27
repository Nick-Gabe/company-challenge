from typing import Union
from ..models.policy import Edge, Node


def find_by(elems, param: str, value: str) -> Union[Edge, Node]:
    for elem in elems:
        if elem[param] == value:
            return elem
    return None


def find_edge_by_source(edges: list[Edge], id: str, label: str):
    for edge in edges:
        if edge['source'] == id and edge['label'] == label:
            return edge
    return None


def compare(data, node: Node):
    parameter = data[node['data']['parameter']]
    operation = node['data']['operation']
    value = node['data']['value']
    # I could have used eval, but I preferred to be safe
    if operation == '=':
        return parameter == value
    elif operation == '>':
        return parameter > value
    elif operation == '>=':
        return parameter >= value
    elif operation == '<':
        return parameter < value
    elif operation == '<=':
        return parameter <= value


def decision_cicle_start(data, edges: list[Edge], nodes: list[Node], node: Node):
    if not node:
        return True
    elif node['type'] == 'comparison':
        result = compare(data, node)
        edge = find_edge_by_source(
            edges, node['id'], 'YES' if result else 'NO')
        if not edge:
            return result
        next_node = find_by(elems=nodes, param='id', value=edge['target'])
        return decision_cicle_start(data, edges, nodes, next_node)
    elif node['type'] == 'decision':
        return node['data']['decision']


def check_missing_parameters(data, nodes: list[Node]):
    parameters = []
    missing_parameters = []
    for node in nodes:
        if node['type'] == 'comparison':
            parameters.append(node['data']['parameter'])
    for param in parameters:
        try:
            data[param]
        except:
            missing_parameters.append(param)

    return missing_parameters
