from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Email, \
    EqualTo, NoneOf
from .models import Partner, Opportunity, Passion, AgeGroupInterest, Skill, \
    Frequency


class CheckFieldUnique(object):
    def __init__(self, model, message=None):
        self.model = model
        self.message = message

    def __call__(self, form, field):
        validator = self.model.query.filter_by(name=field.data).first()
        if validator is not None:
            raise ValidationError(self.message)


class PassionForm(FlaskForm):
    passion_name = StringField('Passion', validators=[DataRequired(),
        CheckFieldUnique(Passion, "This passion is already available")])
    submit_passion = SubmitField('Create')


class AgeGroupInterestForm(FlaskForm):
    agi_name = StringField('AgeGroupInterest', validators=[DataRequired(),
        CheckFieldUnique(AgeGroupInterest, "This age group interest is \
        already available")])
    submit_agi = SubmitField('Create')


class SkillForm(FlaskForm):
    skill_name = StringField('Skill', validators=[DataRequired(),
        CheckFieldUnique(Skill, "This skill is already available")])
    submit_skill = SubmitField('Create')


class FrequencyForm(FlaskForm):
    frequency_name = StringField('Frequency', validators=[DataRequired(),
        CheckFieldUnique(Frequency, "This frequency is already available")])
    submit_frequency = SubmitField('Create')
