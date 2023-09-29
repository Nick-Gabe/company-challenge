import pytest
from . import app, Session
from ..database import Database
from .test_policies_utils import create_policy, check_response
from .test_execute_utils import execute, check_decision

db = Database(Session)


@pytest.fixture
def client():
    with app.test_client() as client:
        db.clear_database()
        yield client


def test_execution(client):
    response = create_policy(client)
    policyId = response.get_json()['id']

    # Test policy with comparison and correct data should work
    response = execute(client, id=policyId, data={'name': 'nick'})
    check_response(response, status=200)
    check_decision(response, expected=True)

    # Test policy with comparison and incorrect data should NOT work
    response = execute(client, id=policyId, data={
                       'name': 'any other name than nick'})
    check_response(response, status=200)
    check_decision(response, expected=False)

    # Test missing parameters
    response = execute(client, id=policyId, data={})
    check_response(response, status=400, data={
        'error': 'Missing required parameters: name'
    })

    # Test executing non existent policy
    response = execute(client, id=12345, data={})
    check_response(response, status=404, data={
        'error': 'Not Found'
    })


def test_complex_executions(client):
    response = create_policy(client, policy='complexPolicy')
    policyId = response.get_json()['id']

    # Test should work even in a real scenario
    response = execute(client, id=policyId, data={'age': 19, 'income': 2000})
    check_response(response, status=200)
    check_decision(response, expected=True)

    response = execute(client, id=policyId, data={'age': 17, 'income': 2000})
    check_response(response, status=200)
    check_decision(response, expected=False)

    response = execute(client, id=policyId, data={'age': 20, 'income': 100})
    check_response(response, status=200)
    check_decision(response, expected=False)

    response = execute(client, id=policyId, data={'age': 10, 'income': 100})
    check_response(response, status=200)
    check_decision(response, expected=False)
