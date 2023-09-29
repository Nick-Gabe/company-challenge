import json
from app import create_app

instance = create_app(test=True)
app = instance['app']
Session = instance['Session']


def load_mocked_data(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)
