import os


class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL'
    ) or 'sqlite:///diagrams.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = True
    PORT = 8000
    HOST = 'localhost'
