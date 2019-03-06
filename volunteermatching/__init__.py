from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Register blueprints
from .auth import bp_auth
app.register_blueprint(bp_auth)
from .volops import bp_volops
app.register_blueprint(bp_volops)
from .api import bp_api
app.register_blueprint(bp_api)
from .errors import bp_errors
app.register_blueprint(bp_errors)

if __name__ == '__main__':
    app.run()
