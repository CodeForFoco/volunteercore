from volunteermatching import app, db
from .models import Partner, Opportunity, Passion, AgeGroupInterest, Skill, \
    Frequency
from .forms import PassionForm
from flask import render_template, request, flash, url_for, redirect
from flask_login import login_required

@app.route('/admin/categories', methods=["GET", "POST"])
@login_required
def admin_categories():
    passions = Passion.query.all()
    passion_form = PassionForm()
    if passion_form.validate_on_submit():
        name = Passion(name=passion_form.name.data)
        db.session.add(name)
        db.session.commit()
        return redirect(url_for('admin_categories'))
    return render_template('volops/categories.html', title='Admin Passions',
                           passions=passions, passion_form=passion_form)

@app.route('/admin/categories/passions/<id>', methods=["GET", "POST"])
@login_required
def admin_passions_delete(id):
    passion = Passion.query.filter_by(id=id).first()
    if passion is not None:
        db.session.delete(passion)
        db.session.commit()
        return redirect(url_for('admin_categories'))
    return redirect(url_for('admin_categories'))
