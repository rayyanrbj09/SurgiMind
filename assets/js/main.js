import * as Data from './data.js';

// Global State
const appContainer = document.getElementById('app-container');
let currentPage = 'landing';
export let uploadState = 1;
export let simulatedProcedure = Math.random() < 0.5 ? 'Heart Surgery' : 'Cholecystectomy';

// Detection State (for detection.js)
export let isRecording = false;
export let detectionInterval;
export let seconds = 0;


// --- Shared Components (must be exported for use in renderers) ---

export const AppHeader = (activePage) => {
    const isApp = ['dashboard', 'upload', 'detection', 'outcome', 'history', 'help'].includes(activePage);

    if (!isApp) return '';

    const appLinks = `
        <nav class="hidden md:flex space-x-6 text-base font-medium">
            <a href="#" onclick="navigate('dashboard')" class="text-gray-600 hover:text-primary-blue pb-1 transition ${activePage === 'dashboard' ? 'text-primary-blue border-b-2 border-primary-blue' : ''}">Dashboard</a>
            <a href="#" onclick="navigate('upload')" class="text-gray-600 hover:text-primary-blue pb-1 transition ${activePage === 'upload' ? 'text-primary-blue border-b-2 border-primary-blue' : ''}">Upload Report</a>
            <a href="#" onclick="navigate('detection')" class="text-gray-600 hover:text-primary-blue pb-1 transition ${activePage === 'detection' ? 'text-primary-blue border-b-2 border-primary-blue' : ''}">Tool Detection</a>
            <a href="#" onclick="navigate('history')" class="text-gray-600 hover:text-primary-blue pb-1 transition ${activePage === 'history' ? 'text-primary-blue border-b-2 border-primary-blue' : ''}">History</a>
            <a href="#" onclick="navigate('help')" class="text-gray-600 hover:text-primary-blue pb-1 transition ${activePage === 'help' ? 'text-primary-blue border-b-2 border-primary-blue' : ''}">Help</a>
        </nav>
        <div class="flex items-center space-x-3">
            <span class="text-sm text-gray-600 hidden sm:inline">Dr. Smith, Mercy Hospital</span>
            <div class="h-10 w-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold cursor-pointer border-2 border-primary-blue" 
                 aria-label="Surgeon Profile and Settings" onclick="navigate('history')">DS</div>
        </div>
    `;

    return `
        <header class="sticky top-0 bg-surface-white border-b border-gray-200 z-50 shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                <div class="flex items-center space-x-8">
                    <div class="text-2xl font-bold text-text-dark tracking-wide cursor-pointer" onclick="navigate('landing')">
                        Surgi<span class="text-primary-blue">Mind</span>
                    </div>
                </div>
                <div class="flex items-center space-x-3">
                    ${appLinks}
                </div>
            </div>
        </header>
    `;
};

export const AppFooter = () => `
    <footer class="bg-text-dark text-gray-400 mt-12 py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto flex flex-col justify-center items-center text-sm space-y-2">
            <p class="text-center">
                SurgiMind &copy; 2024. A research initiative by JNTUH students.
            </p>
            <p class="text-center">
                Explore the codebase on 
                <a href="https://github.com/rayyanrbj09/SurgiMind.git" target="_blank" class="text-primary-blue hover:text-accent-green transition">GitHub</a>.
            </p>
        </div>
    </footer>
`;

// --- Utility Functions (must be exported for use in renderers) ---

export function togglePasswordVisibility(id) {
    const input = document.getElementById(id);
    const icon = document.getElementById(id + '-icon');
    if (!input || !icon) return;

    if (input.type === 'password') {
        input.type = 'text';
        icon.innerHTML = '👁️'; // Eye open
    } else {
        input.type = 'password';
        icon.innerHTML = '🔒'; // Lock/Eye closed
    }
    input.focus();
}

export function handleSocialLogin(provider) {
    showToast(`Simulating connection to ${provider} server...`, 'info');

    // Simulate delay for redirection
    setTimeout(() => {
        showToast(`Login via ${provider} successful! (Simulated)`, 'success');
        navigate('dashboard');
    }, 1500);
}

// --- Auth Info Panel Logic (used in login/signup) ---
export function showAuthInfo(type) {
    const privacyPanel = document.getElementById('auth-info-modal-privacy');
    const termsPanel = document.getElementById('auth-info-modal-terms');

    // Hide the opposite panel instantly
    if (type === 'privacy' && termsPanel) {
        termsPanel.classList.remove('visible');
    } else if (type === 'terms' && privacyPanel) {
        privacyPanel.classList.remove('visible');
    }

    // Show the requested panel
    const targetPanel = type === 'privacy' ? privacyPanel : termsPanel;
    if (targetPanel) {
        targetPanel.classList.add('visible');
        targetPanel.focus();
    }
}

export function hideAuthInfo(type, duration = 500) {
    const targetPanel = document.getElementById(`auth-info-modal-${type}`);
    if (targetPanel) {
        if (duration === 0) {
            targetPanel.style.transition = 'none';
            targetPanel.classList.remove('visible');
            setTimeout(() => targetPanel.style.transition = '', 50);
        } else {
            targetPanel.classList.remove('visible');
        }
    }
}

export function handleSignup() {
    const agreeCheckbox = document.getElementById('agree-terms');
    if (!agreeCheckbox.checked) {
        showToast('Please agree to the Terms of Service to continue.', 'error');
        return;
    }
    showToast('Account Created! Redirecting...', 'success');
    navigate('dashboard');
}


// --- Toast System (must be exported for use in renderers) ---

export function showToast(message, type = 'info') {
    let toastContainer = document.getElementById('toast-container');
    
    let colorClass, icon;
    if (type === 'success') {
        colorClass = 'bg-accent-green border-accent-green';
        icon = '✅';
    } else if (type === 'error') {
        colorClass = 'bg-red-600 border-red-600';
        icon = '❌';
    } else {
        colorClass = 'bg-primary-blue border-primary-blue';
        icon = 'ℹ️';
    }

    const toast = document.createElement('div');
    
    // Set base styling, using duration-500 for a noticeable, but short, fade out.
    toast.className = `p-4 rounded-lg shadow-xl text-white font-medium border-l-4 ${colorClass} transition-all duration-500 ease-in-out`;
    toast.innerHTML = `${icon} ${message}`;

    // 1. Set the initial HIDDEN state
    toast.classList.add('transform', 'translate-x-full', 'opacity-0');
    toastContainer.appendChild(toast);

    // 2. Animate IN (after slight delay)
    setTimeout(() => {
        toast.classList.remove('translate-x-full', 'opacity-0');
        toast.classList.add('translate-x-0', 'opacity-100');
    }, 10);

    // 3. Start Fade-Out after 2.5 seconds (2500ms)
    setTimeout(() => {
        // Start fade out animation
        toast.classList.add('translate-x-full', 'opacity-0');
    }, 2500); 

    // 4. Remove the element from the DOM after the fade-out is visually complete (3000ms total)
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 3000); 
}

// --- Core Navigation (must be exported for use in renderers) ---

export async function navigate(page) {
    // Dynamically import the correct renderer module
    const renderModule = await import(`./renderers/${page}.js`);

    // Stop camera if leaving detection page (stopLiveCamera is in detection.js)
    if (currentPage === 'detection' && window.stopLiveCamera) {
        window.stopLiveCamera(); 
    }

    currentPage = page;
    document.getElementById('app-container').classList.add('opacity-0', 'transition-opacity', 'duration-600');

    setTimeout(() => {
        // Hide any visible auth info panels before navigating
        hideAuthInfo('privacy', 0);
        hideAuthInfo('terms', 0);

        // Render the page using the imported function
        renderModule.renderPage(appContainer);

        document.getElementById('app-container').classList.remove('opacity-0');
    }, 60); // Small delay to trigger the fade out/in effect
}

// --- Ripple Effect and Init ---

function createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) { existingRipple.remove(); }

    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;

    button.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}

function showDisclaimerModal() {
    const modal = document.getElementById('disclaimerModal');
    const modalContent = document.getElementById('modalContent');
    if (modal && modalContent) {
        modal.classList.remove('pointer-events-none', 'opacity-0');
        modal.classList.add('opacity-100');
        modalContent.classList.remove('scale-90');
        modalContent.classList.add('scale-100');
    }
}

export function hideDisclaimerModal() {
    const modal = document.getElementById('disclaimerModal');
    const modalContent = document.getElementById('modalContent');
    if (modal && modalContent) {
        modal.classList.remove('opacity-100');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-90');
        setTimeout(() => {
            modal.classList.add('pointer-events-none', 'opacity-0');
        }, 500);
    }
}

export function closeModal() {
    document.getElementById('app-modal').classList.add('hidden');
}


export function initApp() {
    AOS.init({ duration: 1000, once: true, easing: 'ease-out-cubic' });
    navigate('landing');
    setTimeout(showDisclaimerModal, 1000);

    // Re-bind ripple effect listener to relevant elements
    document.querySelectorAll('.btn-start, .btn-demo-hover, .feature-card, .button-3d-hover, .glass-social-button').forEach(element => {
        element.addEventListener('click', function(e) {
            createRipple(e);
        });
    });
}

// --- EXPOSE CORE FUNCTIONS TO WINDOW FOR INLINE HTML ATTRIBUTES ---
// This is the CRITICAL step to fix the rendering issue.

window.initApp = initApp;
window.navigate = navigate;
window.showToast = showToast;
window.handleSocialLogin = handleSocialLogin;
window.togglePasswordVisibility = togglePasswordVisibility;
window.showAuthInfo = showAuthInfo;
window.hideAuthInfo = hideAuthInfo;
window.handleSignup = handleSignup;
window.hideDisclaimerModal = hideDisclaimerModal;
window.closeModal = closeModal;


// Expose state and setters for inter-module use
export function setUploadState(state) { uploadState = state; }
export function setSimulatedProcedure(procedure) { simulatedProcedure = procedure; }
export function setRecordingState(state) { isRecording = state; }
export function setDetectionInterval(interval) { detectionInterval = interval; }
export function setSeconds(s) { seconds = s; }