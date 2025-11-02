// --- Custom Content for Privacy & Terms ---
const PrivacyContent = `
    <h4 class="text-lg font-bold text-accent-green mb-2">Privacy Note: Project Focus & Data Security</h4>
    <p class="text-sm text-gray-200 mb-4">
        SurgiMind is a **B.Tech Final Year Project** developed by JNTUH students. 
        This platform is purely for **educational and research simulation**.
    </p>
    <h4 class="text-lg font-bold text-accent-green mb-2 mt-4">1. Data Handling & Anonymization (Simulated)</h4>
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
        colorClass = 'bg-gray-800 border-gray-700 custom-toast-animation'; 
        icon = '🚀'; 
    }
    
    const toast = document.createElement('div');
    
    toast.className = `p-3 rounded-lg shadow-xl text-white font-medium border-l-4 ${colorClass} max-w-xs transition-opacity duration-300 opacity-0`;
    toast.innerHTML = `${icon} <span class="ml-2">${message}</span>`;
    
    toastContainer.prepend(toast);
    
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.addEventListener('transitionend', () => toast.remove());
    }, 3000);
}

// --- AUTH INFO PANEL LOGIC ---

function showAuthInfo(type) {
    const privacyPanel = document.getElementById('auth-info-modal-privacy');
    const termsPanel = document.getElementById('auth-info-modal-terms');
    
    // On small screens, hide the other one if needed
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

// --- PROFILE DROPDOWN LOGIC (Used in Header) ---

function toggleProfileDropdown() {
    const dropdown = document.getElementById('profile-dropdown-menu');
    const button = document.getElementById('profile-dropdown-btn');
    if (dropdown) {
        const isHidden = dropdown.classList.toggle('hidden');
        button.setAttribute('aria-expanded', !isHidden);
    }
}

function hideProfileDropdown(redirectPath = null) {
    const dropdown = document.getElementById('profile-dropdown-menu');
    const button = document.getElementById('profile-dropdown-btn');
    if (dropdown && !dropdown.classList.contains('hidden')) {
        dropdown.classList.add('hidden');
        button.setAttribute('aria-expanded', 'false');
    }
    if (redirectPath) {
        window.location.href = redirectPath;
    }
}


// --- PROFILE PAGE EDIT LOGIC (Used in profile.html) ---

function toggleEditProfile(isEditing) {
    const fields = document.querySelectorAll('.profile-field');
    const editBtn = document.getElementById('edit-profile-btn');
    const saveBtn = document.getElementById('save-profile-btn');
    const avatar = document.getElementById('profile-avatar');
    
    fields.forEach(field => {
        field.readOnly = !isEditing;
        if (isEditing) {
            field.classList.add('glass-input-light', 'glass-input-edit');
            field.classList.remove('glass-input-read');
        } else {
            field.classList.remove('glass-input-light', 'glass-input-edit');
            field.classList.add('glass-input-read');
        }
    });

    if (isEditing) {
        editBtn.classList.add('hidden');
        saveBtn.classList.remove('hidden');
        // Show indicator that avatar can be changed (simulated)
        if (avatar) avatar.classList.add('cursor-pointer', 'ring-4', 'ring-primary-red/50');
    } else {
        editBtn.classList.remove('hidden');
        saveBtn.classList.add('hidden');
        if (avatar) avatar.classList.remove('cursor-pointer', 'ring-4', 'ring-primary-red/50');
        showToast('Profile information saved!', 'success');
    }
}

function saveProfile() {
    toggleEditProfile(false); // Switch back to view mode and show success toast
}

// --- AI CHATBOT LOGIC ---

/**
 * Toggles the visibility of the AI Chatbot window.
 */
function toggleChatbot() {
    const chatWindow = document.getElementById('ai-chat-window');
    const chatIcon = document.getElementById('chat-icon');
    
    if (chatWindow.classList.contains('open')) {
        chatWindow.classList.remove('open');
        chatIcon.textContent = '💬'; // Back to chat icon
    } else {
        chatWindow.classList.add('open');
        chatIcon.textContent = '✖️'; // Change to close icon
        // Optional: Focus the input field when opening
        const inputField = document.getElementById('chat-input-field');
        if (inputField) inputField.focus();
    }
}

/**
 * Simulates an AI response based on user input, handling common SurgiMind queries and conversations.
 */
function simulateChatResponse() {
    const inputField = document.getElementById('chat-input-field');
    const messages = document.getElementById('chat-messages');
    const userText = inputField.value.trim();

    if (userText === "") return;

    // 1. Display User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'message-bot text-right bg-primary-red/10 border-r-3 border-r-primary-red border-l-0'; 
    userMsg.innerHTML = `<span class="text-white font-semibold">You:</span> ${userText}`;
    messages.appendChild(userMsg);

    const lowerCaseText = userText.toLowerCase();
    let response = "";

    // --- ABUSE AND PROTECTION CHECK ---
    const abusiveWords = ['abuse', 'stupid', 'idiot', 'fool', 'swear', 'damn', 'ass', 'bitch', 'crap']; // Add more as needed
    const isAbusive = abusiveWords.some(word => lowerCaseText.includes(word));

    if (isAbusive) {
        response = "🚫 **Please do not use abusive language.** I'm here to assist you with the SurgiMind application and analysis.";
    } 
    // --- CONVERSATIONAL & INFO QUERIES ---
    else if (lowerCaseText.includes('hi') || lowerCaseText.includes('hello')) {
        response = "Hello there! How can I help you navigate SurgiMind today?";
    } else if (lowerCaseText.includes('how are you')) {
        response = "I am fine, thank you for asking! I'm a machine learning assistant, so I don't get tired. What can I do for you?";
    } else if (lowerCaseText.includes('who created') || lowerCaseText.includes('developers') || lowerCaseText.includes('dev')) {
        response = "SurgiMind is a **B.Tech Final Year Project** developed by students from **JNTUH**. This platform is for academic research and simulation only!";
    } else if (lowerCaseText.includes('explain what is this') || lowerCaseText.includes('what is this website') || lowerCaseText.includes('guide me')) {
        response = "SurgiMind is a surgical AI platform designed for performance analysis and skill development. Here's what you can find:\n\n" +
                   "1. **Tool Detection:** Real-time identification and tracking of surgical instruments.\n" +
                   "2. **Workflow:** Automatic breakdown of the procedure into phases (e.g., Incision, Closure).\n" +
                   "3. **Spatial Measurements:** Detailed analysis of tool speed, trajectory, and size/depth accuracy.\n\n" +
                   "I can guide you through any of these pages!";
    } 
    // --- TECHNICAL QUERIES (Existing Logic) ---
    else if (lowerCaseText.includes('tool') || lowerCaseText.includes('detect') || lowerCaseText.includes('live')) {
        response = "The **Tool Detection** feature supports both **Live Feed** and **Video Upload**. You can also **toggle the bounding boxes** on the Tool Detection page.";
    } else if (lowerCaseText.includes('workflow') || lowerCaseText.includes('phase')) {
        response = "The **Workflow Analysis** breaks down the procedure into phases (like Incision or Anastomosis), automatically detected from the video. It also tracks the duration of each phase.";
    } else if (lowerCaseText.includes('spatial') || lowerCaseText.includes('measure') || lowerCaseText.includes('size')) {
        response = "Detailed **Spatial Measurements** (e.g., incision length, tool velocity, and detected part size) have been moved to their own dedicated page, accessible from the Workflow Analysis screen.";
    } else if (lowerCaseText.includes('compare') || lowerCaseText.includes('history')) {
        response = "You can **compare performance metrics** and view historical analysis reports on the **Dashboard** and **History** pages (simulated feature).";
    } else {
        response = "I'm still learning! Could you rephrase your question about tool detection, workflow, or spatial measurements?";
    }
    // --- END AI RESPONSE LOGIC ---

    // 2. Simulate Bot Response
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'message-bot';
        
        botMsg.innerHTML = `<span class="text-primary-red font-semibold">AI:</span> ${response}`;
        messages.appendChild(botMsg);
        messages.scrollTop = messages.scrollHeight; // Scroll to bottom
    }, 800);

    inputField.value = ''; // Clear input
    messages.scrollTop = messages.scrollHeight; // Scroll to bottom
}

// --- THEME TOGGLE LOGIC ---

/**
 * Toggles the 'light-app-body' class on the body element.
 */
function toggleTheme() {
    const body = document.body;
    const isLightMode = body.classList.toggle('light-app-body');
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    
    // Update the button icon
    if (themeIcon) {
        themeIcon.innerHTML = isLightMode ? '🌙' : '☀️';
    }
    
    // Update button color classes based on the new mode
    if (toggleBtn) {
        if (isLightMode) {
            toggleBtn.classList.remove('text-white', 'bg-white/10');
            toggleBtn.classList.add('text-black', 'bg-gray-200'); // Light mode button style
        } else {
            toggleBtn.classList.remove('text-black', 'bg-gray-200');
            toggleBtn.classList.add('text-white', 'bg-white/10'); // Dark mode button style
        }
    }
}

/**
 * Initializes the theme based on user preference from localStorage.
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    
    const applyLight = (savedTheme === 'light');

    if (applyLight) {
        body.classList.add('light-app-body');
    }
    
    // Set initial icon and button state correctly
    const themeIcon = document.getElementById('theme-icon');
    const toggleBtn = document.getElementById('theme-toggle-btn');

    if (themeIcon) {
        const isLightMode = body.classList.contains('light-app-body');
        themeIcon.innerHTML = isLightMode ? '🌙' : '☀️';

        if (toggleBtn) {
            if (isLightMode) {
                toggleBtn.classList.add('text-black', 'bg-gray-200');
                toggleBtn.classList.remove('text-white', 'bg-white/10');
            } else {
                toggleBtn.classList.add('text-white', 'bg-white/10');
                toggleBtn.classList.remove('text-black', 'bg-gray-200');
            }
        }
    }
}

// --- INJECTION LOGIC ---

/**
 * Injects the Theme Toggle Button into the header of every page except login/signup.
 */
function checkAndInjectThemeButton() {
    const pathname = window.location.pathname;
    // Check if the current page is NOT login.html or signup.html
    const shouldInject = !pathname.includes('login.html') && !pathname.includes('signup.html');
    
    // Target the flex container inside the header that holds the nav and profile button
    const headerDiv = document.querySelector('.app-header-dark .flex.items-center.space-x-3.sm\\:space-x-6');
    
    if (shouldInject && headerDiv) {
        // Find the profile container (the element right before which we want to inject)
        const profileContainer = headerDiv.querySelector('.relative.flex.items-center.space-x-3');
        
        // Ensure injection only happens once
        if (profileContainer && !document.getElementById('theme-toggle-btn')) {
            const toggleButtonHTML = `
                <button id="theme-toggle-btn" onclick="toggleTheme()" 
                        class="p-2 rounded-full transition duration-200" 
                        title="Toggle Light/Dark Mode">
                    <span id="theme-icon"></span>
                </button>
            `;
            // Insert the button before the profile dropdown container
            profileContainer.insertAdjacentHTML('beforebegin', toggleButtonHTML);
            
            // Now that the button exists, initialize its icon and state
            initializeTheme();
        }
    }
}


/**
 * Fetches and inserts the Chatbot HTML component into the body of the page.
 */
function loadChatbotComponent() {
    const pathname = window.location.pathname;
    const shouldLoadChatbot = !pathname.includes('login.html') && !pathname.includes('signup.html');

    if (!shouldLoadChatbot) return;

    // NOTE: Update this path if chatbot_component.html is moved.
    const componentPath = '../templates/chatbot_component.html'; // Assuming /js/shared.js needs to go up to root (../) and into /templates

    fetch(componentPath)
        .then(response => {
            if (!response.ok) {
                console.error(`Failed to load chatbot component: ${response.status}. Check path: ${componentPath}`);
                return Promise.reject(`Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            console.log("AI Chatbot component loaded successfully.");
            
            // Re-attach event listeners for the Send button and Enter key after HTML insertion
            const sendButton = document.querySelector('#ai-chat-window button');
            if (sendButton) {
                sendButton.onclick = simulateChatResponse;
            }
            const inputField = document.getElementById('chat-input-field');
             if (inputField) {
                 inputField.addEventListener('keypress', function (e) {
                     if (e.key === 'Enter') {
                         simulateChatResponse();
                     }
                 });
             }
        })
        .catch(error => {
            console.error('Error fetching chatbot component:', error);
        });
}


// --- GLOBAL EXPOSURE AND INITIALIZATION ---

// Expose functions globally
window.togglePasswordVisibility = togglePasswordVisibility;
window.handleSocialLogin = handleSocialLogin;
window.showToast = showToast;
window.showAuthInfo = showAuthInfo;
window.hideAuthInfo = hideAuthInfo;
window.toggleProfileDropdown = toggleProfileDropdown;
window.saveProfile = saveProfile;
window.toggleChatbot = toggleChatbot;
window.simulateChatResponse = simulateChatResponse;
window.toggleTheme = toggleTheme;


// Call the initialization functions when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', checkAndInjectThemeButton); 
document.addEventListener('DOMContentLoaded', loadChatbotComponent);