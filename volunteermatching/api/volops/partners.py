from flask import jsonify, request, url_for
from volunteermatching import app, db
from volunteermatching.volops.models import Partner
from volunteermatching.api.errors import bad_request
from volunteermatching.api.auth import token_auth


# API GET endpoint returns individual partner from given id
@app.route('/api/partners/<int:id>', methods=['GET'])
def get_partner_api(id):
    return jsonify(Partner.query.get_or_404(id).to_dict())

# API GET endpoint returns all partners, paginated with given page and
# quantity per page. Accepts search argument to filter with Whoosh search.
@app.route('/api/partners', methods=['GET'])
def get_partners_api():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    search = request.args.get('search')
    if search:
        data = Partner.to_colletion_dict(
            Partner.query.whoosh_search(search), page, per_page,
            'get_partners_api')
    else:
        data = Partner.to_colletion_dict(
            Partner.query, page, per_page, 'get_partners_api')
    return jsonify(data)

# API POST endpoint to create a new partner
@token_auth.login_required
@app.route('/api/partners', methods=['POST'])
def create_partner_api():
    data = request.get_json() or {}
    if 'name' not in data:
        return bad_request('must include partner name field')
    if Partner.query.filter_by(name=data['name']).first():
        return bad_request('this partner already exists')
    partner = Partner()
    partner.from_dict(data, new_partner=True)
    db.session.add(partner)
    db.session.commit()
    response = jsonify(partner.to_dict())
    response.status_code = 201
    response.headers['Location'] = url_for('get_partner_api', id=partner.id)
    return response

# API PUT endpoint to update a partner
@token_auth.login_required
@app.route('/api/partners/<int:id>', methods=['PUT'])
def update_partner_api(id):
    partner = Partner.query.get_or_404(id)
    data = request.get_json() or {}
    if 'name' in data and data['name'] != partner.name and \
            Partner.query.filter_by(name=data['name']).first():
        return bad_request('please use a different partner name')
    partner.from_dict(data, new_partner=False)
    db.session.commit()
    return jsonify(partner.to_dict())

# API DELETE endpoint to delete a partner
@token_auth.login_required
@app.route('/api/partners/<int:id>', methods=['DELETE'])
def delete_partner_api(id):
    if not Partner.query.filter_by(id=id).first():
        return bad_request('this partner does not exist')
    partner = Partner.query.get_or_404(id)
    db.session.delete(partner)
    db.session.commit()
    return '', 204
