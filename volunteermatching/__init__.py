from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate
from config import Config


app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
login_manager = LoginManager(app)


# Register blueprints
from volunteermatching.auth import bp as auth_bp
app.register_blueprint(auth_bp)
from .volops import bp_volops
app.register_blueprint(bp_volops)
from volunteermatching.api import bp as api_bp
app.register_blueprint(api_bp)
from volunteermatching.errors import bp as errors_bp
app.register_blueprint(errors_bp)

if __name__ == '__main__':
    app.run()
