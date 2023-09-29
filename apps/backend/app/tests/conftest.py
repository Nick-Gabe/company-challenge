import os


def pytest_sessionfinish(session, exitstatus):
    try:
        os.remove('./policies.test.db')
    except:
        pass
