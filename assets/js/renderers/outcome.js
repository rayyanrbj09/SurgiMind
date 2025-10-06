import { AppHeader, AppFooter, navigate, showToast } from '../main.js';
import * as Data from '../data.js';

export function renderPage(appContainer) {
    // Use heart surgery content for the outcome page simulation
    const analysis = Data.getReportAnalysis('Heart Surgery'); 
    
    appContainer.innerHTML = `
        ${AppHeader('outcome')}
        <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl font-bold text-text-dark mb-2">Final Outcome: Case C-7023 (CABG)</h1>
            <p class="text-sm text-gray-500 mb-6">Patient: J. Doe | Date: 2025-09-27 | Surgeon: Dr. Smith</p>
            
            <div class="bg-surface-white p-4 rounded-xl shadow-md flex flex-wrap gap-4 justify-between items-center mb-8">
                <button onclick="showToast('Full Case (ZIP) Download Started.', 'success')" class="bg-accent-green text-white rounded-lg px-6 py-3 text-base font-semibold button-3d-hover hover:scale-[1.03] hover:shadow-lg transition">
                    Download Full Case (ZIP)
                </button>
                <div class="flex flex-wrap gap-3">
                    <button onclick="showToast('PDF Export started.', 'info')" class="bg-white border border-gray-300 text-gray-700 rounded-lg px-4 py-2 font-semibold hover:bg-gray-100 transition">
                        Export PDF
                    </button>
                    <button onclick="showToast('Case metadata saved to Profile.', 'success')" class="bg-white border border-gray-300 text-gray-700 rounded-lg px-4 py-2 font-semibold hover:bg-gray-100 transition">
                        Save to Profile
                    </button>
                    <button onclick="showToast('Secure share link copied to clipboard.', 'info')" class="bg-white border border-gray-300 text-gray-700 rounded-lg px-4 py-2 font-semibold hover:bg-gray-100 transition">
                        Share with Team
                    </button>
                    <button onclick="showToast('Notes opened.', 'info')" class="bg-primary-blue text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-900 transition">
                        Add/Edit Notes
                    </button>
                </div>
            </div>

            <div class="bg-gray-900 rounded-xl overflow-hidden mb-8 shadow-xl">
                <div class="w-full aspect-video flex items-center justify-center text-white text-3xl relative">
                    Video Playback Placeholder (4:20 duration)
                    <div class="absolute bottom-0 h-2 w-full bg-gray-700">
                        <div class="absolute h-3 w-1 bg-red-500 rounded-full cursor-pointer transition hover:scale-150" style="left: 15%" title="Warning: Tool Conflict"></div>
                        <div class="absolute h-3 w-1 bg-primary-blue rounded-full cursor-pointer transition hover:scale-150" style="left: 40%" title="Event: Incision Start"></div>
                        <div class="absolute h-3 w-1 bg-accent-green rounded-full cursor-pointer transition hover:scale-150" style="left: 85%" title="Event: Closure Started"></div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                <div class="bg-surface-white p-6 rounded-xl shadow-lg border-t-4 border-primary-blue">
                    <h3 class="text-2xl font-semibold text-text-dark mb-4">Report Analysis Summary</h3>
                    <p class="text-sm text-gray-500 mb-4">Model v2.2 | Confidence: 96%</p>
                    
                    <div class="space-y-4">
                        <details class="border-b pb-2 open:pb-4" open>
                            <summary class="font-bold cursor-pointer text-lg text-text-dark hover:text-primary-blue transition">Report Summary (CABG)</summary>
                            <p class="text-gray-700 leading-relaxed mt-3 text-sm">${analysis.summary}</p>
                            <p class="text-sm mt-2 font-semibold text-accent-green">Suggested Tool Set: Vascular/Bypass Tools (See Checklist)</p>
                        </details>

                        <div class="pt-4">
                            <h4 class="font-bold text-lg text-text-dark mb-4">Procedural Workflow Map (CABG)</h4>
                            <div class="space-y-4">
                                <div class="flow-step">
                                    <p class="font-semibold text-text-dark">Phase 1: Sternotomy & Vessel Harvest</p>
                                    <p class="text-xs text-gray-600">Duration: 00:00 - 01:20</p>
                                </div>
                                <div class="flow-step">
                                    <p class="font-semibold text-text-dark">Phase 2: Cardiopulmonary Bypass (CPB)</p>
                                    <p class="as text-gray-600">Duration: 01:21 - 02:00</p>
                                </div>
                                <div class="flow-step">
                                    <p class="font-semibold text-text-dark text-red-600">Phase 3: Distal Anastomosis (HIGH STRESS)</p>
                                    <p class="text-xs text-red-600">Duration: 02:01 - 03:30. Needle loading errors observed.</p>
                                </div>
                                <div class="flow-step">
                                    <p class="font-semibold text-text-dark">Phase 4: Weaning & Closure</p>
                                    <p class="text-xs text-gray-600">Duration: 03:31 - End</p>
                                </div>
                            </div>
                        </div>
                        <div class="pt-4">
                            <h4 class="font-bold text-lg text-text-dark mb-2">Surgeon Validation</h4>
                            <div class="flex items-center space-x-2 text-sm">
                                <input type="checkbox" id="validation" checked class="h-4 w-4 text-accent-green border-gray-300 rounded focus:ring-accent-green">
                                <label for="validation" class="text-gray-700">I confirm the predicted procedure and key findings are accurate.</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-surface-white p-6 rounded-xl shadow-lg border-t-4 border-accent-green">
                    <h3 class="text-2xl font-semibold text-text-dark mb-4">Video & Event Summary</h3>
                    <p class="text-sm text-gray-500 mb-4">Recorded Duration: 00:04:20</p>
                    
                    <div class="space-y-4">
                        <h4 class="font-bold text-lg text-text-dark">Tool Usage Timeline</h4>
                        <ul class="list-disc list-inside text-gray-700 space-y-2 text-sm">
                            <li>00:00:55 - Initial Incision (Rib Spreader)</li>
                            <li>00:01:30 - Vascular Clamps employed (Held for 2:05)</li>
                            <li>00:02:15 - <span class="font-bold text-red-600">WARNING:</span> Tool swap detected (Drill vs. Scalpel).</li>
                            <li>00:04:00 - Final Closure (Sutures)</li>
                        </ul>

                        <h4 class="font-bold text-lg text-text-dark pt-4">Clinician Notes</h4>
                        <textarea class="w-full border border-gray-300 rounded-lg p-3 text-sm h-24" placeholder="Add specific post-op notes or observations here..." aria-label="Clinician Notes"></textarea>
                    </div>
                    
                    <div class="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
                        <p>All downloads encrypted. Last Access: Dr. Smith (Today, 10:15 AM)</p>
                        <p>Audit Log: 1 re-analysis performed using Model v1.2 (2025-09-29).</p>
                        <button class="text-primary-blue hover:underline">Re-run Analysis</button>
                    </div>
                </div>
            </div>
        </main>
        ${AppFooter()}
    `;
}