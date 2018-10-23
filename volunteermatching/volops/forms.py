from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Email, EqualTo
from .models import Partner, Opportunity, Passion, AgeGroupInterest, Skill, \
    Frequency


class PassionForm(FlaskForm):
    name = StringField('Passion', validators=[DataRequired()])
    submit = SubmitField('Create')

    def validate_passion(self, name):
        name = Passion.query.filter_by(name=name.data).first()
        if name is not None:
            raise ValidationError("This passion is already available")
