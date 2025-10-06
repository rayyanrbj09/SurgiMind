import { AppHeader, AppFooter, navigate, setUploadState, setSimulatedProcedure, uploadState, simulatedProcedure, showToast } from '../main.js';
import * as Data from '../data.js';

// Processing Simulation variables
let processingInterval;
let progress = 0;
let logStep = 0;
const logMessages = [
    "✅ Extracting text (100%)",
    "✅ Running NLP model (100%)",
    "✅ Generating Summary (100%)",
    "✅ Cross-checking tools (100%)"
];

function startProcessing() {
    // Randomly set the simulated procedure on upload start for dynamic output
    setSimulatedProcedure(Math.random() < 0.5 ? 'Heart Surgery' : 'Cholecystectomy');
    setUploadState(2);
    renderPage(document.getElementById('app-container'));
    
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');
    const logLinesElement = document.getElementById('log-lines');
    progress = 0;
    logStep = 0;

    processingInterval = setInterval(() => {
        if (progress < 100) {
            progress += 5;
            progressBar.style.width = progress + '%';
            progressPercent.textContent = `${progress}% Complete - ETA: ${60 - Math.round(progress / 100 * 60)}s`;

            if (progress % 25 === 0 && logStep < logMessages.length) {
                const currentLog = logLinesElement.children[logStep];
                if (currentLog) {
                    currentLog.innerHTML = logMessages[logStep];
                    currentLog.classList.add('text-accent-green', 'font-medium');
                    currentLog.classList.remove('text-gray-600');
                }
                logStep++;
            }
        } else {
            clearInterval(processingInterval);
            setUploadState(3);
            renderPage(document.getElementById('app-container'));
            showToast('Analysis complete. Results ready!', 'success');
        }
    }, 500); // Faster simulation for testing (0.5s intervals)
}

function stopProcessing() {
    clearInterval(processingInterval);
    setUploadState(1);
    renderPage(document.getElementById('app-container'));
    showToast('Analysis cancelled by user.', 'error');
}

function renderToolChecklist(tools) {
    return tools.map(tool => {
        const color = tool.type === 'Required' ? 'text-red-600 bg-red-100' : 'text-blue-600 bg-blue-100';
        return `
            <li class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <span class="text-2xl" role="img" aria-label="Tool Icon">${tool.icon}</span>
                    <span class="font-medium text-text-dark">${tool.name}</span>
                    <span class="text-xs ${color} px-2 py-0.5 rounded-full">${tool.type}</span>
                </div>
                <button class="text-gray-400 hover:text-primary-blue transition" title="Show Tool Info">ⓘ</button>
            </li>
        `;
    }).join('');
}

window.startProcessing = startProcessing; // Expose to window
window.stopProcessing = stopProcessing;   // Expose to window


export function renderPage(appContainer) {
    const analysis = Data.getReportAnalysis(simulatedProcedure);
    
    const processingContent = (state) => {
        if (state === 1) {
            // Initial State (Drag & Drop)
            return `
                <div class="p-10 border-4 border-dashed border-gray-300 rounded-xl text-center bg-gray-50">
                    <div class="text-6xl text-gray-400 mb-4" role="img" aria-label="Upload Icon">📄</div>
                    <p class="text-xl font-semibold text-text-dark mb-2">Upload Patient Report (PDF/DICOM)</p>
                    <p class="text-sm text-gray-500 mb-6">Drag & drop files here, or click to upload. Max file size: 50MB.</p>
                    
                    <input type="file" id="report-upload" class="hidden" accept=".pdf,.dcm,.jpg,.png" 
                        onchange="startProcessing()">
                    <button onclick="document.getElementById('report-upload').click()"
                            class="bg-primary-blue text-white rounded-lg px-6 py-2 text-base font-semibold shadow-md button-3d-hover">
                        Upload from Folder
                    </button>
                </div>
            `;
        } else if (state === 2) {
            // Processing State
            return `
                <div class="p-8 bg-surface-white rounded-xl shadow-2xl">
                    <div class="text-center">
                        <div class="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden flex justify-center items-center">
                            <svg class="processing-pulse h-20 w-20 text-primary-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span class="absolute text-2xl font-bold text-primary-blue">Analyzing...</span>
                        </div>

                        <p class="text-lg font-semibold text-text-dark mt-6 mb-2">
                            Analyzing report — extracting findings and generating summary.
                        </p>
                        <p class="text-sm text-gray-500 mb-6">
                            Processing message: “Analyzing report — extracting findings and generating summary. This may take up to 60s.”
                        </p>

                        <div class="w-full bg-gray-200 rounded-full h-3 my-4">
                            <div id="progress-bar" class="bg-accent-green h-3 rounded-full transition-all duration-1000" style="width: 10%"></div>
                        </div>
                        <p id="progress-percent" class="text-sm font-semibold text-text-dark mb-4">10% Complete - ETA: 50s</p>

                        <ul id="log-lines" class="text-left text-sm text-gray-600 space-y-2 p-4 bg-gray-100 rounded-lg">
                            <li class="text-accent-green font-medium">✅ Initializing Analysis Pipeline...</li>
                            <li>→ Extracting text...</li>
                            <li>→ Running NLP...</li>
                            <li>→ Generating Summary...</li>
                            <li>→ Cross-checking tools...</li>
                        </ul>

                        <button onclick="stopProcessing()" class="mt-6 text-sm text-red-600 hover:text-red-800 transition">
                            Cancel Analysis
                        </button>
                    </div>
                </div>
            `;
        } else {
            // Results State
            return `
                <div class="space-y-6">
                    <div class="bg-white p-4 rounded-xl border-l-4 border-accent-green shadow-md">
                        <h3 class="text-xl font-bold text-text-dark">Case ID: C-7024 - Analysis Complete</h3>
                        <p class="text-sm text-gray-500">Patient Alias: M. King | Uploaded: Oct 2, 2025 | Surgeon: D. Smith</p>
                    </div>

                    <div class="bg-surface-white p-6 rounded-xl shadow-lg">
                        <div class="flex border-b border-gray-200 mb-4">
                            <button class="px-4 py-2 text-primary-blue border-b-2 border-primary-blue font-semibold">Overview</button>
                            <button class="px-4 py-2 text-gray-600 hover:text-primary-blue transition">Findings</button>
                            <button class="px-4 py-2 text-gray-600 hover:text-primary-blue transition">Suggested Procedure</button>
                        </div>
                        
                        <div id="analysis-content" class="space-y-4">
                            <h4 class="text-lg font-semibold text-text-dark">Overview Summary (Procedure: ${simulatedProcedure})</h4>
                            <p class="text-gray-700 leading-relaxed">${analysis.summary}</p>
                            
                            <h4 class="text-lg font-semibold text-text-dark pt-4">Findings (Key Observations)</h4>
                            <ul class="list-disc list-inside text-gray-700 space-y-1">
                                ${analysis.findings.map(f => `<li>${f}</li>`).join('')}
                            </ul>

                            <h4 class="text-lg font-semibold text-text-dark pt-4">Suggested Procedure</h4>
                            <p class="text-accent-green font-bold">${simulatedProcedure}</p>
                        </div>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                        <button onclick="navigate('detection')" class="bg-primary-blue text-white rounded-lg px-6 py-3 text-base font-semibold shadow-md button-3d-hover">
                            Proceed to Tool Detection (Start Camera)
                        </button>
                        <button onclick="showToast('Report saved to Profile!', 'success')" class="bg-white border border-primary-blue text-primary-blue rounded-lg px-6 py-3 text-base font-semibold hover:bg-gray-100 transition">
                            Save Report to Profile
                        </button>
                        <button onclick="showToast('Analysis PDF downloaded.', 'success')" class="text-gray-600 bg-white border border-gray-300 rounded-lg px-6 py-3 text-base font-semibold hover:bg-gray-100 transition">
                            Download Analysis (PDF)
                        </button>
                    </div>
                </div>
            `;
        }
    };
    
    appContainer.innerHTML = `
        ${AppHeader('upload')}
        <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <p class="text-sm text-gray-500 mb-6">Dashboard > <span class="text-primary-blue">Upload Report</span></p>

            <div class="flex flex-col lg:flex-row gap-8">
                <div class="lg:w-3/5">
                    ${processingContent(uploadState)}
                </div>

                <div class="lg:w-2/5 space-y-6">
                    <div class="bg-surface-white p-6 rounded-xl shadow-lg border-t-4 border-accent-green">
                        <h3 class="text-xl font-bold text-text-dark mb-4">Recommended Tool Checklist</h3>
                        <p class="text-sm text-gray-500 mb-4">Based on predicted procedure: ${simulatedProcedure}.</p>
                        
                        <ul class="space-y-3 text-sm">
                            ${renderToolChecklist(analysis.tools)}
                        </ul>

                        <button onclick="showToast('Checklist downloaded.', 'success')" class="mt-6 w-full bg-white border border-gray-300 text-gray-700 rounded-lg px-4 py-2 text-base font-semibold hover:bg-gray-100 transition">
                            Download Checklist
                        </button>
                    </div>
                </div>
            </div>
        </main>
        ${AppFooter()}
    `;
}