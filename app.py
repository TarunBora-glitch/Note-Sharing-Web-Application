import os
from flask import Flask, render_template, request, redirect, url_for, flash
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = "secret123"

# ✅ Upload config (ONLY ONCE)
UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"pdf", "docx", "pptx", "txt"}

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# ✅ File validation
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# ---------------- ROUTES ---------------- #

@app.route('/')
def home():
    return render_template('index.html')


# Temporary mock database
registered_emails = ["test@gmail.com"]

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        fullname = request.form.get('fullname')
        email = request.form.get('email')
        password = request.form.get('password')

        # Check if email already exists
        if email in registered_emails:
            flash("Email already registered. Please login.", "error")
            return redirect(url_for('signup'))

        # Save the email to our mock database
        registered_emails.append(email)

        # Redirect to profile setup
        return redirect(url_for('profile_setup'))

    return render_template('signup.html')


@app.route('/profile_setup', methods=['GET', 'POST'])
def profile_setup():
    if request.method == 'POST':
        return redirect(url_for('home_page'))
    return render_template('profile_setup.html')


@app.route('/home')
def home_page():
    return render_template('home.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        # TEMP LOGIN CHECK (NO DB)
        valid_email = "test@gmail.com"
        valid_password = "Test123"

        if email != valid_email or password != valid_password:
            flash("Invalid Credentials", "error")
        else:
            return redirect(url_for('home_page'))

    return render_template('login.html')

@app.route('/browse_notes')
def browse_notes():
    return render_template('browse_notes.html')


@app.route('/profile')
def profile():
    return render_template('profile.html')


# ✅ UPLOAD NOTES (FIXED)
@app.route("/upload", methods=["GET", "POST"])
def upload_notes():
    if request.method == "POST":

        year = request.form.get("year")
        semester = request.form.get("semester")
        subject = request.form.get("subject")

        # ✅ Validation (IMPORTANT)
        if not year or not semester or not subject:
            flash("Please select year, semester, and subject!")
            return redirect(request.url)

        files = request.files.getlist("files")

        if not files or files[0].filename == "":
            flash("No files selected!")
            return redirect(request.url)

        for file in files:
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)

                folder_path = os.path.join(
                    app.config["UPLOAD_FOLDER"],
                    year,
                    semester,
                    subject
                )

                os.makedirs(folder_path, exist_ok=True)

                file.save(os.path.join(folder_path, filename))

        flash("Notes uploaded successfully!")
        return redirect(url_for("home_page"))

    return render_template("upload_notes.html")


# ---------------- RUN ---------------- #

@app.route('/forgot_password', methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':
        email = request.form['email']

        # TEMP CHECK
        if email != "test@gmail.com":
            flash("Sorry, Email ID does not exist", "error")
        else:
            flash("Reset link sent to your email", "success")
            return redirect(url_for('reset_password'))

    return render_template('forgot_password.html')

import re

@app.route('/reset_password', methods=['GET', 'POST'])
def reset_password():
    if request.method == 'POST':
        password = request.form['password']
        confirm = request.form['confirm_password']

        # MATCH CHECK
        if password != confirm:
            flash("Passwords do not match", "error")

        # VALIDATION RULES
        elif len(password) < 6 or \
             not re.search(r"[A-Z]", password) or \
             not re.search(r"[a-z]", password) or \
             not re.search(r"[0-9]", password):

            flash("Password does not meet requirements", "error")

        else:
            flash("Password reset successful! Redirecting to login...", "success")
            return redirect(url_for('login'))

    return render_template('reset_password.html')

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)