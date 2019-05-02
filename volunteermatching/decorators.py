from flask import redirect, url_for, request, flash, g
from functools import wraps
from volunteermatching.api.errors import error_response


def requires_roles(*roles):
    def wrapper(func):
        @wraps(func)
        def wrapped(*args, **kwargs):
            if not set(roles).issubset(set(g.current_user.get_user_roles())):
                return error_response(401)
            return func(*args, **kwargs)
        return wrapped
    return wrapper
