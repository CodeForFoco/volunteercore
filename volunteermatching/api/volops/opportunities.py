from flask import jsonify, request, url_for
from volunteermatching import app, db
from volunteermatching.volops.models import Partner, Opportunity, Frequency
from volunteermatching.api.errors import bad_request


# API GET endpoint returns individual opportunity from given id
@app.route('/api/opportunities/<int:id>', methods=['GET'])
def get_opportunity_api(id):
    return jsonify(Opportunity.query.get_or_404(id).to_dict())

# API GET endpoint returns all opportunities, paginated with given page and
# quantity per page. Accepts search argument to filter with Whoosh search.
@app.route('/api/opportunities', methods=['GET'])
def get_opportunities_api():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    search = request.args.get('search')
    if search:
        data = Opportunity.to_colletion_dict(
            Opportunity.query.whoosh_search(search), page, per_page,
            'get_opportunities_api')
    else:
        data = Opportunity.to_colletion_dict(
            Opportunity.query, page, per_page, 'get_opportunities_api')
    return jsonify(data)

# API PUT endpoint to update an opportunity
@app.route('/api/opportunities/<int:id>', methods=['PUT'])
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
    db.session.commit()
    return jsonify(opportunity.to_dict())

# API POST endpoint to create a new opportunity
@app.route('/api/opportunities', methods=['POST'])
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
    db.session.add(opportunity)
    db.session.commit()
    response = jsonify(opportunity.to_dict())
    response.status_code = 201
    response.headers['Location'] = url_for(
        'get_opportunity_api', id=opportunity.id)
    return response

# API DELETE endpoint to delete an opportunity
@app.route('/api/opportunities/<int:id>', methods=['DELETE'])
def delete_opportunity_api(id):
    if not Opportunity.query.filter_by(id=id).first():
        return bad_request('this opportunity does not exist')
    opportunity = Opportunity.query.get_or_404(id)
    db.session.delete(opportunity)
    db.session.commit()
    return '', 204

# API GET endpoint returns individual frequency by id
@app.route('/api/frequencies/<int:id>', methods=['GET'])
def get_frequency_api(id):
    return jsonify(Frequency.query.get_or_404(id).to_dict())

# API GET endpoint returns a list of all frequencies
@app.route('/api/frequencies', methods=['GET'])
def get_frequencies_api():
    frequencies = []
    for frequency in Frequency.query.all():
        frequencies.append(frequency.name)
    data = {
        'frequencies': frequencies
    }
    return jsonify(data)

# API PUT endpoint to update a frequency
@app.route('/api/frequencies/<int:id>', methods=['PUT'])
def update_frequency_api(id):
    frequency = Frequency.query.get_or_404(id)
    data = request.get_json() or {}
    if 'name' in data and data['name'] != frequency.name and \
            Frequency.query.filter_by(name=data['name']).first():
        return bad_request('please use a different frequency name')
    frequency.from_dict(data, new_frequency=False)
    db.session.commit()
    return jsonify(frequency.to_dict())

# API POST endpoint to create a frequency
@app.route('/api/frequencies', methods=['POST'])
def create_frequency_api():
    data = request.get_json() or {}
    if 'name' not in data:
        return bad_request('must include frequency name field')
    frequency = Frequency()
    frequency.from_dict(data, new_frequency=True)
    db.session.add(frequency)
    db.session.commit()
    response = jsonify(frequency.to_dict())
    response.status_code = 201
    response.headers['Location'] = url_for(
        'get_frequency_api', id=frequency.id)
    return response

# API DELETE endpoint to delete a frequency
@app.route('/api/frequencies/<int:id>', methods=['DELETE'])
def delete_frequency_api(id):
    if not Frequency.query.filter_by(id=id).first():
        return bad_request('this frequency does not exist')
    frequency = Frequency.query.get_or_404(id)
    db.session.delete(frequency)
    db.session.commit()
    return '', 204
