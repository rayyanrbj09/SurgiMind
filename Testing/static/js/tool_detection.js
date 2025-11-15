/**********************************************
 * SurgiMind – Minimal Clean Tool Detection
 * One Button: Start Camera / Stop Camera
 **********************************************/

let currentStream = null;
let detectionsVisible = true;

/* -------------------------
   INITIALIZE PAGE
-------------------------- */
function initToolDetection() {
    console.log("Tool Detection Loaded.");

    // Initial state setup
    switchInputMode("none");

    applyDetectionFilter();

    enableDropdownCloseEvents();
}

/* -------------------------
   PROFILE DROPDOWN
-------------------------- */
function toggleProfileDropdown() {
    const menu = document.getElementById("profile-dropdown-menu");
    menu.classList.toggle("hidden");
}

function enableDropdownCloseEvents() {
    const menu = document.getElementById("profile-dropdown-menu");
    const btn = document.getElementById("profile-dropdown-btn");

    document.addEventListener("click", (e) => {
        if (!menu.contains(e.target) && !btn.contains(e.target)) {
            menu.classList.add("hidden");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") menu.classList.add("hidden");
    });
}

/* -------------------------
   SHOW/HIDE DETECTIONS
-------------------------- */
function toggleDetections() {
    detectionsVisible = !detectionsVisible;

    document.getElementById("detection-overlay").style.visibility =
        detectionsVisible ? "visible" : "hidden";

    document.getElementById("toggleText").textContent =
        detectionsVisible ? "Hide Detections" : "Show Detections";

    applyDetectionFilter();
}

function applyDetectionFilter() {
    document.querySelectorAll(".bounding-box").forEach(box => {
        box.style.display = detectionsVisible ? "block" : "none";
    });
}

/* -------------------------
   CAMERA CONTROL (Combined Start/Stop)
-------------------------- */
function startCamera() {
    const video = document.getElementById("localVideo");
    const overlay = document.getElementById("message-overlay");
    const button = document.getElementById("toggleCameraBtn");

    // Change button appearance to 'Stopping...' state (e.g., loading)
    button.textContent = "Starting Camera...";
    button.disabled = true;

    overlay.style.display = "flex";
    overlay.querySelector("#overlay-title").textContent = "Starting Camera...";
    overlay.querySelector("#error-message").textContent = "Allow camera permission to begin detection.";

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            currentStream = stream;
            video.srcObject = stream;

            video.onloadedmetadata = () => {
                video.play();

                video.classList.remove("hidden");
                overlay.style.display = "none";

                // Update button for 'Stop' state
                button.textContent = "Stop Camera";
                button.classList.add("active"); // Apply active/stop styling
                button.disabled = false;
            };
        })
        .catch(err => {
            // Revert button to 'Start' state on error
            button.textContent = "Start Camera";
            button.classList.remove("active");
            button.disabled = false;

            overlay.querySelector("#overlay-title").textContent = "Camera Connection Failed";
            overlay.querySelector("#error-message").textContent = "Camera error: " + err.message + ". Check your permissions and try again.";
        });
}

function stopCamera() {
    const video = document.getElementById("localVideo");
    const overlay = document.getElementById("message-overlay");
    const button = document.getElementById("toggleCameraBtn");

    if (currentStream) {
        currentStream.getTracks().forEach(t => t.stop());
        currentStream = null;
    }

    video.classList.add("hidden");

    overlay.style.display = "flex";
    overlay.querySelector("#overlay-title").textContent = "Camera Stopped";
    overlay.querySelector("#error-message").textContent = "Click **Start Camera** again to resume real-time detection.";

    // Update button for 'Start' state
    button.textContent = "Start Camera";
    button.classList.remove("active"); // Remove active/stop styling
}

/* Button click handler for the combined button */
function toggleCamera() {
    if (currentStream) stopCamera();
    else startCamera();
}

/* -------------------------
   SWITCH INPUT MODE
-------------------------- */
function switchInputMode(mode) {
    const localVideo = document.getElementById("localVideo");
    const uploadedVideo = document.getElementById("uploadedVideo");
    const overlay = document.getElementById("message-overlay");
    const title = document.getElementById("overlay-title");
    const msg = document.getElementById("error-message");
    const uploadControls = document.getElementById("upload-controls");
    const toggleCameraBtn = document.getElementById("toggleCameraBtn");
    const uploadVideoBtn = document.getElementById("uploadVideoBtn");


    // 1. Stop current camera stream if active
    if (currentStream) stopCamera();
    localVideo.classList.add("hidden");
    uploadedVideo.classList.add("hidden");

    // 2. Reset switch button styles
    toggleCameraBtn.classList.remove("input-switch-inactive");
    uploadVideoBtn.classList.remove("input-switch-inactive");
    toggleCameraBtn.classList.remove("active"); // Ensure 'Stop' styling is off for a fresh start

    // 3. Handle mode-specific state
    overlay.style.display = "flex";
    uploadControls.classList.add("hidden");


    if (mode === "upload") {
        title.textContent = "Upload Video for Detection";
        msg.textContent = "Select a video file to analyze.";
        uploadControls.classList.remove("hidden");
        
        // Update button styles
        toggleCameraBtn.classList.add("input-switch-inactive");
        uploadVideoBtn.classList.add("active");

        // Set Upload button style
        uploadVideoBtn.classList.remove("input-switch-inactive");
        uploadVideoBtn.classList.add("btn-primary-red");
        toggleCameraBtn.classList.remove("btn-camera-toggle");
        toggleCameraBtn.classList.add("bg-gray-700", "text-white", "border-gray-600");
    } else { // mode === "none" or "live"
        title.textContent = "Choose an Input Mode";
        msg.textContent = "Click **Start Camera** or **Upload Video** to begin.";

        // Set Live Feed (Start Camera) button style
        toggleCameraBtn.classList.add("btn-camera-toggle");
        toggleCameraBtn.classList.remove("bg-gray-700", "text-white", "border-gray-600");
        uploadVideoBtn.classList.add("input-switch-inactive");
        uploadVideoBtn.classList.remove("btn-primary-red");
    }
}

/* -------------------------
   VIDEO UPLOAD (Placeholder)
-------------------------- */
function handleVideoUpload(event) {
    const file = event.target.files[0];
    const uploadedVideo = document.getElementById("uploadedVideo");
    const overlay = document.getElementById("message-overlay");

    if (file) {
        const fileURL = URL.createObjectURL(file);
        uploadedVideo.src = fileURL;

        // Hide overlay and show video
        overlay.style.display = "none";
        uploadedVideo.classList.remove("hidden");

        // In a real app, you would start processing the video here
        console.log("Video uploaded and ready to play/process:", file.name);
    }
}


/* ------------------------- */
window.initToolDetection = initToolDetection;
window.toggleCamera = toggleCamera;
window.toggleDetections = toggleDetections;
window.toggleProfileDropdown = toggleProfileDropdown;
window.switchInputMode = switchInputMode; // Export switchInputMode for HTML button
window.handleVideoUpload = handleVideoUpload; // Export handleVideoUpload for HTML input