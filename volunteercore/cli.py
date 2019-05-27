import click
from volunteercore import db
from volunteercore.auth.models import User, Role
from flask_whooshalchemyplus import index_all


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

    @app.cli.command()
    def auto_setup():
        """Automatically create default roles and admin user"""
        def auto_create_roles():
            if not Role.query.filter_by(name="Admin").first():
                role = Role(name="Admin")
                db.session.add(role)
                db.session.commit()
                click.echo('Admin role created')
            else:
                click.echo('Admin role already exists')

        def auto_create_admin():
            admin_role = Role.query.filter_by(name='Admin').first()
            if not User.query.filter_by(username='admin').first():
                admin = User(username='admin',
                             roles=[admin_role])
                admin.hash_password('password')
                db.session.add(admin)
                db.session.commit()
                click.echo('Default admin user created')
            elif admin_role not in \
            User.query.filter_by(username='admin').first().roles:
                admin = User.query.filter_by(username='admin').first()
                admin.roles.append(admin_role)
                db.session.add(admin)
                db.session.commit()
                click.echo('Admin role added to admin user')
            else:
                click.echo('Admin user already exists')
        auto_create_roles()
        auto_create_admin()

    @app.cli.command()
    def whoosh_index_all():
        """Index searcheable models for Whoosh """
        index_all(app)
