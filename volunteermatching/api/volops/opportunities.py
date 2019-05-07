from flask import jsonify, request, url_for
from volunteermatching import db
from volunteermatching.api import bp
from volunteermatching.volops.models import Partner, Opportunity
from volunteermatching.api.errors import bad_request
from volunteermatching.api.auth import token_auth
from flask_whooshalchemyplus import index_one_record


# API GET endpoint returns individual opportunity from given id
@bp.route('/api/opportunities/<int:id>', methods=['GET'])
def get_opportunity_api(id):
    return jsonify(Opportunity.query.get_or_404(id).to_dict())

# API GET endpoint returns all opportunities, paginated with given page and
# quantity per page. Accepts search argument to filter with Whoosh search.
@bp.route('/api/opportunities', methods=['GET'])
def get_opportunities_api():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    search = request.args.get('search')
    frequency_unit = request.args.get('frequency_unit')
    frequency_modifier = request.args.get('frequency_modifier')

    if search:
        data = Opportunity.query.whoosh_search(search, or_=True)
        if frequency_unit and frequency_modifier:
            data = data.filter_by(
                frequency_unit=frequency_unit,
                frequency_modifier=frequency_modifier)
        elif frequency_modifier:
            data = data.filter_by(frequency_modifier=frequency_modifier)
        elif frequency_unit:
            data = data.filter_by(frequency_unit=frequency_unit)
    elif frequency_unit and frequency_modifier:
        data = Opportunity.query.filter_by(
            frequency_unit=frequency_unit,
            frequency_modifier=frequency_modifier)
    elif frequency_modifier:
        data = Opportunity.query.filter_by(
            frequency_modifier=frequency_modifier)
    elif frequency_unit:
        data = Opportunity.query.filter_by(frequency_unit=frequency_unit)
    else:
        data = Opportunity.query
    data = Opportunity.to_colletion_dict(
            data, page, per_page, 'api.get_opportunities_api')
    return jsonify(data)

# API PUT endpoint to update an opportunity
@bp.route('/api/opportunities/<int:id>', methods=['PUT'])
@token_auth.login_required
def update_opportunity_api(id):
    opportunity = Opportunity.query.get_or_404(id)
    data = request.get_json() or {}
    if 'name' in data and data['name'] != opportunity.name and \
            Opportunity.query.filter_by(name=data['name']).first():
        return bad_request('please use a different opportunity name')
    if 'partner_name' in data:
        data['partner_id'] = Partner.query.filter_by(
            name=data['partner_name']).first().id
    opportunity.from_dict(data, new_opportunity=False)
    opportunity.update_partner_string()
    opportunity.update_tag_strings()
    db.session.add(opportunity)
    db.session.commit()
    index_one_record(opportunity)
    return jsonify(opportunity.to_dict())

# API POST endpoint to create a new opportunity
@bp.route('/api/opportunities', methods=['POST'])
@token_auth.login_required
def create_opportunity_api():
    data = request.get_json() or {}
    if 'name' not in data or 'partner_name' not in data:
        return bad_request('must include opportunity and partner name field')
    if Opportunity.query.filter_by(name=data['name']).first():
        return bad_request('this opportunity already exists')
    data['partner_id'] = Partner.query.filter_by(
        name=data['partner_name']).first().id
    opportunity = Opportunity()
    opportunity.from_dict(data, new_opportunity=True)
    opportunity.partner_string = Partner.query.filter_by(
        id=opportunity.partner_id).first().name
    db.session.add(opportunity)
    db.session.commit()
    index_one_record(opportunity)
    response = jsonify(opportunity.to_dict())
    response.status_code = 201
    response.headers['Location'] = url_for(
        'api.get_opportunity_api', id=opportunity.id)
    return response

# API DELETE endpoint to delete an opportunity
@bp.route('/api/opportunities/<int:id>', methods=['DELETE'])
@token_auth.login_required
def delete_opportunity_api(id):
    if not Opportunity.query.filter_by(id=id).first():
        return bad_request('this opportunity does not exist')
    opportunity = Opportunity.query.get_or_404(id)
    db.session.delete(opportunity)
    db.session.commit()
    index_one_record(opportunity, delete=True)
    return '', 204
