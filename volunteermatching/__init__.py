from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_security import Security, SQLAlchemyUserDatastore
from flask_security.utils import encrypt_password
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

#from volunteermatching import views
from volunteermatching.models import Role, User

# Setup Flask-Security
user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(app, user_datastore)

if __name__ == '__main__':
    app.run()
