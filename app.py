import os
<<<<<<< HEAD
from flask import Flask, redirect, url_for, render_template, jsonify, session, request
from flask_dance.contrib.google import make_google_blueprint, google
from flask_dance.contrib.github import make_github_blueprint, github
from dotenv import load_dotenv
=======
>>>>>>> saad
from functools import wraps

from flask import (
    Flask,
    render_template,
    request,
    jsonify,
    redirect,
    url_for,
    session
)

from flask_dance.contrib.google import make_google_blueprint, google
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
from ultralytics import YOLO
from flask import Response
from uploaded_video_stream import stream_uploaded_video


# =========================
# LOCAL IMPORTS
# =========================
from main import generate_summary
from phase_detection_service import run_phase_detection

# =========================
# APP SETUP
# =========================
load_dotenv()
<<<<<<< HEAD
app = Flask(__name__,
            template_folder="Testing/templates",
            static_folder="Testing/static")

app.secret_key = os.getenv("FLASK_SECRET_KEY", "supersecretkey")

# --- Github OAuth Setup --
github_bp = make_github_blueprint(
    client_id= os.getenv("GITHUB_CLIENT_ID"),
    client_secret= os.getenv("GITHUB_CLIENT_SECRET"),
<<<<<<< HEAD
    redirect_url= "/auth/github/authorized"
=======
>>>>>>> 59a7ee70a8814f45bc149a53817527e332d0787f
)
app.register_blueprint(github_bp, url_prefix="/auth")

# --- Google OAuth Setup ---
=======

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "supersecretkey")

UPLOAD_FOLDER = "uploads"
STATIC_FOLDER = "static"
DETECT_FOLDER = os.path.join(STATIC_FOLDER, "runs", "detect")

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(DETECT_FOLDER, exist_ok=True)

# =========================
# LOAD MODELS (ONCE)
# =========================
tool_model = YOLO("best_tool.pt")

# =========================
# GOOGLE OAUTH (FIXED SCOPES)
# =========================
>>>>>>> saad
google_bp = make_google_blueprint(
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    scope=[
        "openid",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
    ],
)
<<<<<<< HEAD
# This is the correct way to add the parameter.
google_bp.authorization_url_params["prompt"] = "select_account"
app.register_blueprint(google_bp, url_prefix="/google")
=======
app.register_blueprint(google_bp, url_prefix="/login")
>>>>>>> saad

# =========================
# AUTH DECORATOR
# =========================
def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if "user" not in session:
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return wrapper

# =========================
# UI ROUTES
# =========================

<<<<<<< HEAD
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
=======
>>>>>>> saad
@app.route("/")
def index():
    """Landing page (used by templates)"""
    return render_template("Landing.html")

# Alias (optional but safe)
@app.route("/landing")
def landing():
    return redirect(url_for("index"))

@app.route("/signup")
def signup():
    return render_template("signup.html")

@app.route("/login")
def login():
    if not google.authorized:
        return redirect(url_for("google.login"))

    resp = google.get("/oauth2/v2/userinfo")
    if not resp.ok:
        return "Failed to fetch user info", 400

    session["user"] = resp.json()
    return redirect(url_for("dashboard"))

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))

@app.route("/dashboard")
@login_required
def dashboard():
    return render_template("dashboard.html", user=session.get("user"))

@app.route("/upload")
@login_required
def upload_page():
    return render_template("upload.html")

<<<<<<< HEAD
@app.route("/chatbot_component")
def chatbot_component():
    return render_template("chatbot_component.html")


=======
@app.route("/upload-alias")
@login_required
def upload():
    return redirect(url_for("upload_page"))

@app.route("/tool_detection")
@login_required
def tool_detection_page():
    return render_template("tool_detection_page.html")

@app.route("/upload_video", methods=["POST"])
@login_required
def upload_video():
    video = request.files["video"]
    filename = secure_filename(video.filename)

    video_path = os.path.join(UPLOAD_FOLDER, filename)
    video.save(video_path)

    return jsonify({
        "success": True,
        "video_url": url_for("video_stream", filename=filename)
    })
@app.route("/video_stream/<filename>")
@login_required
def video_stream(filename):
    video_path = os.path.join(UPLOAD_FOLDER, filename)

    return Response(
        stream_uploaded_video(video_path),
        mimetype="multipart/x-mixed-replace; boundary=frame"
    )


# =========================
# API: FILE UPLOAD (GENERIC)
# =========================
>>>>>>> saad
@app.route("/file_upload", methods=["POST"])
@login_required
def file_upload():
    file = request.files["file"]
    filename = secure_filename(file.filename)

    path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(path)

    summary = None
    if filename.lower().endswith(".pdf"):
        summary = generate_summary(path)

    return jsonify({
        "success": True,
        "filename": filename,
        "summary": summary
    })


# =========================
# API: PDF → SUMMARY
# =========================
@app.route("/api/summarize", methods=["POST"])
@login_required
def summarize_pdf():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    filename = secure_filename(file.filename)

    if not filename.lower().endswith(".pdf"):
        return jsonify({"error": "Only PDF files allowed"}), 400

    pdf_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(pdf_path)

    summary = generate_summary(pdf_path)

    return jsonify({
        "success": True,
        "summary": summary
    })

# =========================
# API: YOLO TOOL DETECTION
# =========================
@app.route("/api/detect_tools", methods=["POST"])
@login_required
def detect_tools():
    if "video" not in request.files:
        return jsonify({"error": "No video uploaded"}), 400

    video = request.files["video"]
    filename = secure_filename(video.filename)

    input_path = os.path.join(UPLOAD_FOLDER, filename)
    video.save(input_path)

    tool_model.predict(
        source=input_path,
        save=True,
        project=os.path.join(STATIC_FOLDER, "runs"),
        name="detect",
        exist_ok=True,
        conf=0.25
    )

    video_url = url_for(
        "static",
        filename=f"runs/detect/{filename}"
    )

    return jsonify({
        "success": True,
        "video_url": video_url
    })

# =========================
# API: PHASE DETECTION
# =========================
@app.route("/api/detect_phase", methods=["POST"])
@login_required
def detect_phase():
    if "video" not in request.files:
        return jsonify({"error": "No video uploaded"}), 400

    video = request.files["video"]
    filename = secure_filename(video.filename)

    video_path = os.path.join(UPLOAD_FOLDER, filename)
    video.save(video_path)

    result = run_phase_detection(video_path)

    return jsonify({
        "success": True,
        "result": result
    })


# =========================
# RUN SERVER
# =========================
if __name__ == "__main__":
    app.run(debug=True)
<<<<<<< HEAD
=======

##=========================
# SUMMARY MODULE
# =========================
>>>>>>> saad
