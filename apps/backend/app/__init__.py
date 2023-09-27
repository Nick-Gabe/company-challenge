from flask import Flask
from .config import Config
from .views.policies import policies_bp
from .views.execute import execute_bp
from .database import Database, create_database_tables


def create_app():
    app = Flask(__name__)
    create_database_tables()

    @app.before_request
    def before_request():
        app.db = Database()

    app.config.from_object(Config)
    app.register_blueprint(policies_bp)
    app.register_blueprint(execute_bp)

    return app
