import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'default_key'
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL'
    ) or 'sqlite:///diagrams.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = True
    PORT = 8000
    HOST = 'localhost'
