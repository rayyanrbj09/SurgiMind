// =================================================================
// ⚠️ ASSUMED IMPORTS/PLACEHOLDERS (MUST BE DEFINED FOR REAL APP)
// These variables and functions would typically come from a state manager (like your '../main.js')
let isRecording = false;
let seconds = 0;
let detectionInterval = null;
let simulatedProcedure = "Cholecystectomy";

const setRecordingState = (state) => {
  isRecording = state;
};
const setSeconds = (s) => {
  seconds = s;
};
const setDetectionInterval = (interval) => {
  detectionInterval = interval;
};
const setSimulatedProcedure = (procedure) => {
  simulatedProcedure = procedure;
};

// --- PLACEHOLDER UTILITY FUNCTIONS ---
const showToast = (msg, type) => {
  console.log(`[TOAST - ${type.toUpperCase()}]: ${msg}`);
  // In a real setup, render the toast HTML here.
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `p-4 rounded-lg shadow-xl text-white font-medium border-l-4 ${
    type === "success" ? "bg-green-600" : "bg-blue-600"
  }`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};

const closeModal = () => {
  document.getElementById("app-modal").classList.add("hidden");
};

const navigate = (page) => {
  console.log(`[NAVIGATE]: Redirecting to ${page}`);
  // In a real setup, this would load the content for the new page.
  if (page === "outcome") {
    alert("Simulating navigation to Outcome Page.");
    // For demonstration, simply reload the detection page to show it still works
    // window.location.reload();
  }
};

const AppHeader = (activePage) => `
    <header class="sticky top-0 bg-surface-white border-b border-gray-200 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
            <div class="text-2xl font-bold text-text-dark tracking-wide">Surgi<span class="text-primary-blue">Mind</span></div>
            <nav class="space-x-4"><span class="text-primary-blue">Live Detection</span></nav>
        </div>
    </header>
`;

const AppFooter = () => `
    <footer class="bg-gray-800 text-gray-400 mt-0 py-4 text-center text-xs">
        &copy; 2024 SurgiMind. Research Project.
    </footer>
`;
// =================================================================

// --- CAMERA ACCESS FUNCTIONS ---
function startLiveCamera() {
  const video = document.getElementById("liveCameraFeed");
  const placeholder = document.getElementById("camera-placeholder");

  if (!video || !placeholder) return;

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Hide placeholder
    placeholder.classList.add("hidden");
    video.classList.remove("hidden");

    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: "environment" },
      })
      .then((stream) => {
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play();
          showToast("Live camera started successfully.", "success");
        };
      })
      .catch((error) => {
        console.error("Camera access denied or failed: ", error);
        // Show permission denied message in placeholder area
        placeholder.classList.remove("hidden");
        video.classList.add("hidden");
        placeholder.innerHTML =
          '<div class="text-center text-white"><div class="text-4xl mb-4">🚫</div>Camera access denied. Please allow permissions to start detection.</div>';
        showToast(
          "Camera access denied or failed. Using placeholder.",
          "error"
        );
      });
  } else {
    placeholder.innerHTML =
      '<div class="text-center text-white"><div class="text-4xl mb-4">❌</div>getUserMedia not supported in this browser.</div>';
    showToast("getUserMedia not supported in this browser.", "error");
  }
}

export function stopLiveCamera() {
  const video = document.getElementById("liveCameraFeed");
  if (video && video.srcObject) {
    video.srcObject.getTracks().forEach((track) => track.stop());
    video.srcObject = null;
    // Reset recording state
    setRecordingState(false);
    clearInterval(detectionInterval);
    setSeconds(0);
    console.log("Live camera stopped and state reset.");
  }
}

// --- Recording Logic ---
function toggleRecording() {
  // CRITICAL: Determine the new state and set it first.
  const newIsRecording = !isRecording;
  setRecordingState(newIsRecording);

  const recordBtn = document.getElementById("record-btn");
  const pauseBtn = document.getElementById("pause-btn");
  const stopBtn = document.getElementById("stop-btn");
  const discardBtn = document.getElementById("discard-btn");
  const durationEl = document.getElementById("recording-duration");

  if (newIsRecording) {
    // START or RESUME
    recordBtn.innerHTML = "Recording...";
    recordBtn.classList.replace("bg-red-600", "bg-gray-500");
    recordBtn.disabled = true;

    pauseBtn.disabled = false;
    pauseBtn.innerHTML = "⏸️ Pause";
    pauseBtn.classList.replace("bg-gray-400", "bg-yellow-500");

    stopBtn.disabled = false;
    discardBtn.classList.add("hidden"); // Hide discard button when recording is active

    if (seconds === 0) {
      durationEl.innerHTML = "REC: 00:00";
    }

    const interval = setInterval(() => {
      const newSeconds = seconds + 1; // Read current seconds, increment locally
      setSeconds(newSeconds); // Update central state

      const minutes = String(Math.floor(newSeconds / 60)).padStart(2, "0");
      const secs = String(newSeconds % 60).padStart(2, "0");
      durationEl.innerHTML = `<span class="font-bold text-red-600">REC: ${minutes}:${secs}</span>`;

      if (newSeconds % 15 === 0) {
        const eventLog = document.getElementById("event-log");
        const newEntry = document.createElement("p");
        newEntry.innerHTML = `[${minutes}:${secs}] Detection: Instrument Change detected.`;
        eventLog.prepend(newEntry);
      }
    }, 1000);
    setDetectionInterval(interval);
  } else {
    // PAUSE
    clearInterval(detectionInterval);
    recordBtn.innerHTML = "Resume Recording 🔴";
    recordBtn.classList.replace("bg-gray-500", "bg-red-600");
    recordBtn.disabled = false;

    pauseBtn.innerHTML = "PAUSED";
    discardBtn.classList.remove("hidden"); // Show discard button when paused
  }
}

function showStopModal() {
  clearInterval(detectionInterval);

  const modal = document.getElementById("app-modal");
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  modal.innerHTML = `
        <div class="bg-surface-white p-8 rounded-xl shadow-2xl max-w-lg w-full">
            <h3 class="text-xl font-bold text-text-dark mb-4">Process Recorded Clip?</h3>
            <p class="text-gray-700 mb-6">Recording duration: ${minutes}:${secs}. Confirm to analyze and summarize the video clip.</p>
            <div class="flex justify-end space-x-3">
                <button onclick="closeModal(); toggleRecording();" class="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition">Cancel</button>
                <button onclick="simulateVideoProcessing()" class="bg-primary-blue text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-900 transition">Process & Save</button>
            </div>
        </div>
    `;
  modal.classList.remove("hidden");
}

function simulateVideoProcessing() {
  closeModal();
  // Stop camera and navigation streams
  stopLiveCamera();

  showToast(
    "Processing recorded clip... Redirecting to Final Outcome.",
    "info"
  );

  // Re-render outcome with the latest simulated procedure
  setSimulatedProcedure("Aortic Valve Replacement");

  setTimeout(() => {
    navigate("outcome");
  }, 2000);
}

// Helper to toggle bounding box visibility
function toggleHud() {
  const bboxContainer = document.getElementById("bbox-container");
  if (bboxContainer) {
    bboxContainer.classList.toggle("hidden");
    showToast(
      bboxContainer.classList.contains("hidden") ? "HUD Hidden" : "HUD Visible",
      "info"
    );
  }
}

// --- EXPOSE FUNCTIONS TO WINDOW FOR INLINE HTML ATTRIBUTES (CRITICAL) ---
// Since the HTML is rendered dynamically, functions called via onclick must be on the window object.
window.toggleRecording = toggleRecording;
window.showStopModal = showStopModal;
window.simulateVideoProcessing = simulateVideoProcessing;
window.toggleHud = toggleHud;
window.startLiveCamera = startLiveCamera;
window.stopLiveCamera = stopLiveCamera;
window.showToast = showToast;
window.closeModal = closeModal;
window.navigate = navigate;

// --- PAGE RENDER FUNCTION ---
export function renderPage(appContainer) {
  // Live simulation setup
  const toolDetections = [
    {
      id: 1,
      name: "Scalpel",
      x: 10,
      y: 50,
      w: 20,
      h: 15,
      conf: 0.98,
      color: "border-red-500",
    },
    {
      id: 2,
      name: "Retractor",
      x: 65,
      y: 70,
      w: 25,
      h: 20,
      conf: 0.92,
      color: "border-primary-blue",
    },
    {
      id: 3,
      name: "Sponge",
      x: 25,
      y: 80,
      w: 10,
      h: 5,
      conf: 0.85,
      color: "border-yellow-500",
    },
  ];

  // Generate tool bounding box divs
  const bboxHtml = toolDetections
    .map(
      (tool) => `
        <div class="bbox ${tool.color} bg-opacity-10" 
             style="left: ${tool.x}%; top: ${tool.y}%; width: ${
        tool.w
      }%; height: ${tool.h}%;"
             title="Confidence: ${tool.conf * 100}%"
             onclick="showToast('Tool Info: ${tool.name} (${Math.round(
        tool.conf * 100
      )}%) clicked.', 'info')">
            <span class="absolute -top-6 left-0 bg-primary-blue text-white text-xs font-medium px-2 py-0.5 rounded-tr-lg rounded-tl-lg">${
              tool.name
            } ${Math.round(tool.conf * 100)}%</span>
        </div>
    `
    )
    .join("");

  appContainer.innerHTML = `
        ${AppHeader("detection")}
        <main class="h-[calc(100vh-64px)] overflow-hidden">
            <div class="flex h-full detection-layout">
                <div class="camera-feed-area lg:w-2/3 h-full bg-gray-900 relative">
                    <h2 class="sr-only">Live Surgical Tool Detection Feed</h2>
                    
                    <video id="liveCameraFeed" autoplay muted playsinline class="h-full w-full object-cover hidden"></video>

                    <div id="camera-placeholder" class="h-full w-full flex items-center justify-center bg-gray-800 text-white text-xl">
                        <div class="text-center">
                            <svg class="animate-spin h-10 w-10 text-white mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Awaiting Camera Permissions...
                        </div>
                    </div>

                    <div id="bbox-container" class="absolute inset-0 pointer-events-none">
                        ${bboxHtml}
                    </div>
                    
                    <div class="absolute top-4 left-4 flex items-center space-x-3">
                        <span class="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">LIVE</span>
                        <span class="text-white text-xs bg-gray-900/50 p-1 rounded-md">FPS: 30 | Latency: 42ms</span>
                    </div>
                    
                    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                        <button class="p-3 bg-gray-700/80 hover:bg-gray-600 rounded-full text-white shadow-lg transition" title="Switch Camera">🔄</button>
                        <button class="p-3 bg-gray-700/80 hover:bg-gray-600 rounded-full text-white shadow-lg transition" title="Toggle HUD Overlays" onclick="toggleHud()">👁️</button>
                        <button class="p-3 bg-gray-700/80 hover:bg-gray-600 rounded-full text-white shadow-lg transition" title="Detection Mode">⚙️</button>
                    </div>
                    
                    <div id="light-warning" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-yellow-500 text-text-dark rounded-lg shadow-xl font-semibold opacity-0 transition duration-300">
                        ⚠️ Lighting insufficient — increase OR lighting (Gain Suggestion: +3.0dB)
                    </div>
                </div>

                <div class="analysis-panel lg:w-1/3 h-full bg-surface-white flex flex-col p-6 space-y-6">
                    
                    <div class="flex space-x-4">
                        <button id="record-btn" onclick="toggleRecording()" class="flex-1 bg-red-600 text-white py-3 rounded-lg text-lg font-semibold shadow-xl hover:bg-red-700 transition duration-300 button-3d-hover">
                            Start Recording 🔴
                        </button>
                        <button id="pause-btn" disabled onclick="toggleRecording()" class="bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold">⏸️ Pause</button>
                        <button id="stop-btn" disabled onclick="showStopModal()" class="bg-primary-blue text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-900 transition button-3d-hover">⏹️ Stop</button>
                    </div>
                    <p id="recording-duration" class="text-center text-sm text-gray-600">
                        Position camera to include patient field and instruments. Press ‘Start Recording’ when ready.
                    </p>
                    <div class="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <h3 class="text-lg font-semibold text-text-dark mb-2">Live Analysis Summary</h3>
                        <p id="live-summary" class="text-gray-700 text-sm">
                            Detected: **Scalpel** (12s), **Retractor** (5s); Suggesting Step: **Incision**; Confidence: <span class="text-accent-green font-bold">95%</span>.
                        </p>
                    </div>
                    
                    <div class="flex-1 overflow-y-auto border border-gray-200 rounded-xl p-4 bg-gray-50">
                        <h3 class="text-lg font-semibold text-text-dark mb-2 sticky top-0 bg-gray-50 pb-2">Event Log</h3>
                        <div id="event-log" class="text-xs text-gray-700 space-y-1">
                            <p>[00:00:01] System: Live stream initialized.</p>
                            <p>[00:00:03] Detection: Scalpel (98%) detected.</p>
                            <p>[00:00:15] Detection: Retractor (92%) detected.</p>
                            <p>[00:00:30] Warning: Low light detected. Adjusting exposure.</p>
                        </div>
                    </div>
                    
                    <button onclick="stopLiveCamera(); navigate('dashboard'); showToast('Recording discarded.', 'error')" id="discard-btn" class="text-sm text-red-600 hover:text-red-800 transition">
                        Cancel & Discard
                    </button>
                </div>
            </div>
        </main>
        ${AppFooter()}
    `;
  // Start camera feed when the HTML elements are ready
  setTimeout(startLiveCamera, 100);
}
