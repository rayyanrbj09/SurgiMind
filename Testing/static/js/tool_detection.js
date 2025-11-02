let currentStream = null;
let detectionsVisible = true;
// confidenceThreshold variable removed
// Anomaly variables and logic removed entirely.


function initToolDetection() {
    console.log("Tool Detection page initialized. Defaulting to live feed mode.");
    
    // Start in 'live' mode by default when the page loads
    switchInputMode('live');
    
    // Apply initial filtering on load
    applyDetectionFilter(100); 

    // 2. Simulate real-time log updates (Existing logic)
    const detectionLog = document.getElementById('detection-log');
    
    if (detectionLog) {
        // Use a simple array of activities to cycle through
        const logActivities = [
            "Scissors **DETECTED** (Conf: 98.1%)",
            "Forceps **DETECTED** (Conf: 92.4%)",
            "Tool change: Scalpel used.",
            "Rib Spreader **DETECTED** (Conf: 99.9%)",
            "Needle Holder **DETECTED** (Conf: 95.5%)",
            "Suction Tip **DETECTED** (Conf: 97.0%)"
        ];
        let logIndex = 0;

        // Log Update Interval (Runs every 3 seconds)
        setInterval(() => {
            const newEntry = document.createElement('p');
            const logText = logActivities[logIndex % logActivities.length];
            logIndex++;

            newEntry.className = 'list-item-red-border';
            newEntry.innerHTML = `${new Date().toLocaleTimeString()} - ${logText}`;
            
            detectionLog.prepend(newEntry);

            // Limit log entries
            if (detectionLog.children.length > 10) {
                detectionLog.removeChild(detectionLog.lastElementChild);
            }
        }, 3000); 
    }
}

// ===============================================
// EXISTING FEATURES: Toggle/Input Switch
// ===============================================

function toggleDetections() {
    detectionsVisible = !detectionsVisible;
    const overlay = document.getElementById('detection-overlay');
    const toggleBtn = document.getElementById('toggleDetectionBtn');
    const toggleText = document.getElementById('toggleText');

    if (detectionsVisible) {
        overlay.style.visibility = 'visible';
        overlay.style.opacity = '1';
        toggleText.textContent = 'Hide Detections';
        toggleBtn.classList.remove('bg-gray-700', 'border-gray-600');
        toggleBtn.classList.add('btn-primary-red');
        
        // Reapply filter with high confidence to ensure visibility
        applyDetectionFilter(100); 
    } else {
        overlay.style.visibility = 'hidden';
        overlay.style.opacity = '0';
        toggleText.textContent = 'Show Detections';
        toggleBtn.classList.add('bg-gray-700', 'border-gray-600');
        toggleBtn.classList.remove('btn-primary-red');
    }
    console.log(`Detections visibility set to: ${detectionsVisible}`);
}

// Simplified: Now only checks master visibility toggle
function applyDetectionFilter(threshold) {
    const boundingBoxes = document.querySelectorAll('.bounding-box');

    boundingBoxes.forEach(box => {
        // Show/Hide based only on the master toggle
        if (!detectionsVisible) {
            box.style.display = 'none';
        } else {
            box.style.display = 'block';
        }
    });
}

function stopCamera() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
        currentStream = null;
        console.log("Camera stream stopped.");
    }
}

function startCamera() {
    const video = document.getElementById('localVideo');
    const overlay = document.getElementById('message-overlay');
    const errorMessage = document.getElementById('error-message');
    const overlayTitle = document.getElementById('overlay-title');
    const uploadControls = document.getElementById('upload-controls');

    // Reset UI for camera connection attempt
    video.classList.add('hidden');
    document.getElementById('uploadedVideo').classList.add('hidden');
    overlay.style.display = 'flex';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    overlayTitle.textContent = "Connecting to Camera...";
    errorMessage.textContent = "Attempting to access local camera feed. This requires HTTPS or a local environment (localhost).";
    uploadControls.classList.add('hidden');

    function handleCameraError(err) {
        console.error("Camera access failed:", err);
        overlay.style.backgroundColor = 'rgba(150, 0, 0, 0.9)';
        let message = "⚠️ **Camera Access Failed (Security Error)**: Requires **HTTPS** or localhost.";
        
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
            message = "❌ **Permission Denied**: Allow camera access in your browser settings.";
        } else if (err.name === "NotFoundError" || err.name === "NotReadableError") {
            message = "❌ **Camera Not Found**: Check that your camera is connected.";
        }

        errorMessage.innerHTML = message;
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                currentStream = stream;
                video.srcObject = stream;
                video.onloadedmetadata = function(e) {
                    video.play();
                    overlay.style.display = 'none';
                    video.classList.remove('hidden');
                    console.log("Camera stream started successfully.");
                };
            })
            .catch(handleCameraError);
    } else {
        errorMessage.textContent = "Your browser does not support media devices.";
    }
}

function handleVideoUpload(event) {
    const file = event.target.files[0];
    const uploadedVideo = document.getElementById('uploadedVideo');
    const localVideo = document.getElementById('localVideo');
    const overlay = document.getElementById('message-overlay');

    if (file) {
        overlay.style.display = 'none';
        localVideo.classList.add('hidden');
        uploadedVideo.classList.remove('hidden');

        const fileURL = URL.createObjectURL(file);
        uploadedVideo.src = fileURL;
        uploadedVideo.load();
        uploadedVideo.play();
        console.log(`Video uploaded: ${file.name}. Analysis started.`);

        uploadedVideo.onended = () => {
            URL.revokeObjectURL(fileURL);
        };
    }
}

function switchInputMode(mode) {
    const liveBtn = document.getElementById('liveFeedBtn');
    const uploadBtn = document.getElementById('uploadVideoBtn');
    const overlay = document.getElementById('message-overlay');
    const overlayTitle = document.getElementById('overlay-title');
    const errorMessage = document.getElementById('error-message');
    const uploadControls = document.getElementById('upload-controls');
    const localVideo = document.getElementById('localVideo');
    const uploadedVideo = document.getElementById('uploadedVideo');

    // 1. Reset/Stop current input
    stopCamera();
    localVideo.classList.add('hidden');
    uploadedVideo.classList.add('hidden');
    if (uploadedVideo.src) {
        uploadedVideo.pause();
        URL.revokeObjectURL(uploadedVideo.src);
        uploadedVideo.removeAttribute('src');
    }

    if (mode === 'live') {
        liveBtn.classList.add('input-switch-active');
        liveBtn.classList.remove('input-switch-inactive');
        uploadBtn.classList.remove('input-switch-active');
        uploadBtn.classList.add('input-switch-inactive');

        startCamera();
        uploadControls.classList.add('hidden');

    } else if (mode === 'upload') {
        uploadBtn.classList.add('input-switch-active');
        uploadBtn.classList.remove('input-switch-inactive');
        liveBtn.classList.remove('input-switch-active');
        liveBtn.classList.add('input-switch-inactive');

        overlay.style.display = 'flex';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        overlayTitle.textContent = "Select Video for Tool Detection";
        errorMessage.textContent = "Upload a pre-recorded surgical video file (.mp4, .mov, etc.) for AI analysis and workflow extraction.";
        uploadControls.classList.remove('hidden');
    }
}

window.initToolDetection = initToolDetection;
window.switchInputMode = switchInputMode;
window.handleVideoUpload = handleVideoUpload;
window.toggleDetections = toggleDetections;