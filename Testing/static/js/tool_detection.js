function initToolDetection() {
    console.log("Tool Detection page initialized. Attempting camera access...");
    
    const video = document.getElementById('localVideo');
    const overlay = document.getElementById('message-overlay');
    const errorMessage = document.getElementById('error-message');

    // Function to handle camera access failure
    function handleCameraError(err) {
        console.error("Camera access failed:", err);
        
        if (overlay) {
            overlay.style.backgroundColor = 'rgba(150, 0, 0, 0.9)'; // Red background for error
            // Check if it's a security or permission error
            let message = "⚠️ **Camera Access Failed (Security Error)**: Browser security policy requires this page to be accessed over **HTTPS** or a local environment (localhost) to enable camera use.";
            
            if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
                message = "❌ **Permission Denied**: Please ensure you allow camera access in your browser settings. This often requires HTTPS or localhost.";
            } else if (err.name === "NotFoundError" || err.name === "NotReadableError") {
                message = "❌ **Camera Not Found**: Check that your camera is connected and not being used by another application.";
            }

            if (errorMessage) errorMessage.innerHTML = message;
        }
    }

    // 1. Attempt to get camera stream
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                // Success: Camera stream started
                video.srcObject = stream;
                video.onloadedmetadata = function(e) {
                    video.play();
                    // Hide the initial connecting overlay and show the video
                    if (overlay) overlay.style.display = 'none';
                    if (video) video.classList.remove('hidden');
                    console.log("Camera stream started successfully.");
                };
            })
            .catch(handleCameraError); // Catch errors and handle them
    } else {
        // Browser does not support getUserMedia
        if (errorMessage) errorMessage.textContent = "Your browser does not support media devices. Using simulated background feed.";
    }

    // 2. Simulate real-time log updates
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

        setInterval(() => {
            const newEntry = document.createElement('p');
            const logText = logActivities[logIndex % logActivities.length];
            logIndex++;

            newEntry.className = 'list-item-red-border';
            newEntry.innerHTML = `${new Date().toLocaleTimeString()} - ${logText}`;
            
            // Add new entry to the top of the log
            detectionLog.prepend(newEntry);

            // Limit log entries
            if (detectionLog.children.length > 10) {
                detectionLog.removeChild(detectionLog.lastElementChild);
            }
        }, 3000); // Update every 3 seconds for smoother simulation
    }
}

window.initToolDetection = initToolDetection;
