import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

if os.environ.get('DATABASE_SYSTEM') == "postgres":
    os.environ["DATABASE_URL"] = "postgresql://" + \
        os.environ.get('DATABASE_USER') + ":" + \
        os.environ.get('DATABASE_PASSWORD') + "@localhost/" + \
        os.environ.get('DATABASE_NAME')


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    WHOOSH_BASE = basedir + '/whoosh/'
    UPLOAD_FOLDER = 'uploads/'
