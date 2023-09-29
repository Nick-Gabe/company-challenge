import os


def pytest_sessionfinish(session, exitstatus):
    os.remove('./policies.test.db')
