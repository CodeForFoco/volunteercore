from flask import Blueprint
from volunteercore import login_manager

login_manager.login_view = 'login'

bp = Blueprint('auth', __name__)

from volunteercore.auth.models import Role, User
