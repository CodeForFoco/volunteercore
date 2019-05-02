from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate
from config import Config
import flask_whooshalchemyplus

db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)
    flask_whooshalchemyplus.init_app(app)

    # Register blueprints
    from volunteermatching.auth import bp as auth_bp
    app.register_blueprint(auth_bp)
    from volunteermatching.volops import bp as volops_bp
    app.register_blueprint(volops_bp)
    from volunteermatching.api import bp as api_bp
    app.register_blueprint(api_bp)
    from volunteermatching.errors import bp as errors_bp
    app.register_blueprint(errors_bp)

    return app
