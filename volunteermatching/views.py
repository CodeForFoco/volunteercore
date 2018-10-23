from flask import render_template, redirect, url_for
from volunteermatching import app
from flask_login import login_required
from volunteermatching.auth.views import users


@app.route('/')
@app.route('/index')
@login_required
def index():
    return render_template("index.html", title="Home Page")

@app.route('/admin/')
@login_required
def admin():
    return redirect(url_for('users'))
