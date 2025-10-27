import os
from flask import Flask, redirect, url_for, render_template, session
from flask_dance.contrib.google import make_google_blueprint, google
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
# A secret key is required for session management
app.secret_key = os.getenv("FLASK_SECRET_KEY", "supersecretkey")

# Google OAuth setup
google_bp = make_google_blueprint(
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    redirect_to="signup",  # FIX: Redirect back to the route that can process the login
    scope=[
        "openid",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
    ]
)
app.register_blueprint(google_bp, url_prefix="/login")

# Home route now shows the profile page directly
@app.route("/")
def index():
    user = session.get("user")
    # Renders profile.html, passing the user object if it exists
    return render_template("profile.html", user=user)

# Signup page (still needed for the login link)
@app.route("/signup")
def signup():
    if google.authorized:
        # Fetch Google user info
        resp = google.get("/oauth2/v2/userinfo")
        if resp.ok:
            user_info = resp.json()
            session["user"] = {
                "name": user_info.get("name", "User"),
                "email": user_info.get("email", "Unknown"),
                "picture": user_info.get("picture", "")
            }
            # After storing the user, redirect to the main page
            return redirect(url_for("index"))
    return render_template("signup.html")

# Profile page (the destination for OAuth redirect)
@app.route("/profile")
def profile():
    user = session.get("user")
    # This route now also just renders the profile page.
    # It acts as the landing spot after Google login.
    return render_template("profile.html", user=user)

# Logout route
@app.route("/logout")
def logout():
    session.clear()
    # Redirect back to the main page after logging out
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(debug=True)


import os
from flask import Flask, redirect, url_for, render_template, session
from flask_dance.contrib.google import make_google_blueprint, google
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Load secrets from .env
app.secret_key = os.getenv("FLASK_SECRET_KEY")

client_id = os.getenv("GOOGLE_CLIENT_ID")
client_secret = os.getenv("GOOGLE_CLIENT_SECRET")

# Google OAuth setup
google_bp = make_google_blueprint(
    client_id=client_id,
    client_secret=client_secret,
    redirect_to="index",
    scope=[
        "openid",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
    ]
)
app.register_blueprint(google_bp, url_prefix="/login")

@app.route("/")
def index():
    if not google.authorized:
        return render_template("index.html")
    resp = google.get("/oauth2/v2/userinfo")
    user_info = resp.json()
    name = user_info.get("name", "User")
    profile_pic = user_info.get("picture", "")
    email = user_info.get("email", "Unknown")
    return f"""
        <h1>Welcome, {name}!</h1>
        <p>Email: {email}</p>
        <br>
        <img src="{profile_pic}" alt="Profile Picture">
        <a href='/logout'>Logout</a>
    """

@app.route("/logout")
def logout():
    # Clear session to log out
    session.clear()
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(debug=True)
