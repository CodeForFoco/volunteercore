from flask import Blueprint

bp = Blueprint('volops', __name__)

from volunteercore.volops.models import Partner, Opportunity, \
    TagCategory, Tag
