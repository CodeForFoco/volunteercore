from flask import Blueprint
from volunteermatching import login_manager

login_manager.login_view = 'login'

bp = Blueprint('auth', __name__)

from volunteermatching.auth.models import Role, User
