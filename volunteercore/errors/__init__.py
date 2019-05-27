from flask import Blueprint

bp = Blueprint('errors', __name__)

from volunteercore.errors import handlers
