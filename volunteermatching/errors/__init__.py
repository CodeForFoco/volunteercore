from flask import Blueprint

bp_errors = Blueprint('errors', __name__, template_folder="templates")

from . import handlers
