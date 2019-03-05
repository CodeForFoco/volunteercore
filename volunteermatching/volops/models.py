from volunteermatching import db
from volunteermatching.mixins import PagininatedAPIMixin

passions = db.Table(
    'passions',
    db.Column('opportunity_id', db.Integer, db.ForeignKey('opportunity.id')),
    db.Column('passion_id', db.Integer, db.ForeignKey('passion.id'))
)

age_group_interests = db.Table(
    'age_group_interests',
    db.Column('opportunity_id', db.Integer, db.ForeignKey('opportunity.id')),
    db.Column('age_group_interests_id', db.Integer,
              db.ForeignKey('age_group_interest.id'))
)

skills = db.Table(
    'skills',
    db.Column('opportunity_id', db.Integer, db.ForeignKey('opportunity.id')),
    db.Column('skills_id', db.Integer, db.ForeignKey('skill.id'))
)

frequencies = db.Table(
    'frequencies',
    db.Column('opportunity_id', db.Integer, db.ForeignKey('opportunity.id')),
    db.Column('frequencies_id', db.Integer, db.ForeignKey('frequency.id'))
)

tags = db.Table(
    'tags',
    db.Column('opportunity_id', db.Integer, db.ForeignKey('opportunity.id')),
    db.Column('tags_id', db.Integer, db.ForeignKey('tag.id'))
)


class Partner(PagininatedAPIMixin, db.Model):
    id = db.Column(db.Integer(), primary_key=True, index=True)
    name = db.Column(db.String(200), index=True, unique=True)
    opportunities = db.relationship('Opportunity', backref='partner',
                                    lazy='dynamic')

    def to_dict(self):
        data = {
            'id': self.id,
            'name': self.name,
            'opportunity_count': self.opportunities.count()
        }
        return data

    def from_dict(self, data, new_partner=False):
        for field in ['name']:
            if field in data:
                setattr(self, field, data[field])

    def __repr__(self):
        return '<Partner {}>'.format(self.name)


class Opportunity(db.Model):
    id = db.Column(db.Integer(), primary_key=True, index=True)
    active = db.Column(db.Boolean())
    name = db.Column(db.String(100), index=True, unique=True)
    job_number = db.Column(db.String(50), unique=True)
    description = db.Column(db.Text(500))
    shift_hours = db.Column(db.Float())
    commitment_length = db.Column(db.Float(2))
    start_date = db.Column(db.Date())
    end_date = db.Column(db.Date())
    training_time_required = db.Column(db.Integer())
    volunteers_needed = db.Column(db.Integer())
    location_street = db.Column(db.String(100))
    location_city = db.Column(db.String(50))
    location_zip = db.Column(db.String(10))

    # One to many relationships
    partner_id = db.Column(db.Integer, db.ForeignKey('partner.id'))

    # Many to many relations
    passions = db.relationship(
        'Passion', secondary='passions', lazy='subquery',
        backref=db.backref('opportunities', lazy=True))
    age_group_interests = db.relationship(
        'AgeGroupInterest', secondary='age_group_interests', lazy='subquery',
        backref=db.backref('opportunities', lazy=True))
    skills = db.relationship(
        'Skill', secondary='skills', lazy='subquery',
        backref=db.backref('opportunities', lazy=True))
    frequencies = db.relationship(
        'Frequency', secondary='frequencies', lazy='subquery',
        backref=db.backref('opportunities', lazy=True))
    tags = db.relationship(
        'Tag', secondary='tags', lazy='subquery',
        backref=db.backref('opportunities', lazy=True))

    def __repr__(self):
        return '<Opportunity {}>'.format(self.name)


class TagCategory(db.Model):
    id = db.Column(db.Integer(), primary_key=True, index=True)
    name = db.Column(db.String(60), index=True, unique=True)
    tags = db.relationship('Tag', backref='tag_category',
                                    lazy='dynamic')

    def __repr__(self):
        return '<Tag Category {}>'.format(self.name)


class Tag(db.Model):
    id = db.Column(db.Integer(), primary_key=True, index=True)
    name = db.Column(db.String(60), index=True, unique=True)
    tag_category_id = db.Column(db.Integer, db.ForeignKey('tag_category.id'))

    def __repr__(self):
        return '<Tag {}>'.format(self.name)


class Passion(db.Model):
    id = db.Column(db.Integer(), primary_key=True, index=True)
    name = db.Column(db.String(50), index=True, unique=True)
    def __repr__(self):
        return '<Passion {}>'.format(self.name)


class AgeGroupInterest(db.Model):
    id = db.Column(db.Integer(), primary_key=True, index=True)
    name = db.Column(db.String(50), index=True, unique=True)

    def __repr__(self):
        return '<AgeGroupInterest {}>'.format(self.name)


class Skill(db.Model):
    id = db.Column(db.Integer(), primary_key=True, index=True)
    name = db.Column(db.String(50), index=True, unique=True)

    def __repr__(self):
        return '<Skill {}>'.format(self.name)


class Frequency(db.Model):
    id = db.Column(db.Integer(), primary_key=True, index=True)
    name = db.Column(db.String(50), index=True, unique=True)

    def __repr__(self):
        return '<Frequency {}>'.format(self.name)
