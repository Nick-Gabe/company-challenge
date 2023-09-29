from flask import Flask
from .config import Config
from .views.policies import policies_bp
from .views.execute import execute_bp
from .database import Database, create_database_tables, TypedCurrentApp
from .views.error_handlers import register_error_handlers
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


def create_app(test=False):
    engine = create_engine(
        "sqlite:///policies.test.db" if test else Config.SQLALCHEMY_DATABASE_URI)
    Session = sessionmaker(bind=engine)

    app: TypedCurrentApp = Flask(__name__)
    create_database_tables(Session, engine)

    @app.before_request
    def before_request():
        app.db = Database(Session)

    @app.after_request
    def after_request(response):
        if hasattr(app, 'db'):
            app.db.close_connection()
        return response

    app.config.from_object(Config)
    app.register_blueprint(policies_bp)
    app.register_blueprint(execute_bp)
    register_error_handlers(app)

    return {'app': app, 'Session': Session}
