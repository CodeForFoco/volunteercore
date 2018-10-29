from volunteermatching import app, db
from .models import Partner, Opportunity, Passion, AgeGroupInterest, Skill, \
    Frequency
from .forms import PassionForm, AgeGroupInterestForm, SkillForm, \
    FrequencyForm, CreatePartner
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


@app.route('/opportunities')
def opportunities():
    opportunities = Opportunity.query.all()
    return render_template('volops/opportunities.html', title="Opportunities",
        opportunities=opportunities)
