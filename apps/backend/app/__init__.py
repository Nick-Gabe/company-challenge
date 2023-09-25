from flask import Flask
from .config import Config
from .views.diagrams import diagrams_bp
from .database import Database, create_database_tables


def create_app():
    app = Flask(__name__)
    create_database_tables()

    @app.before_request
    def before_request():
        app.db = Database()

    app.config.from_object(Config)
    app.register_blueprint(diagrams_bp)

    return app
