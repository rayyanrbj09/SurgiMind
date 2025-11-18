import os
from flask import Flask, redirect, url_for, render_template, jsonify, session, request
from flask_dance.contrib.google import make_google_blueprint, google
from flask_dance.contrib.github import make_github_blueprint, github
from dotenv import load_dotenv
from functools import wraps
# UPDATED import to match the new function name
from backend.core.file_uploads import save_report_file

# --- App Setup ---
load_dotenv()
app = Flask(__name__,
            template_folder="Testing/templates",
            static_folder="Testing/static")

app.secret_key = os.getenv("FLASK_SECRET_KEY", "supersecretkey")

# --- Github OAuth Setup --
github_bp = make_github_blueprint(
    client_id= os.getenv("GITHUB_CLIENT_ID"),
    client_secret= os.getenv("GITHUB_CLIENT_SECRET"),
)
app.register_blueprint(github_bp, url_prefix="/auth")

# --- Google OAuth Setup ---
google_bp = make_google_blueprint(
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    redirect_to="google_auth_callback",
    scope=["openid", "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
)
# This is the correct way to add the parameter.
google_bp.authorization_url_params["prompt"] = "select_account"
app.register_blueprint(google_bp, url_prefix="/google")

# --- Route Protection Decorator ---
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "user" not in session:
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return decorated_function

@app.route("/auth/github/authorized")
def github_authorized():
    if not github.authorized:
        return redirect(url_for("login"))

    # Correct GitHub API endpoint
    resp = github.get("/user")
    if not resp.ok:
        return "GitHub authentication failed", 500

    user_data = resp.json()

    github_id = str(user_data.get("id"))
    name = user_data.get("name") or user_data.get("login")
    avatar = user_data.get("avatar_url")
    email = user_data.get("email")

    # If email missing, fetch from /user/emails
    if not email:
        email_resp = github.get("/user/emails")
        if email_resp.ok:
            primary = [e for e in email_resp.json() if e.get("primary")]
            if primary:
                email = primary[0].get("email")

    # Save to session
    session["user"] = {
        "provider": "github",
        "id": github_id,
        "name": name,
        "email": email,
        "avatar": avatar,
    }

    return redirect(url_for("dashboard"))


# --- Public Routes ---
@app.route("/")
def index():
    return render_template("Landing.html")

@app.route("/login")
def login():
    if "user" in session:
        return redirect(url_for("dashboard"))
    return render_template("login.html")

@app.route("/signup")
def signup():
    if "user" in session:
        return redirect(url_for("dashboard"))
    return render_template("signup.html")

@app.route("/auth/google/callback")
def google_auth_callback():
    if not google.authorized:
        return redirect(url_for("login"))

    try:
        resp = google.get("/oauth2/v2/userinfo")
        if resp.ok:
            user_info = resp.json()
            session["user"] = {
                "name": user_info.get("name", "User"),
                "email": user_info.get("email", "Unknown"),
                "picture": user_info.get("picture", "")
            }
            return redirect(url_for("dashboard"))
        else:
            return "Failed to fetch user info from Google.", 500
    except Exception as e:
        return f"An error occurred: {e}", 500

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))

# --- Protected Routes ---
@app.route("/dashboard")
@login_required
def dashboard():
    user = session.get("user")
    return render_template("dashboard.html", user=user)

@app.route("/upload")
@login_required
def upload():
    user = session.get("user")
    return render_template("upload.html", user=user)

@app.route("/chatbot_component")
def chatbot_component():
    return render_template("chatbot_component.html")


@app.route("/file_upload", methods=["POST"])
@login_required
def file_upload():

    if 'file' not in request.files:
        return jsonify({"success": False, "message": "No file part in the request."}), 400

    file = request.files['file']
    upload_path = os.path.join(os.getcwd(), 'uploads')

    if not os.path.exists(upload_path):
        os.makedirs(upload_path)

    # UPDATED to use the new function
    success, message_or_filename = save_report_file(file, upload_path)

    if success:
        return jsonify({"success": True, "filename": message_or_filename}), 200
    else:
        return jsonify({"success": False, "message": message_or_filename}), 400

# --- Run App ---
if __name__ == "__main__":
    app.run(debug=True)
