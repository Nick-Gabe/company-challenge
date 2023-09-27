from flask import Flask
from .config import Config
from .views.policies import policies_bp
from .views.execute import execute_bp
from .database import Database, create_database_tables, TypedCurrentApp


def create_app():
    app: TypedCurrentApp = Flask(__name__)
    create_database_tables()

    @app.before_request
    def before_request():
        app.db = Database()

    @app.after_request
    def after_request(response):
        if hasattr(app, 'db'):
            app.db.close_connection()
        return response

    app.config.from_object(Config)
    app.register_blueprint(policies_bp)
    app.register_blueprint(execute_bp)

    return app
