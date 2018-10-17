from flask import Blueprint
from .models import Role, User
from volunteermatching import db

bp_auth = Blueprint('auth', __name__)

if __name__ == '__main__':
    app.run()
