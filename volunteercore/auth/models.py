import base64
from datetime import datetime, timedelta
import os
from volunteercore.auth import login_manager
from passlib.apps import custom_app_context as pwd_context
from flask_login import UserMixin
from volunteercore.mixins import PagininatedAPIMixin
from volunteercore import db

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
    email = db.Column(db.String(255), unique=True)
    username = db.Column(db.String(255), index=True, unique=True)
    password_hash = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    confirmed_at = db.Column(db.DateTime())
    token = db.Column(db.String(32), index=True, unique=True)
    token_expiration = db.Column(db.DateTime)
    roles = db.relationship('Role', secondary=roles_users,
                            backref=db.backref('users', lazy='dynamic'))

    def hash_password(self, password):
        self.password_hash = pwd_context.hash(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)

    def get_token(self, expires_in=3600):
        now = datetime.utcnow()
        if self.token and self.token_expiration > now + timedelta(seconds=60):
            return self.token
        self.token = base64.b64encode(os.urandom(24)).decode('utf-8')
        self.token_expiration = now + timedelta(seconds=expires_in)
        db.session.add(self)
        return self.token

    def revoke_token(self):
        self.token_expiration = datetime.utcnow() - timedelta(seconds=1)

    @staticmethod
    def check_token(token):
        user = User.query.filter_by(token=token).first()
        if user is None or user.token_expiration < datetime.utcnow():
            return None
        return user

    def get_user_roles(self):
        role_names = []
        for r in self.roles:
            role_names.append(r.name)
        return role_names

    def to_dict(self, include_email=False):
        data = {
            'id': self.id,
            'username': self.username,
            'roles': self.get_user_roles()
        }
        if include_email:
            data['email'] = self.email
        return data

    def from_dict(self, data):
        for field in ['email', 'username', 'roles']:
            role_ids = []
            if field in data and field == 'roles':
                for role in data[field]:
                    role_ids.append(Role.query.filter_by(name=role).first())
                self.roles = role_ids
            elif field in data:
                setattr(self, field, data[field])
        if 'password' in data:
            self.hash_password(data['password'])


@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))
