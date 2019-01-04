from volunteermatching import app, db
from .models import Partner, Opportunity, Passion, AgeGroupInterest, Skill, \
    Frequency
from .forms import PassionForm, AgeGroupInterestForm, SkillForm, \
    FrequencyForm, CreatePartner, CreateOpportunity
from flask import render_template, request, flash, url_for, redirect
from flask_login import login_required
from volunteermatching.decorators import requires_roles


@app.route('/admin/categories', methods=["GET", "POST"])
@login_required
@requires_roles('Admin','User')
def admin_categories():
    passions = Passion.query.all()
    passion_form = PassionForm()
    age_group_interests = AgeGroupInterest.query.all()
    agi_form = AgeGroupInterestForm()
    skills = Skill.query.all()
    skill_form = SkillForm()
    frequencies = Frequency.query.all()
    frequency_form = FrequencyForm()
    if passion_form.submit_passion.data and passion_form.validate_on_submit():
        name = Passion(name=passion_form.passion_name.data)
        db.session.add(name)
        db.session.commit()
        return redirect(url_for('admin_categories'))
    elif agi_form.submit_agi.data and agi_form.validate_on_submit():
        name = AgeGroupInterest(name=agi_form.agi_name.data)
        db.session.add(name)
        db.session.commit()
        return redirect(url_for('admin_categories'))
    elif skill_form.submit_skill.data and skill_form.validate_on_submit():
        name = Skill(name=skill_form.skill_name.data)
        db.session.add(name)
        db.session.commit()
        return redirect(url_for('admin_categories'))
    elif frequency_form.submit_frequency.data and \
        frequency_form.validate_on_submit():
        name = Frequency(name=frequency_form.frequency_name.data)
        db.session.add(name)
        db.session.commit()
        return redirect(url_for('admin_categories'))

    return render_template('volops/categories.html', title='Admin Passions',
        passions=passions, passion_form=passion_form,
        age_group_interests=age_group_interests,
        agi_form=agi_form, skills=skills, skill_form=skill_form,
        frequencies=frequencies, frequency_form=frequency_form)


@app.route('/admin/categories/passions/<id>', methods=["GET", "POST"])
@login_required
@requires_roles('Admin','User')
def admin_passions_delete(id):
    passion = Passion.query.filter_by(id=id).first()
    if passion is not None:
        db.session.delete(passion)
        db.session.commit()
        return redirect(url_for('admin_categories'))
    return redirect(url_for('admin_categories'))


@app.route('/admin/categories/agegroupinterest/<id>', methods=["GET", "POST"])
@login_required
@requires_roles('Admin','User')
def admin_age_group_interest_delete(id):
    age_group_interest = AgeGroupInterest.query.filter_by(id=id).first()
    if age_group_interest is not None:
        db.session.delete(age_group_interest)
        db.session.commit()
        return redirect(url_for('admin_categories'))
    return redirect(url_for('admin_categories'))


@app.route('/admin/categories/skill/<id>', methods=["GET", "POST"])
@login_required
@requires_roles('Admin','User')
def skill_delete(id):
    skill = Skill.query.filter_by(id=id).first()
    if skill is not None:
        db.session.delete(skill)
        db.session.commit()
        return redirect(url_for('admin_categories'))
    return redirect(url_for('admin_categories'))


@app.route('/admin/categories/frequency/<id>', methods=["GET", "POST"])
@login_required
@requires_roles('Admin','User')
def frequency_delete(id):
    frequency = Frequency.query.filter_by(id=id).first()
    if frequency is not None:
        db.session.delete(frequency)
        db.session.commit()
        return redirect(url_for('admin_categories'))
    return redirect(url_for('admin_categories'))


@app.route('/partners')
def partners():
    partners = Partner.query.all()
    return render_template('volops/partners.html', title="Partners",
        partners=partners)


@app.route('/partners/create_partner', methods=["GET", "POST"])
@login_required
def create_partner():
    form = CreatePartner()
    if form.validate_on_submit():
        partner = Partner(name=form.name.data)
        db.session.add(partner)
        db.session.commit()
        return redirect(url_for('partners'))
    return render_template('volops/create_partner.html', title="Create \
        Partner", form=form)


@app.route('/opportunities/')
def opportunities():
    opportunities = Opportunity.query.all()
    return render_template('volops/opportunities.html', title="Opportunities",
        opportunities=opportunities)


@app.route('/opportunities/create_opportunity', methods=["GET", "POST"])
@login_required
def create_opportunity():
    form = CreateOpportunity(partners=Partner.query.all())
    partners = Partner.query.all()
    partner_names = []
    for partner in partners:
        partner_names.append((partner.id, partner.name))
    form.partner_id.choices = partner_names
    if form.validate_on_submit():
        opportunity = Opportunity(
            name=form.name.data,
            active=form.active.data,
            job_number=form.job_number.data,
            description=form.description.data,
            shift_hours=form.shift_hours.data,
            commitment_length=form.commitment_length.data,
            start_date=form.start_date.data,
            end_date=form.end_date.data,
            training_time_required=form.training_time_required.data,
            volunteers_needed=form.volunteers_needed.data,
            partner_id=int(form.partner_id.data),
            location_street=form.location_street.data,
            location_city=form.location_city.data,
            location_zip=form.location_zip.data)
        db.session.add(opportunity)
        db.session.commit()
        return redirect(url_for('opportunities'))
    return render_template('volops/create_opportunity.html', title="Create \
        Opportunity", form=form)
