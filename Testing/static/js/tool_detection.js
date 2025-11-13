let currentStream = null;
let detectionsVisible = true;

function initToolDetection() {
    console.log("Tool Detection loaded. Waiting for user selection...");

    switchInputMode('none');
    applyDetectionFilter();

    // Simulated log updates
    const detectionLog = document.getElementById("detection-log");
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

        if (detectionLog.children.length > 12) {
            detectionLog.removeChild(detectionLog.lastElementChild);
        }

        index++;
    }, 3000);
}

function toggleDetections() {
    detectionsVisible = !detectionsVisible;
    const overlay = document.getElementById("detection-overlay");
    const text = document.getElementById("toggleText");

    overlay.style.visibility = detectionsVisible ? "visible" : "hidden";
    text.textContent = detectionsVisible ? "Hide Detections" : "Show Detections";
}

function applyDetectionFilter() {
    const boxes = document.querySelectorAll(".bounding-box");
    boxes.forEach(box => {
        box.style.display = detectionsVisible ? "block" : "none";
    });
}

function stopCamera() {
    if (currentStream) {
        currentStream.getTracks().forEach(t => t.stop());
        currentStream = null;
    }
}

function startCamera() {
    const video = document.getElementById("localVideo");
    const overlay = document.getElementById("message-overlay");

    overlay.style.display = "flex";
    video.classList.add("hidden");

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            currentStream = stream;
            video.srcObject = stream;

            video.onloadedmetadata = () => {
                video.play();
                overlay.style.display = "none";
                video.classList.remove("hidden");
            };
        })
        .catch(() => {
            document.getElementById("error-message").innerHTML =
                "Camera access denied — allow permission and try again.";
        });
}

function handleVideoUpload(event) {
    const file = event.target.files[0];
    const video = document.getElementById("uploadedVideo");
    const overlay = document.getElementById("message-overlay");

    if (file) {
        overlay.style.display = "none";
        video.classList.remove("hidden");
        video.src = URL.createObjectURL(file);
        video.play();
    }
}

function stopCameraManual() {
    stopCamera();

    const video = document.getElementById("localVideo");
    const overlay = document.getElementById("message-overlay");

    video.classList.add("hidden");
    overlay.style.display = "flex";

    document.getElementById("stopCameraBtn").classList.add("hidden");

    document.getElementById("overlay-title").textContent = "Camera Stopped";
    document.getElementById("error-message").textContent =
        "Press 'Connect to Live Feed' to start again.";
}

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

    stopCamera();

    localVideo.classList.add("hidden");
    uploadedVideo.classList.add("hidden");

    // MODE: NONE (default at load)
    if (mode === "none") {
        overlay.style.display = "flex";
        overlayTitle.textContent = "Choose an Input Mode";
        errorMessage.textContent = "Click a button above to begin.";
        uploadControls.classList.add("hidden");
        stopBtn.classList.add("hidden");
        return;
    }

    // MODE: LIVE FEED
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

    // MODE: UPLOAD
    if (mode === "upload") {
        uploadBtn.classList.add("input-switch-active");
        liveBtn.classList.remove("input-switch-active");

        overlay.style.display = "flex";
        overlayTitle.textContent = "Select a Video File";
        errorMessage.textContent = "Upload a surgical video for detection.";
        uploadControls.classList.remove("hidden");

        stopBtn.classList.add("hidden");
    }
}

window.initToolDetection = initToolDetection;
window.switchInputMode = switchInputMode;
window.handleVideoUpload = handleVideoUpload;
window.toggleDetections = toggleDetections;
window.stopCameraManual = stopCameraManual;
