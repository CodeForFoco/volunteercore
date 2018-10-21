from flask import Blueprint
from volunteermatching import db, app

bp_volops = Blueprint('volops', __name__, template_folder="templates")

from .models import Partner, Opportunity, Passion
#from . import views, forms
