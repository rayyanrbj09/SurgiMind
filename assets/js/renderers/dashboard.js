import { AppHeader, AppFooter, navigate } from '../main.js';

export function renderPage(appContainer) {
    appContainer.innerHTML = `
        ${AppHeader('dashboard')}
        <main class="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div class="mb-10 p-8 bg-surface-white rounded-xl shadow-lg border-l-4 border-primary-blue">
                <h1 class="text-4xl font-bold text-text-dark mb-1">Welcome back, Dr. Smith</h1>
                <p class="text-lg text-gray-600 mb-6">Start a new analysis or continue previous cases.</p>
                
                <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <button onclick="navigate('upload')" class="w-full sm:w-auto bg-primary-blue text-white rounded-lg px-6 py-3 text-lg font-semibold shadow-md button-3d-hover">
                        Upload Patient Report
                    </button>
                    <button onclick="navigate('detection')" class="w-full sm:w-auto bg-white border border-primary-blue text-primary-blue rounded-lg px-6 py-3 text-lg font-semibold hover:bg-gray-50 transition duration-300 ease-cubic-bezier">
                        Start Tool Detection (Live)
                    </button>
                    <span class="text-xs bg-accent-green text-white px-3 py-1 rounded-full font-medium ml-4 mt-3 sm:mt-0">
                        Live model v2.2 — last trained: 2025-10-01
                    </span>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 space-y-4">
                    <h2 class="text-2xl font-semibold text-text-dark">Recent Cases</h2>
                    
                    <div class="bg-surface-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer" onclick="navigate('outcome')">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-xl font-bold text-primary-blue">Case C-7023 (Aortic Valve Replacement)</h3>
                                <p class="text-sm text-gray-500">Patient Alias: J. Doe | Date: 2025-09-27</p>
                            </div>
                            <div class="flex space-x-2 text-gray-500">
                                <span title="Report Processed" class="text-accent-green text-lg" role="img" aria-label="Report Processed">✅</span>
                                <span title="Video Saved" class="text-accent-green text-lg" role="img" aria-label="Video Saved">🎥</span>
                            </div>
                        </div>
                        <div class="mt-4 flex space-x-4">
                            <button class="text-sm text-primary-blue font-medium hover:underline" onclick="navigate('outcome')">View Final Outcome</button>
                            <button class="text-sm text-gray-600 font-medium hover:underline">Download All</button>
                        </div>
                    </div>
                     <div class="bg-surface-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer" onclick="navigate('upload')">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-xl font-bold text-text-dark">Case C-7024 (Pending Detection)</h3>
                                <p class="text-sm text-gray-500">Patient Alias: M. King | Date: 2025-10-02</p>
                            </div>
                            <div class="flex space-x-2 text-gray-500">
                                <span title="Report Processed" class="text-accent-green text-lg" role="img" aria-label="Report Processed">✅</span>
                                <span title="Video Missing" class="text-gray-400 text-lg" role="img" aria-label="Video Missing">📹</span>
                            </div>
                        </div>
                        <div class="mt-4 flex space-x-4">
                            <button class="text-sm text-primary-blue font-medium hover:underline" onclick="navigate('upload')">Continue Upload Analysis</button>
                            <button class="text-sm text-gray-600 font-medium hover:underline" onclick="navigate('detection')">Start Live Detection</button>
                        </div>
                    </div>
                </div>

                <div class="space-y-8">
                    <div class="bg-surface-white p-6 rounded-xl shadow-md border-t-4 border-accent-green">
                        <h3 class="text-xl font-semibold text-text-dark mb-4">Quick Metrics</h3>
                        <ul class="space-y-3">
                            <li class="flex justify-between items-center text-gray-700">
                                <span class="font-medium"># Cases Today:</span>
                                <span class="text-2xl font-bold text-primary-blue">2</span>
                            </li>
                            <li class="flex justify-between items-center text-gray-700">
                                <span class="font-medium">Avg Report Time:</span>
                                <span class="text-xl font-bold text-primary-blue">38s</span>
                            </li>
                            <li class="flex justify-between items-center text-gray-700">
                                <span class="font-medium">Model Accuracy (Latest):</span>
                                <span class="text-xl font-bold text-primary-blue">94.8%</span>
                            </li>
                        </ul>
                    </div>

                    <div class="bg-surface-white p-6 rounded-xl shadow-md">
                        <h3 class="text-xl font-semibold text-text-dark mb-3">Latest Notifications</h3>
                        <ul class="space-y-3 text-sm">
                            <li class="text-gray-700 border-l-2 border-accent-green pl-3">Case C-7023 final outcome available.</li>
                            <li class="text-gray-700 border-l-2 border-primary-blue pl-3">System update v2.2 deployed successfully.</li>
                            <li class="text-gray-700 border-l-2 border-primary-blue pl-3">New clinical research references added.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
        ${AppFooter()}
    `;
}