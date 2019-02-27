from flask import jsonify, request, url_for
from volunteermatching import app, db
from volunteermatching.auth.models import User
from .errors import bad_request


# API GET endpoint returns an individual user. The users email is only returned
# when the include_email argument is pass as True.
@app.route('/api/users/<int:id>', methods=['GET'])
def get_user_api(id):
    include_email = request.args.get('include_email', False)
    return jsonify(User.query.get_or_404(id).to_dict(include_email))

# API GET endpoint return all users, paginated with given page and quantity
# per page.
@app.route('/api/users', methods=['GET'])
def get_users_api():
    include_email = request.args.get('include_email', False)
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    data = User.to_colletion_dict(
            User.query, page, per_page, 'get_partners_api',
            include_email=include_email)
    return jsonify(data)

# API POST endpoint to create a new user
@app.route('/api/users', methods=['POST'])
def create_user_api():
    data = request.get_json() or {}
    if 'email' not in data or 'password' not in data:
        return bad_request('must include user email and password field')
    if User.query.filter_by(email=data['email']).first():
        return bad_request('this user already exists')
    user = User()
    user.from_dict(data, new_user=True)
    db.session.add(user)
    db.session.commit()
    response = jsonify(user.to_dict())
    response.status_code = 201
    response.headers['Location'] = url_for('get_user_api', id=user.id)
    return response

# API PUT endpoint to update a user
# Need to complete ability to add roles to user
@app.route('/api/users/<int:id>', methods=['PUT'])
def update_user_api(id):
    user = User.query.get_or_404(id)
    data = request.get_json() or {}
    if 'email' in data and data['email'] != user.email and \
            User.query.filter_by(email=data['email']).first():
        return bad_request('please use a different email')
    user.from_dict(data, new_user=False)
    db.session.commit()
    return jsonify(user.to_dict())

# API DELETE endpoint to delete a user
@app.route('/api/users/<int:id>', methods=['DELETE'])
def delete_user_api(id):
    if not User.query.filter_by(id=id).first():
        return bad_request('this user does not exist')
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return '', 204
