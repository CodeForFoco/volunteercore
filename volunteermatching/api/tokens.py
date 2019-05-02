from flask import jsonify, g
from volunteermatching import db
from volunteermatching.api import bp
from .auth import basic_auth, token_auth

# API POST endpoint to set and receive a JWT access and refresh token and set
# as cookies.
@bp.route('/api/token/auth', methods=['POST'])
@basic_auth.login_required
def login():
    token = g.current_user.get_token()
    db.session.commit()
    resp = jsonify({'token': token})
    return resp, 200


# API POST endpoint to clear a users access and refresh token cookies.
@bp.route('/api/token/logout', methods=['POST'])
@token_auth.login_required
def logout():
    g.current_user.revoke_token()
    db.session.commit()
    return '', 204
