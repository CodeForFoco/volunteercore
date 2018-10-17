from volunteermatching import app
from .models import User
from .forms import LoginForm
from flask import render_template, request, flash, url_for, redirect
from flask_login import current_user, login_user, logout_user
from werkzeug.urls import url_parse

@app.route('/login', methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        email = User.query.filter_by(email=form.email.data).first()
        if email is None or not email.verify_password(form.password.data):
            flash('Invalid email or password')
            return redirect(url_for('login'))
        login_user(email, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page) != '':
            next_page = url_for('index')
        return redirect(next_page)
    return render_template('auth/login.html', title='Sign In', form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))
