import click
from volunteermatching import db
from volunteermatching.auth.models import User


def register(app):
    @app.cli.command()
    @click.option('--admin', prompt='Enter your admin username')
    @click.option('--password', prompt='Enter your admin password')
    def create_admin(admin, password):
        """Create admin user"""
        if not User.query.filter_by(username=admin).first():
            admin = User(username=admin)
            admin.hash_password(password)
            db.session.add(admin)
            db.session.commit()
            click.echo('Admin user created')
        else:
            click.echo('Admin user already exists')
