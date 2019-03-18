from volunteermatching import db
from volunteermatching.mixins import PagininatedAPIMixin


tags = db.Table(
    'tags',
    db.Column('opportunity_id', db.Integer, db.ForeignKey('opportunity.id')),
    db.Column('tags_id', db.Integer, db.ForeignKey('tag.id'))
)


class Partner(PagininatedAPIMixin, db.Model):
    __searchable__ = ['name']

    id = db.Column(db.Integer(), primary_key=True, index=True)
    name = db.Column(db.String(200), index=True, unique=True)
    opportunities = db.relationship(
        'Opportunity', backref='partner', lazy='dynamic')

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


class Opportunity(PagininatedAPIMixin, db.Model):
    __searchable__ = ['name', 'job_number', 'location_city', 'location_zip',
                      'tags_string']

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
    tags_string = db.Column(db.String(200))

    # One to many relationships
    partner_id = db.Column(db.Integer, db.ForeignKey('partner.id'))
    frequency_id = db.Column(db.Integer, db.ForeignKey('frequency.id'))

    # Many to many relations
    tags = db.relationship(
        'Tag', secondary='tags', lazy='subquery',
        backref=db.backref('opportunities', lazy=True))

    def get_frequency(self):
        if self.frequency:
            return self.frequency.name
        else:
            return None

    def get_tags(self, categorized=True):
        if self.tags:
            if categorized:
                tag_categories = []
                for category in TagCategory.query.all():
                    tag_categories.append(category.name)
                tag_data = {}
                for category in tag_categories:
                    tags = []
                    for tag in TagCategory.query.filter_by(
                            name=category).first().tags:
                        if tag in self.tags:
                            tags.append(tag.name)
                    if tags:
                        tag_data[category] = tags
            else:
                tag_data = []
                for tag in self.tags:
                    tag_data.append(tag.name)
            return tag_data
        else:
            return None

    def update_tag_strings(self):
        tags_string_total = ""
        for tag in self.tags:
            tags_string_total = tags_string_total + tag.name + " "
        self.tags_string = tags_string_total

    def to_dict(self):
        data = {
            'id': self.id,
            'active': self.active,
            'name': self.name,
            'job_number': self.job_number,
            'description': self.description,
            'shift_hours': self.shift_hours,
            'commitment_length': self.commitment_length,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'training_time_required': self.training_time_required,
            'volunteers_needed': self.volunteers_needed,
            'location_street': self.location_street,
            'location_city': self.location_city,
            'location_zip': self.location_zip,
            'tag_count': len(self.tags),
            'partner_name': Partner.query.filter_by(
                id=self.partner_id).first().name,
            'frequency': self.get_frequency()
        }
        if self.tags:
            data['tags'] = self.get_tags()
        return data

    def from_dict(self, data, new_opportunity=False):
        field_names = [
            'name', 'active', 'job_number', 'description', 'shift_hours',
            'commitment_length', 'start_date', 'end_date',
            'training_time_required', 'volunteers_needed', 'location_street',
            'location_city', 'location_zip', 'tag_count', 'partner_id'
        ]
        for field in field_names:
            if field in data:
                setattr(self, field, data[field])
        if 'frequency' in data:
            frequency = Frequency.query.filter_by(
                name=data['frequency']).first()
            setattr(self, 'frequency', frequency)
        if 'tags' in data:
            tag_ids = []
            for tag in data['tags']:
                tag_ids.append(Tag.query.filter_by(name=tag).first())
            setattr(self, 'tags', tag_ids)

    def __repr__(self):
        return '<Opportunity {}>'.format(self.name)


class TagCategory(PagininatedAPIMixin, db.Model):
    id = db.Column(db.Integer(), primary_key=True, index=True)
    name = db.Column(db.String(60), index=True, unique=True)
    tags = db.relationship('Tag', backref='tag_category', lazy='dynamic')

    def to_dict(self):
        tags = []
        for tag in self.tags:
            tags.append(tag.name)
        data = {
            'id': self.id,
            'category_name': self.name,
            'tags': tags
            }
        return data

    def from_dict(self, data, new_tag_category=False):
        if 'category_name' in data:
            setattr(self, 'name', data['category_name'])
        if 'tags' in data:
            tag_ids = []
            for tag in data['tags']:
                tag_ids.append(Tag.query.filter_by(name=tag).first())
            setattr(self, 'tags', tag_ids)

    def __repr__(self):
        return '<Tag Category {}>'.format(self.name)


class Tag(PagininatedAPIMixin, db.Model):
    id = db.Column(db.Integer(), primary_key=True, index=True)
    name = db.Column(db.String(60), index=True, unique=True)
    tag_category_id = db.Column(db.Integer, db.ForeignKey('tag_category.id'))

    def to_dict(self):
        data = {
            'id': self.id,
            'name': self.name,
            'tag_category': TagCategory.query.filter_by(
                id=self.tag_category_id).first().name
        }
        return data

    def from_dict(self, data, new_tag=False):
        if 'name' in data:
            setattr(self, 'name', data['name'])
        if 'tag_category' in data:
            tag_category_id = TagCategory.query.filter_by(
                name=data['tag_category']).first().id
            setattr(self, 'tag_category_id', tag_category_id)

    def __repr__(self):
        return '<Tag {}>'.format(self.name)


class Frequency(db.Model):
    id = db.Column(db.Integer(), primary_key=True, index=True)
    name = db.Column(db.String(50), index=True, unique=True)
    opportunities = db.relationship(
                    'Opportunity', backref='frequency', lazy='dynamic')

    def to_dict(self):
        data = {
            'id': self.id,
            'name': self.name
        }
        return data

    def from_dict(self, data, new_frequency=False):
        if 'name' in data:
            setattr(self, 'name', data['name'])

    def __repr__(self):
        return '<Frequency {}>'.format(self.name)
