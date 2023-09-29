from typing import Any, Callable, Optional
from . import load_mocked_data


def contains(value):
    def contains_data(data):
        for key in data:
            if key in value:
                assert data[key] == value[key]
    return contains_data


def generate_policy(policy, modifications=None):
    data = load_mocked_data('./mock_data.json')[policy]
    if modifications is not None:
        for key in modifications:
            data[key] = modifications[key]
    return data


def create_policy(client, policy='simple', modifications=None):
    return client.post('/policies/', json=generate_policy(policy, modifications))


def update_policy(client, id, policy='simple', modifications=None):
    return client.put(f'/policies/{id}', json=generate_policy(policy, modifications))


def get_policy(client, id):
    return client.get(f'/policies/{id}')


def get_policies(client):
    return client.get('/policies/')


def delete_policy(client, id):
    return client.delete(f'/policies/{id}')


def check_response(response, data=None, status=None, length=None, contains: Optional[Callable[[Any], None]] = None):
    response_data = response.get_json()
    if status is not None:
        assert response.status_code == status
    if data is not None:
        assert response_data == data
        if length != None:
            assert len(response_data) == length
    if contains is not None:
        contains(data=response_data)


def check_update_policy(client):
    response = create_policy(client)
    check_response(response, status=201,
                   contains=contains({'title': 'is nick'}))

    id = response.get_json()['id']
    response = update_policy(client, id, modifications={
                             'title': 'updated title'})
    check_response(response, status=200,
                   contains=contains({'title': 'updatsed title'}))
