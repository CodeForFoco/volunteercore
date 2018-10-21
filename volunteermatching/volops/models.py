from volunteermatching import db

class Partner(db.Model):
    id = db.Column(db.Integer(), primary_key=True, index=True)
    name = db.Column(db.String(200), index=True, unique=True)
    opportunities = db.relationship('Opportunity', backref='partner', lazy='dynamic')

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
    partner_id = db.Column(db.Integer, db.ForeignKey('partner.id'))

    def __repr__(self):
        return '<Opportunity {}>'.format(self.name)
