import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        "postgresql://" + \
        os.environ.get('DATABASE_USER') + ":" + \
        os.environ.get('DATABASE_PASSWORD') + "@localhost/" + \
        os.environ.get('DATABASE_NAME') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    WHOOSH_BASE = basedir + '/whoosh/'
    JWT_TOKEN_LOCATION = ('cookies', 'headers')
    JWT_ACCESS_TOKEN_EXPIRES = 3600
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    JWT_COOKIE_SECURE = os.environ.get('JWT_COOKIE_SECURE')
    JWT_COOKIE_CSRF_PROTECT = os.environ.get('JWT_COOKIE_CSRF_PROTECT')
    JWT_ACCESS_COOKIE_PATH = '/api/'
    JWT_ACCESS_CSRF_COOKIE_PATH = '/api/'
    JWT_REFRESH_COOKIE_PATH = '/api/token/refresh'
    JWT_REFRESH_CSRF_COOKIE_PATH = '/api/token/refresh'
