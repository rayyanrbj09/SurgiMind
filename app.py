import os
from flask import Flask, redirect, url_for, render_template, session, request, jsonify
from flask_dance.contrib.google import make_google_blueprint, google
from dotenv import load_dotenv
from functools import wraps
from backend.core.file_uploads import save_report_file

# -------------------------
# App Setup
# -------------------------
load_dotenv()
app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "supersecretkey")

# -------------------------
# Google OAuth Blueprint
# -------------------------
google_bp = make_google_blueprint(
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    scope=[
        "openid",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
    ],
    redirect_url="/login_success",        # After Google redirects back
)
google_bp.authorization_url_params["prompt"] = "select_account"
app.register_blueprint(google_bp, url_prefix="/login")

# -------------------------
# Login Required Decorator
# -------------------------
def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if "user" not in session:
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return decorated

# -------------------------
# Public Routes
# -------------------------
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

# -------------------------
# ✅ The ONLY callback route you need
# -------------------------
@app.route("/login_success")
def login_success():
    if not google.authorized:
        return redirect(url_for("login"))

    try:
        resp = google.get("/oauth2/v2/userinfo")
        if not resp.ok:
            return "Failed to fetch Google user info", 500

        user = resp.json()
        session["user"] = {
            "name": user.get("name"),
            "email": user.get("email"),
            "picture": user.get("picture"),
        }
        return redirect(url_for("dashboard"))

    except Exception as e:
        return f"An error occurred: {e}", 500

# -------------------------
# Logout
# -------------------------
@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))

# -------------------------
# Protected Routes
# -------------------------
@app.route("/dashboard")
@login_required
def dashboard():
    return render_template("dashboard.html", user=session["user"])

@app.route("/upload")
@login_required
def upload():
    return render_template("upload.html", user=session["user"])

@app.route("/file_upload", methods=["POST"])
@login_required
def file_upload():
    if "file" not in request.files:
        return jsonify({"success": False, "message": "No file uploaded"}), 400

    file = request.files["file"]
    upload_path = os.path.join(os.getcwd(), "uploads")

    if not os.path.exists(upload_path):
        os.makedirs(upload_path)

    success, message = save_report_file(file, upload_path)
    if success:
        return jsonify({"success": True, "filename": message})
    return jsonify({"success": False, "message": message}), 400

# -------------------------
# Run Server
# -------------------------
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5500)
