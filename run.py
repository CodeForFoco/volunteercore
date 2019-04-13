from volunteermatching import create_app, db
from volunteermatching.auth.models import Role, User
from volunteermatching.volops.models import Partner, Opportunity, Frequency, \
    TagCategory, Tag

app = create_app()

@app.shell_context_processor
def make_shell_context():
    return {
        'db': db,
        'User': User,
        'Role': Role,
        'Partner': Partner,
        'Opportunity': Opportunity,
        'Frequency': Frequency,
        'TagCategory': TagCategory,
        'Tag': Tag
    }
