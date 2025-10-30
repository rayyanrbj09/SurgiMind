// --- Custom Content for Privacy & Terms ---
const PrivacyContent = `
    <h4 class="text-lg font-bold text-accent-green mb-2">Privacy Note: Project Focus & Data Security</h4>
    <p class="text-sm text-gray-200 mb-4">
        SurgiMind is a **B.Tech Final Year Project** developed by JNTUH students. 
        This platform is purely for **educational and research simulation**.
    </p>
    <h4 class="text-lg font-bold text-accent-green mb-2">1. Data Handling & Anonymization (Simulated)</h4>
    <ul class="list-disc list-inside text-sm text-gray-200 space-y-1">
        <li>**No Real Patient Data:** The application handles simulated, anonymized clinical data.</li>
        <li>**Anonymized Logs:** System metrics are recorded in anonymized form for performance analysis only.</li>
    </ul>
    <h4 class="text-lg font-bold text-accent-green mb-2 mt-4">2. Security & Access Control (Simulated)</h4>
    <ul class="list-disc list-inside text-sm text-gray-200 space-y-1">
        <li>**Encryption:** All data fields in our mock environment are secured using industry-standard simulation of **end-to-end encryption**.</li>
        <li>**Surgeon-Only Access:** Authentication is simulated to ensure only authorized users access the platform.</li>
    </ul>
    <h4 class="text-lg font-bold text-accent-green mb-2 mt-4">3. Data Usage & Commercial Policy</h4>
    <ul class="list-disc list-inside text-sm text-gray-200 space-y-1">
        <li>**Research Only:** Data generated is solely for academic purposes.</li>
        <li>**No Commercial Use:** Data is **not** shared, sold, or used for any commercial or external third-party applications.</li>
    </ul>
`;

const TermsContent = `
    <h4 class="text-lg font-bold text-accent-green mb-2">Terms of Service: Academic Use & Liability</h4>
    <p class="text-sm text-gray-200 mb-4">
        By accessing this platform, you acknowledge the following terms which govern its use:
    </p>
    <h4 class="text-lg font-bold text-accent-green mb-2">1. Non-Clinical Warning & Liability</h4>
    <ul class="list-disc list-inside text-sm text-gray-200 space-y-1">
        <li>**Non-Clinical Use:** SurgiMind must **NEVER** be used for actual diagnosis, patient treatment, or real surgical guidance. It is a research prototype.</li>
        <li>**No Medical Advice:** Outputs (summaries, checklists) are for **simulation/educational reference only**.</li>
        <li>**Liability Waiver:** The project creators and JNTUH hold **no liability** for any clinical decisions made based on the platform's simulated outputs.</li>
    </ul>
    <h4 class="text-lg font-bold text-accent-green mb-2 mt-4">2. Software and Model Limitations</h4>
    <ul class="list-disc list-inside text-sm text-gray-200 space-y-1">
        <li>**Prototype Status:** The application is provided "as is" with known limitations.</li>
        <li>**Simulated Accuracy:** The reported AI model accuracies are simulated for demonstration purposes.</li>
    </ul>
`;

// --- Utility Functions ---

function togglePasswordVisibility(id) {
    const input = document.getElementById(id);
    const icon = document.getElementById(id + '-icon');
    if (!input || !icon) return;

    if (input.type === 'password') {
        input.type = 'text';
        icon.innerHTML = '👁️';
    } else {
        input.type = 'password';
        icon.innerHTML = '🔒';
    }
    input.focus();
}

/**
 * Handles social login button click and redirects to dashboard.html on success.
 */
function handleSocialLogin(provider) {
    showToast(`Simulating connection to ${provider} server...`, 'info');
    
    setTimeout(() => {
        showToast(`Login via ${provider} successful! Redirecting to Dashboard...`, 'success');
        window.location.href = 'dashboard.html';
    }, 1500);
}

const Toast = () => `
    <div id="toast-container" class="fixed top-4 right-4 z-[1000] space-y-3">
        </div>
`;

function showToast(message, type = 'info') {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        const tempContainer = document.createElement('div');
        // The container needs to be appended and then the Toast() HTML inserted
        document.body.insertAdjacentHTML('beforeend', Toast());
        toastContainer = document.getElementById('toast-container');
    }
    
    let colorClass, icon;
    if (type === 'success') {
        colorClass = 'bg-accent-green border-accent-green';
        icon = '✅';
    } else if (type === 'error') {
        colorClass = 'bg-red-600 border-red-600';
        icon = '❌';
    } else {
        // FIX: Use custom class for animated info bar and set rocket icon
        colorClass = 'bg-gray-800 border-gray-700 custom-toast-animation'; 
        icon = '🚀'; 
    }
    
    const toast = document.createElement('div');
    
    // FIX: Compact styling and uses simple opacity transition for smooth top-right stacking
    toast.className = `p-3 rounded-lg shadow-xl text-white font-medium border-l-4 ${colorClass} max-w-xs transition-opacity duration-300 opacity-0`;
    toast.innerHTML = `${icon} <span class="ml-2">${message}</span>`;
    
    // FIX: Insert new toast at the top of the stack (prepend)
    toastContainer.prepend(toast);
    
    // Smooth fade-in
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 10);
    
    // Fade-out after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.addEventListener('transitionend', () => toast.remove());
    }, 3000);
}

// --- AUTH INFO PANEL LOGIC ---

function showAuthInfo(type) {
    const privacyPanel = document.getElementById('auth-info-modal-privacy');
    const termsPanel = document.getElementById('auth-info-modal-terms');
    
    if (type === 'privacy' && termsPanel) {
        termsPanel.classList.remove('visible');
    } else if (type === 'terms' && privacyPanel) {
        privacyPanel.classList.remove('visible');
    }

    const targetPanel = type === 'privacy' ? privacyPanel : termsPanel;
    if (targetPanel) {
        targetPanel.innerHTML = (type === 'privacy' ? PrivacyContent : TermsContent) + 
                                '<button class="absolute top-4 right-4 text-white/70 hover:text-white" onclick="hideAuthInfo(\'' + type + '\')">✕</button>';

        targetPanel.classList.add('visible');
        targetPanel.focus();
    }
}

function hideAuthInfo(type, duration = 400) {
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


// Expose functions globally
window.togglePasswordVisibility = togglePasswordVisibility;
window.handleSocialLogin = handleSocialLogin;
window.showToast = showToast;
window.showAuthInfo = showAuthInfo;
window.hideAuthInfo = hideAuthInfo;