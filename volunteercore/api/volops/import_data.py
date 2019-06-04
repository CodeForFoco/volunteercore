import os
import csv
from datetime import datetime
from flask import request
from werkzeug.utils import secure_filename
from flask_login import login_required
from config import Config
from volunteercore import db
from volunteercore.api import bp
from volunteercore.volops.models import Partner, Opportunity, \
    Tag, TagCategory
from volunteercore.api.errors import bad_request
from volunteercore.decorators import requires_roles
from flask_whooshalchemyplus import index_one_record


# API POST endpoint for importing Tag data
@bp.route('/api/import/tags', methods=['POST'])
@login_required
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
                tag = Tag(name=row['tag'])
                if not TagCategory.query.filter_by(
                        name=row['tag_category']).first():
                    tag_category = TagCategory(name=row['tag_category'])
                    db.session.add(tag_category)
                    db.session.commit()
                if Tag.query.filter_by(
                        name=row['tag'],
                        tag_category_id=TagCategory.query.filter_by(
                        name=row['tag_category']).first().id).first():
                    continue
                tag.tag_category_id = TagCategory.query.filter_by(
                    name=row['tag_category']).first().id
                db.session.add(tag)
                db.session.commit()
                items_imported += 1
        open_csv.close()
        os.remove(os.path.join(Config.UPLOAD_FOLDER, import_filename))
        return str(items_imported) + ' tags imported'


# API POST endpoint for importing Opportunity data
@bp.route('/api/import/opportunities', methods=['POST'])
@login_required
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
                        name=row['opportunity']).first():
                    continue
                opportunity = Opportunity(
                        name=row['opportunity'],
                        location_street=row['location_street1'],
                        location_city=row['location_city'],
                        location_state=row['location_state'],
                        location_zip=row['location_zip'],
                        volunteers_needed=row['volunteers_needed']
                    )
                if row['start_date']:
                    opportunity.start_date = datetime.strptime(
                        row['start_date'], '%Y%m%d').date()
                if row['end_date']:
                    opportunity.end_date = datetime.strptime(
                        row['end_date'], '%Y%m%d').date()
                if row['location_street2']:
                    Opportunity.location_street = row['location_street1'] \
                        + ', ' + row['location_street2']
                if not Partner.query.filter_by(
                        name=row['partner']).first():
                    partner = Partner(name=row['partner'])
                    db.session.add(partner)
                    db.session.commit()
                    index_one_record(partner)
                opportunity.partner_id = Partner.query.filter_by(
                    name=row['partner']).first().id
                opportunity.partner_string = Partner.query.filter_by(
                    name=row['partner']).first().name
                db.session.add(opportunity)
                db.session.commit()
                index_one_record(opportunity)
                items_imported += 1
        open_csv.close()
        os.remove(os.path.join(Config.UPLOAD_FOLDER, import_filename))
        return str(items_imported) + ' Opportunities imported'


# API POST endpoint for importing Opportunity Tags data
@bp.route('/api/import/opportunity_tags', methods=['POST'])
@login_required
@requires_roles('Admin')
def import_opportunity_tags():
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
                if not Opportunity.query.filter_by(
                        name=row['opportunity']).first() or not \
                        row['tag'] or not row['tag_category']:
                    continue
                tag_category_id = TagCategory.query.filter_by(
                    name=row['tag_category']).first().id
                opportunity = Opportunity.query.filter_by(
                    name=row['opportunity']).first()
                opportunity.tags.append(Tag.query.filter_by(
                    tag_category_id=tag_category_id,
                    name=row['tag']).first())
                db.session.add(opportunity)
                db.session.commit()
                index_one_record(opportunity)
                items_imported += 1
        open_csv.close()
        os.remove(os.path.join(Config.UPLOAD_FOLDER, import_filename))
        return str(items_imported) + ' opportunity tags imported'
