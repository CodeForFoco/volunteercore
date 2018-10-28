from flask import redirect, url_for, request, flash
from functools import wraps
from flask_login import current_user


def requires_roles(*roles):
    def wrapper(func):
        @wraps(func)
        def wrapped(*args, **kwargs):
            if set(current_user.get_user_roles()) != set(roles):
                flash('You do not have access to view that page.')
                return redirect(url_for('index'))
            return func(*args, **kwargs)
        return wrapped
    return wrapper
