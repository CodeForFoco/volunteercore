import os
import csv
from datetime import datetime
from flask import request
from werkzeug.utils import secure_filename
from config import Config
from volunteermatching import db
from volunteermatching.api import bp
from volunteermatching.volops.models import Partner, Opportunity, \
    Tag, TagCategory
from volunteermatching.api.errors import bad_request
from volunteermatching.api.auth import token_auth
from volunteermatching.decorators import requires_roles
from flask_whooshalchemyplus import index_one_record


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
            file_read = csv.DictReader(open_csv, delimiter=',')
            items_imported = 0
            for row in file_read:
                tag = Tag(name=row['Descript'])
                if not TagCategory.query.filter_by(name=row['Type']).first():
                    tag_category = TagCategory(name=row['Type'])
                    db.session.add(tag_category)
                    db.session.commit()
                if Tag.query.filter_by(
                        name=row['Descript'],
                        tag_category_id=TagCategory.query.filter_by(
                        name=row['Type']).first().id).first():
                    continue
                tag.tag_category_id = TagCategory.query.filter_by(
                    name=row['Type']).first().id
                db.session.add(tag)
                db.session.commit()
                items_imported += 1
        open_csv.close()
        os.remove(os.path.join(Config.UPLOAD_FOLDER, import_filename))
        return str(items_imported) + ' tags imported'


# API POST endpoint for importing Tag data
@bp.route('/api/import/opportunities', methods=['POST'])
@token_auth.login_required
@requires_roles('Admin')
def import_opportunities():
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
            file_read = csv.DictReader(open_csv, delimiter=',')
            items_imported = 0
            for row in file_read:
                if Opportunity.query.filter_by(
                        name=row['Jobname']).first():
                    continue
                opportunity = Opportunity(
                        name=row['Jobname'],
                        location_street=row['Address1'],
                        location_city=row['City'],
                        location_state=row['State'],
                        location_zip=row['Zip'],
                        volunteers_needed=row['Requested']
                    )
                if row['Reqdate']:
                    opportunity.start_date = datetime.strptime(
                        row['Reqdate'], '%Y%m%d').date()
                if row['Enddate']:
                    opportunity.end_date = datetime.strptime(
                        row['Enddate'], '%Y%m%d').date()
                if row['Address2']:
                    Opportunity.location_street = row['Address1'] \
                        + ', ' + row['Address2']
                if not Partner.query.filter_by(
                        name=row['Sitename']).first():
                    partner = Partner(name=row['Sitename'])
                    db.session.add(partner)
                    db.session.commit()
                    index_one_record(partner)
                opportunity.partner_id = Partner.query.filter_by(
                    name=row['Sitename']).first().id
                db.session.add(opportunity)
                db.session.commit()
                index_one_record(opportunity)
                items_imported += 1
        open_csv.close()
        os.remove(os.path.join(Config.UPLOAD_FOLDER, import_filename))
        return str(items_imported) + ' Opportunities imported'
