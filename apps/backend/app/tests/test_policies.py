import pytest
from . import app, Session
from .. import Database
from .test_policies_utils import get_policies, check_response, contains, create_policy, update_policy, get_policy, delete_policy

db = Database(Session)


@pytest.fixture
def client():
    with app.test_client() as client:
        db.clear_database()
        yield client


def test_get_policies(client):
    # Test getting empty list
    response = get_policies(client)
    check_response(response, status=200, length=0)

    # Test getting list with policies
    create_policy(client)
    response = get_policies(client)
    check_response(response, status=200, length=1)


def test_create_policy(client):
    # Test creation success
    response = create_policy(client)
    check_response(response, status=201)
    response = get_policies(client)
    check_response(response, status=200, length=1)

    # Test missing params
    response = create_policy(client, policy='empty')
    check_response(response, status=400, data={
        'error': 'Missing required arguments'
    })

    # Test contains only start node
    response = create_policy(client, policy='onlyStartNode')
    check_response(response, status=400, data={
        'error': 'At least one comparison or decision is required'
    })

    # Test comparison node params can't be empty
    response = create_policy(client, policy='emptyComparison')
    check_response(response, status=400, data={
        'error': "Comparisons can't have empty fields"
    })


def test_get_policy(client):
    create_policy(client)

    # Test getting existing policy
    response = get_policy(client, id=1)
    check_response(response, status=200, contains=contains({'id': 1}))

    # Test getting non existent policy
    response = get_policy(client, id=16380)
    check_response(response, status=404, data={'error': 'Not Found'})


def test_update_policy(client):
    response = create_policy(client)
    check_response(response, status=201,
                   contains=contains({'title': 'is nick'}))

    id = response.get_json()['id']

    # Test successfully updating a policy
    response = update_policy(client, id, modifications={
                             'title': 'updated title'})
    check_response(response, status=200,
                   contains=contains({'title': 'updated title'}))

    # Test update policy that doesn't exist
    response = update_policy(client, id=12345)
    check_response(response, status=404, data={'error': 'Not Found'})

    # Test missing params
    response = update_policy(client, id, policy='empty')
    check_response(response, status=400, data={
        'error': 'Missing required arguments'
    })

    # Test contains only start node
    response = update_policy(client, id, policy='onlyStartNode')
    check_response(response, status=400, data={
        'error': 'At least one comparison or decision is required'
    })

    # Test comparison node params can't be empty
    response = update_policy(client, id, policy='emptyComparison')
    check_response(response, status=400, data={
        'error': "Comparisons can't have empty fields"
    })


def test_delete_policy(client):
    # Delete existing policy
    create_policy(client)
    response = delete_policy(client, id=1)
    check_response(response, status=204)

    # Delete non existing policy
    response = delete_policy(client, id=12345)
    check_response(response, status=404, data={'error': 'Not Found'})
