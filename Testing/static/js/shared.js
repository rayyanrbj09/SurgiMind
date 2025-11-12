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

/**
 * NEW FUNCTION: Checks if the user agent indicates a mobile or tablet device.
 * Used to disable the disclaimer modal on small screens.
 */
function isMobileOrTablet() {
    const userAgent = navigator.userAgent.toLowerCase();
    // Includes iOS and Android phone/tablet keywords
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent);
}


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
    <div id="toast-container" class="fixed top-4 right-4 z-[1000] space-y-3"></div>
`;

function showToast(message, type = 'info') {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
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
    
    setTimeout(() => (toast.style.opacity = '1'), 10);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.addEventListener('transitionend', () => toast.remove());
    }, 3000);
}

// --- AUTH INFO PANEL LOGIC ---

function showAuthInfo(type) {
    const privacyPanel = document.getElementById('auth-info-modal-privacy');
    const termsPanel = document.getElementById('auth-info-modal-terms');
    
    if (type === 'privacy' && termsPanel) termsPanel.classList.remove('visible');
    else if (type === 'terms' && privacyPanel) privacyPanel.classList.remove('visible');

    const targetPanel = type === 'privacy' ? privacyPanel : termsPanel;
    if (targetPanel) {
        targetPanel.innerHTML =
            (type === 'privacy' ? PrivacyContent : TermsContent) +
            `<button class="absolute top-4 right-4 text-white/70 hover:text-white" onclick="hideAuthInfo('${type}')">✕</button>`;
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
            setTimeout(() => (targetPanel.style.transition = ''), 50);
        } else {
            targetPanel.classList.remove('visible');
        }
    }
}

// --- PROFILE DROPDOWN LOGIC ---
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
    if (redirectPath) window.location.href = redirectPath;
}

// --- PROFILE PAGE EDIT LOGIC ---
function toggleEditProfile(isEditing) {
    const fields = document.querySelectorAll('.profile-field');
    const editBtn = document.getElementById('edit-profile-btn');
    const saveBtn = document.getElementById('save-profile-btn');
    const avatar = document.getElementById('profile-avatar');
    
    fields.forEach(field => {
        field.readOnly = !isEditing;
        field.classList.toggle('glass-input-light', isEditing);
        field.classList.toggle('glass-input-edit', isEditing);
    });

    editBtn.classList.toggle('hidden', isEditing);
    saveBtn.classList.toggle('hidden', !isEditing);
    if (avatar) avatar.classList.toggle('cursor-pointer', isEditing);
    if (!isEditing) showToast('Profile information saved!', 'success');
}

function saveProfile() {
    toggleEditProfile(false);
}

// --- CHATBOT LOGIC ---
function toggleChatbot() {
    const chatWindow = document.getElementById('ai-chat-window');
    const chatIcon = document.getElementById('chat-icon');
    if (!chatWindow) return;
    chatWindow.classList.toggle('open');
    chatIcon.textContent = chatWindow.classList.contains('open') ? '✖️' : '💬';
}

function simulateChatResponse() {
    const inputField = document.getElementById('chat-input-field');
    const messages = document.getElementById('chat-messages');
    const userText = inputField.value.trim();
    if (!userText) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'message-bot text-right bg-primary-red/10 border-r-3 border-r-primary-red border-l-0'; 
    userMsg.innerHTML = `<span class="text-white font-semibold">You:</span> ${userText}`;
    messages.appendChild(userMsg);

    const lowerCaseText = userText.toLowerCase();
    let response = "I'm still learning! Could you rephrase your question about tool detection, workflow, or spatial measurements?";
    if (lowerCaseText.includes('hi') || lowerCaseText.includes('hello')) response = "Hello there! How can I help you navigate SurgiMind today?";

    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'message-bot';
        botMsg.innerHTML = `<span class="text-primary-red font-semibold">AI:</span> ${response}`;
        messages.appendChild(botMsg);
        messages.scrollTop = messages.scrollHeight;
    }, 800);
    inputField.value = '';
}

// --- THEME & CHATBOT INJECTION ---
function toggleTheme() { /* unchanged logic */ }
function initializeTheme() { /* unchanged logic */ }
function checkAndInjectThemeButton() { /* unchanged logic */ }

/** ✅ FIXED CHATBOT RENDER FUNCTION **/
function loadChatbotComponent() {
  if (document.getElementById('ai-chatbot-btn') || document.getElementById('ai-chat-window')) return;

  const path = window.location.pathname.toLowerCase();
  const isAuthPage = path.includes('login.html') || path.includes('signup.html');
  if (isAuthPage) return;

  fetch('chatbot_component.html')
    .then(response => {
      if (!response.ok) throw new Error(`Chatbot load failed (${response.status})`);
      return response.text();
    })
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);

      const sendBtn = document.querySelector('#ai-chat-window button');
      const inputField = document.getElementById('chat-input-field');
      if (sendBtn) sendBtn.onclick = simulateChatResponse;
      if (inputField) {
        inputField.addEventListener('keypress', e => {
          if (e.key === 'Enter') simulateChatResponse();
        });
      }

      console.log('✅ SurgiMind AI Chatbot loaded successfully.');
    })
    .catch(err => console.error('❌ Failed to load chatbot:', err));
}

// --- GLOBAL GLOWING GLOVE CURSOR ---
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.custom-cursor')) return;

  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', e => {
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
  });

  document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
  document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
});

// --- GLOBAL EXPOSURE ---
window.isMobileOrTablet = isMobileOrTablet; // Expose new function
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

document.addEventListener('DOMContentLoaded', checkAndInjectThemeButton);
document.addEventListener('DOMContentLoaded', loadChatbotComponent);

// --- Mobile Tap Feedback ---
document.addEventListener('touchstart', (e) => {
  const tapEffect = document.createElement('span');
  tapEffect.classList.add('tap-glow');
  tapEffect.style.top = `${e.touches[0].clientY}px`;
  tapEffect.style.left = `${e.touches[0].clientX}px`;
  document.body.appendChild(tapEffect);
  setTimeout(() => tapEffect.remove(), 500);
});

// --- TEAM PROFILE MODAL ---
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("profile-modal");
  const modalContent = document.getElementById("profile-modal-content");
  const closeModal = document.getElementById("close-profile-modal");

  const profiles = document.querySelectorAll(".profile-card");
  profiles.forEach(card => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img").src;
      const name = card.querySelector("h3").innerText;
      const college = card.querySelectorAll("p")[0].innerText;
      const roll = card.querySelectorAll("p")[1].innerText;
      const desc = card.querySelector(".list-item-red-border").innerText;
      const links = card.querySelectorAll("a");

      // Fill modal
      document.getElementById("modal-profile-img").src = img;
      document.getElementById("modal-profile-name").innerText = name;
      document.getElementById("modal-profile-college").innerText = college;
      document.getElementById("modal-profile-roll").innerText = roll;
      document.getElementById("modal-profile-desc").innerText = desc;

      const linkContainer = document.getElementById("modal-profile-links");
      linkContainer.innerHTML = "";
      links.forEach(a => {
        const clone = a.cloneNode(true);
        clone.classList.add("text-white", "hover:text-primary-red", "transition");
        linkContainer.appendChild(clone);
      });

      // Show modal
      modal.classList.remove("pointer-events-none", "opacity-0");
      modal.classList.add("opacity-100");
      modalContent.classList.remove("scale-90");
      modalContent.classList.add("scale-100");
    });
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.classList.add("pointer-events-none", "opacity-0");
    modal.classList.remove("opacity-100");
    modalContent.classList.add("scale-90");
  });

  // Close on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("pointer-events-none", "opacity-0");
      modal.classList.remove("opacity-100");
      modalContent.classList.add("scale-90");
    }
  });
});
