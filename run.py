from volunteermatching import app, db
from volunteermatching.auth.models import Role, User
from volunteermatching.volops.models import Partner, Opportunity, Passion, \
    AgeGroupInterest, Skill, Frequency, TagCategory, Tag

if __name__ == "__main__":
    app.run(debug=True)


@app.shell_context_processor
def make_shell_context():
    return {
        'db': db,
        'User': User,
        'Role': Role,
        'Partner': Partner,
        'Opportunity': Opportunity,
        'Passion': Passion,
        'AgeGroupInterest': AgeGroupInterest,
        'Skill': Skill,
        'Frequency': Frequency,
        'TagCategory': TagCategory,
        'Tag': Tag
    }
