from volunteermatching import db
from volunteermatching.auth import login_manager
from passlib.apps import custom_app_context as pwd_context
from flask_login import UserMixin
from volunteermatching.mixins import PagininatedAPIMixin

# Define models
roles_users = db.Table('roles_users',
                       db.Column('user_id', db.Integer(),
                                 db.ForeignKey('user.id')),
                       db.Column('role_id', db.Integer(),
                                 db.ForeignKey('role.id')))


class Role(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))


class User(PagininatedAPIMixin, UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), index=True, unique=True)
    password_hash = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    confirmed_at = db.Column(db.DateTime())
    roles = db.relationship('Role', secondary=roles_users,
                            backref=db.backref('users', lazy='dynamic'))

    def hash_password(self, password):
        self.password_hash = pwd_context.hash(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)

    def get_user_roles(self):
        role_names = []
        for r in self.roles:
            role_names.append(r.name)
        return role_names

    def to_dict(self, include_email=False):
        data = {
            'id': self.id,
            'roles': self.get_user_roles()
        }
        if include_email:
            data['email'] = self.email
        return data

    def from_dict(self, data, new_user=False):
        for field in ['email']:
            if field in data:
                setattr(self, field, data[field])
        if new_user and 'password' in data:
            self.hash_password(data['password'])


@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))
