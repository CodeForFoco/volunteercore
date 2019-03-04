from flask import jsonify, g
from volunteermatching import app, db
from .auth import basic_auth, token_auth

# API POST endpoint to set and receive a user token.
@app.route('/api/tokens', methods=['POST'])
@basic_auth.login_required
def get_token():
    token = g.current_user.get_token()
    db.session.commit()
    return jsonify({'token': token})


# API DELETE endpoint to revoke a user token.
@app.route('/api/tokens', methods=['DELETE'])
@token_auth.login_required
def revoke_token():
    g.current_user.revoke_token()
    db.session.commit()
    return '', 204
