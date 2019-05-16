import os
import csv
from flask import request
from werkzeug.utils import secure_filename
from config import Config
from volunteermatching import db
from volunteermatching.api import bp
from volunteermatching.volops.models import Partner, Opportunity, Tag, \
    TagCategory
from volunteermatching.api.errors import bad_request
from volunteermatching.api.auth import token_auth
from volunteermatching.decorators import requires_roles
from flask_whooshalchemyplus import index_one_record
from werkzeug.utils import secure_filename


# API POST endpoint for importing Tag data
@bp.route('/api/import/tags', methods=['POST'])
@token_auth.login_required
@requires_roles('Admin')
def import_tags():
    if 'file' not in request.files:
        return bad_request('must provide a file')
    import_csv = request.files['file']
    if import_csv.filename == '':
        return bad_request('must provide a file')
    if import_csv and import_csv.filename.rsplit('.', 1)[1].lower() == 'csv':
        import_filename = secure_filename(import_csv.filename)
        import_csv.save(os.path.join(Config.UPLOAD_FOLDER, import_filename))
        with open(os.path.join(
                Config.UPLOAD_FOLDER, import_filename), 'r') as open_csv:
            file_read = csv.reader(open_csv, delimiter=',')
            items_imported = 0
            for row in file_read:
                tag = Tag(name=row[2])
                if Tag.query.filter_by(name=row[2]).first():
                    continue
                if not TagCategory.query.filter_by(name=row[0]).first():
                    tag_category = TagCategory(name=row[0])
                    db.session.add(tag_category)
                    db.session.commit()
                tag.tag_category_id = TagCategory.query.filter_by(
                    name=row[0]).first().id
                db.session.add(tag)
                db.session.commit()
                items_imported += 1
        open_csv.close()
        os.remove(os.path.join(Config.UPLOAD_FOLDER, import_filename))
        return str(items_imported) + ' tags imported'
