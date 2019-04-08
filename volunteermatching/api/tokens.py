from flask import jsonify, g
from volunteermatching.api import bp
from .auth import basic_auth
from flask_jwt_extended import (
    create_access_token, create_refresh_token, set_access_cookies,
    set_refresh_cookies, jwt_refresh_token_required, get_jwt_identity,
    unset_jwt_cookies
)

# API POST endpoint to set and receive a JWT access and refresh token and set
# as cookies.
@bp.route('/api/token/auth', methods=['POST'])
@basic_auth.login_required
def login():
    access_token = create_access_token(identity=g.current_user.email)
    refresh_token = create_refresh_token(identity=g.current_user.email)
    resp = jsonify({'login': True})
    set_access_cookies(resp, access_token)
    set_refresh_cookies(resp, refresh_token)
    return resp, 200


# API POST endpoint to refresh a JWT access token with a refresh token and
# update the access token cookie.
@bp.route('/api/token/refresh', methods=['POST'])
@jwt_refresh_token_required
def token_refresh():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)
    resp = jsonify({'refresh': True})
    set_access_cookies(resp, access_token)
    return resp, 200


# API POST endpoint to clear a users access and refresh token cookies.
@bp.route('/api/token/logout', methods=['POST'])
def logout():
    resp = jsonify({'logout': True})
    unset_jwt_cookies(resp)
    return resp, 200
