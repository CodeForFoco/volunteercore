from flask import Blueprint

bp = Blueprint('volops', __name__)

from volunteermatching.volops.models import Partner, Opportunity, Frequency, \
    TagCategory, Tag
