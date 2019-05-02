from flask import jsonify, request, url_for
from volunteermatching import db
from volunteermatching.api import bp
from volunteermatching.volops.models import TagCategory, Tag
from volunteermatching.api.errors import bad_request
from volunteermatching.api.auth import token_auth
from volunteermatching.decorators import requires_roles


# API GET endpoint returns individial tag category with given id
@bp.route('/api/tag_categories/<int:id>', methods=['GET'])
def get_tag_category_api(id):
    return jsonify(TagCategory.query.get_or_404(id).to_dict())

# API GET endpoint returns all tag categories with tags, paginated with given
# page and quantity per page
@bp.route('/api/tag_categories', methods=['GET'])
def get_tag_categories_api():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    data = TagCategory.to_colletion_dict(
        TagCategory.query, page, per_page, 'api.get_tag_categories_api')
    return jsonify(data)

# API PUSH endpoint to update a tag category
@bp.route('/api/tag_categories/<int:id>', methods=['PUT'])
@token_auth.login_required
@requires_roles('Admin')
def update_tag_category_api(id):
    tag_category = TagCategory.query.get_or_404(id)
    data = request.get_json() or {}
    if 'name' in data and data['name'] != tag_category.name and \
            TagCategory.query.filter_by(name=data['name']).first():
        return bad_request('please use a different tag category name')
    if 'tags' in data:
        for tag in data['tags']:
            if not Tag.query.filter_by(name=tag).first():
                new_tag = Tag(name=tag)
                db.session.add(new_tag)
    tag_category.from_dict(data, new_tag_category=False)
    db.session.commit()
    return jsonify(tag_category.to_dict())

# API POST endpost to create a new tag category
@bp.route('/api/tag_categories', methods=['POST'])
@token_auth.login_required
@requires_roles('Admin')
def create_tag_category_api():
    data = request.get_json() or {}
    if 'category_name' not in data:
        return bad_request('must include tag category name field')
    if TagCategory.query.filter_by(name=data['category_name']).first():
        return bad_request('this tag category already exists')
    if 'tags' in data:
        for tag in data['tags']:
            if not Tag.query.filter_by(name=tag).first():
                new_tag = Tag(name=tag)
                db.session.add(new_tag)
    tag_category = TagCategory()
    tag_category.from_dict(data, new_tag_category=True)
    db.session.add(tag_category)
    db.session.commit()
    response = jsonify(tag_category.to_dict())
    response.status_code = 201
    response.headers['Location'] = url_for(
        'api.get_tag_category_api', id=tag_category.id)
    return response

# API DELETE endpoint to delete a tag category
@bp.route('/api/tag_categories/<int:id>', methods=['DELETE'])
@token_auth.login_required
@requires_roles('Admin')
def delete_tag_categories_api(id):
    if not TagCategory.query.filter_by(id=id).first():
        return bad_request('this tag category does not exist')
    tag_category = TagCategory.query.get_or_404(id)
    db.session.delete(tag_category)
    db.session.commit()
    return '', 204

# API GET endpoint returns a single tag by id
@bp.route('/api/tags/<int:id>', methods=['GET'])
def get_tag_api(id):
    return jsonify(Tag.query.get_or_404(id).to_dict())

# API GET endpoint returns all tags, paginated with given page and quantity
# per page
@bp.route('/api/tags', methods=['GET'])
def get_tags_api():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    data = Tag.to_colletion_dict(
        Tag.query, page, per_page, 'api.get_tags_api')
    return jsonify(data)

# API PUSH endpoint to update a tag
@bp.route('/api/tags/<int:id>', methods=['PUT'])
@token_auth.login_required
@requires_roles('Admin')
def update_tag_api(id):
    tag = Tag.query.get_or_404(id)
    data = request.get_json() or {}
    if 'name' in data and data['name'] != tag.name and \
            Tag.query.filter_by(name=data['name']).first():
        return bad_request('please use a different tag name')
    tag.from_dict(data, new_tag=False)
    db.session.commit()
    return jsonify(tag.to_dict())

# API POST endpoint to create a new tag
@bp.route('/api/tags', methods=['POST'])
@token_auth.login_required
@requires_roles('Admin')
def create_tag_api():
    data = request.get_json() or {}
    if 'name' not in data:
        return bad_request('must include tag name field')
    if Tag.query.filter_by(name=data['name']).first():
        return bad_request('this tag already exists')
    tag = Tag()
    tag.from_dict(data, new_tag=True)
    db.session.add(tag)
    db.session.commit()
    response = jsonify(tag.to_dict())
    response.status_code = 201
    response.headers['Location'] = url_for(
        'api.get_tag_api', id=tag.id)
    return response

# API DELETE endpoint to delete a tag
@bp.route('/api/tags/<int:id>', methods=['DELETE'])
@token_auth.login_required
@requires_roles('Admin')
def delete_tag_api(id):
    if not Tag.query.filter_by(id=id).first():
        return bad_request('this tag does not exist')
    tag = Tag.query.get_or_404(id)
    db.session.delete(tag)
    db.session.commit()
    return '', 204
