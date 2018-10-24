from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Email, EqualTo
from .models import Partner, Opportunity, Passion, AgeGroupInterest, Skill, \
    Frequency


class PassionForm(FlaskForm):
    name = StringField('Passion', validators=[DataRequired()])
    submit = SubmitField('Create')

    def validate_passion(self, name):
        passion = Passion.query.filter_by(name=name.data).first()
        if passion is not None:
            raise ValidationError("This passion is already available")


class AgeGroupInterestForm(FlaskForm):
    name = StringField('AgeGroupInterest', validators=[DataRequired()])
    submit_agi = SubmitField('Create')

    def validate_agi(self, name):
        agi = AgeGroupInterest.query.filter_by(name=name.data).first()
        if agi is not None:
            raise ValidationError("This age group interest is already \
                                  available")

class SkillForm(FlaskForm):
    name = StringField('Skill', validators=[DataRequired()])
    submit_skill = SubmitField('Create')

    def validate_skill(self, name):
        skill = Skill.query.filter_by(name=name.data).first()
        if skill is not None:
            raise ValidationError("This skill is already available")


class FrequencyForm(FlaskForm):
    name = StringField('Frequency', validators=[DataRequired()])
    submit_frequency = SubmitField('Create')

    def validate_frequency(self, name):
        frequency = Frequency.query.filter_by(name=name.data).first()
        if frequency is not None:
            raise ValidationError("This skill is already available")
