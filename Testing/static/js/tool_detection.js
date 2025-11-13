let currentStream = null;
let detectionsVisible = true;

// ---------------------- INIT ----------------------
function initToolDetection() {
    console.log("Tool Detection loaded. Waiting for user selection...");
    switchInputMode('none'); // don't request camera on load
    applyDetectionFilter();

    // Simulated log updates
    const detectionLog = document.getElementById("detection-log");
    if (detectionLog) {
        const sampleLogs = [
            "Scissors DETECTED (98%)",
            "Forceps DETECTED (92%)",
            "Scalpel DETECTED (96%)",
            "Retractor DETECTED (91%)"
        ];
        let index = 0;
        setInterval(() => {
            const p = document.createElement("p");
            p.className = "list-item-red-border";
            p.innerHTML = `${new Date().toLocaleTimeString()} - ${sampleLogs[index % sampleLogs.length]}`;
            detectionLog.prepend(p);
            if (detectionLog.children.length > 12) detectionLog.removeChild(detectionLog.lastElementChild);
            index++;
        }, 3000);
    }

    // Close profile dropdown on outside click
    document.addEventListener('click', (e) => {
        const menu = document.getElementById('profile-dropdown-menu');
        const btn = document.getElementById('profile-dropdown-btn');
        if (!menu || !btn) return;
        if (!menu.classList.contains('hidden') && !menu.contains(e.target) && !btn.contains(e.target)) {
            menu.classList.add('hidden');
        }
    });

    // Close dropdown on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const menu = document.getElementById('profile-dropdown-menu');
            if (menu && !menu.classList.contains('hidden')) menu.classList.add('hidden');
        }
    });
}

// ---------------------- PROFILE DROPDOWN ----------------------
function toggleProfileDropdown() {
    const menu = document.getElementById('profile-dropdown-menu');
    if (!menu) return;
    menu.classList.toggle('hidden');
}

// ---------------------- DETECTION TOGGLING ----------------------
function toggleDetections() {
    detectionsVisible = !detectionsVisible;
    const overlay = document.getElementById("detection-overlay");
    const text = document.getElementById("toggleText");
    overlay.style.visibility = detectionsVisible ? "visible" : "hidden";
    text.textContent = detectionsVisible ? "Hide Detections" : "Show Detections";
    applyDetectionFilter();
}

function applyDetectionFilter() {
    const boxes = document.querySelectorAll(".bounding-box");
    boxes.forEach(box => box.style.display = detectionsVisible ? "block" : "none");
}

// ---------------------- CAMERA CONTROL ----------------------
function stopCamera() {
    if (currentStream) {
        currentStream.getTracks().forEach(t => t.stop());
        currentStream = null;
        console.log("Camera stopped.");
    }
}

function startCamera() {
    const video = document.getElementById("localVideo");
    const overlay = document.getElementById("message-overlay");
    const errorMessage = document.getElementById("error-message");
    overlay.style.display = "flex";
    video.classList.add("hidden");
    errorMessage.textContent = "Attempting to access local camera feed. Please allow permission.";

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        errorMessage.textContent = "Your browser doesn't support camera access.";
        return;
    }

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            currentStream = stream;
            video.srcObject = stream;
            video.onloadedmetadata = () => {
                video.play();
                overlay.style.display = "none";
                video.classList.remove("hidden");
                console.log("Camera started successfully.");
            };
        })
        .catch(err => {
            console.error("Camera access failed:", err);
            if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
                errorMessage.innerHTML = "Permission denied: allow camera access in browser settings.";
            } else if (err.name === "NotFoundError") {
                errorMessage.innerHTML = "Camera not found. Check your device.";
            } else {
                errorMessage.innerHTML = "Camera access failed. " + (err.message || "");
            }
        });
}

function handleVideoUpload(event) {
    const file = event.target.files[0];
    const uploadedVideo = document.getElementById("uploadedVideo");
    const localVideo = document.getElementById("localVideo");
    const overlay = document.getElementById("message-overlay");

    if (!file) return;
    // stop camera if running
    stopCamera();
    localVideo.classList.add("hidden");

    overlay.style.display = "none";
    uploadedVideo.classList.remove("hidden");
    uploadedVideo.src = URL.createObjectURL(file);
    uploadedVideo.load();
    uploadedVideo.play();
    console.log(`Playing uploaded file: ${file.name}`);
}

// Manual stop by user button
function stopCameraManual() {
    stopCamera();
    const video = document.getElementById("localVideo");
    const overlay = document.getElementById("message-overlay");
    const stopBtn = document.getElementById("stopCameraBtn");
    const liveBtn = document.getElementById("liveFeedBtn");

    video.classList.add("hidden");
    overlay.style.display = "flex";
    stopBtn.classList.add("hidden");

    // reset live button active state if present
    liveBtn.classList.remove("input-switch-active");
    liveBtn.classList.add("input-switch-inactive");

    document.getElementById("overlay-title").textContent = "Camera Stopped";
    document.getElementById("error-message").textContent = "Click 'Connect to Live Feed' to start again.";
    console.log("Camera manually stopped by user.");
}

// ---------------------- INPUT MODE SWITCH ----------------------
function switchInputMode(mode) {
    const liveBtn = document.getElementById("liveFeedBtn");
    const uploadBtn = document.getElementById("uploadVideoBtn");
    const stopBtn = document.getElementById("stopCameraBtn");

    const localVideo = document.getElementById("localVideo");
    const uploadedVideo = document.getElementById("uploadedVideo");
    const overlay = document.getElementById("message-overlay");
    const overlayTitle = document.getElementById("overlay-title");
    const errorMessage = document.getElementById("error-message");
    const uploadControls = document.getElementById("upload-controls");

    // stop any running camera or playing upload
    stopCamera();
    if (uploadedVideo) {
        uploadedVideo.pause();
        try { URL.revokeObjectURL(uploadedVideo.src); } catch (e) {}
        uploadedVideo.removeAttribute('src');
    }

    localVideo.classList.add("hidden");
    uploadedVideo.classList.add("hidden");

    if (mode === "none") {
        overlay.style.display = "flex";
        overlayTitle.textContent = "Choose an Input Mode";
        errorMessage.textContent = "Click a button above to begin.";
        uploadControls.classList.add("hidden");
        stopBtn.classList.add("hidden");
        return;
    }

    if (mode === "live") {
        liveBtn.classList.add("input-switch-active");
        uploadBtn.classList.remove("input-switch-active");

        overlay.style.display = "flex";
        overlayTitle.textContent = "Connecting to Camera...";
        errorMessage.textContent = "Please allow camera permissions.";

        stopBtn.classList.remove("hidden");
        startCamera();
        return;
    }

    if (mode === "upload") {
        uploadBtn.classList.add("input-switch-active");
        liveBtn.classList.remove("input-switch-active");

        overlay.style.display = "flex";
        overlayTitle.textContent = "Select a Video File";
        errorMessage.textContent = "Upload a surgical video for detection.";
        uploadControls.classList.remove("hidden");

        stopBtn.classList.add("hidden");
        return;
    }
}

// expose to window
window.initToolDetection = initToolDetection;
window.switchInputMode = switchInputMode;
window.handleVideoUpload = handleVideoUpload;
window.toggleDetections = toggleDetections;
window.stopCameraManual = stopCameraManual;
window.toggleProfileDropdown = toggleProfileDropdown;
