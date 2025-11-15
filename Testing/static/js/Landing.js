const features = [
  {
    title: "Report Detection & Summarization",
    description: "Leverages NLP models to extract key findings and generate concise summaries.",
    img: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74",
  },
  {
    title: "Real-Time Tool Detection",
    description: "Uses computer vision to detect surgical instruments in real time.",
    img: "https://images.unsplash.com/photo-1725409796886-850f46d1d0cb",
  },
  {
    title: "Procedural Workflow Analysis",
    description: "Analyzes surgical sessions to identify bottlenecks and map efficiency.",
    img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12",
  },
];

// NOTE: renderFeatures is included but not called, as content is static in HTML.

/**
 * Shows the Disclaimer Modal with smooth CSS animation.
 */
function showDisclaimerModal() {
    const modal = document.getElementById('disclaimerModal');
    if (modal) {
        // Uses the CSS class defined in style.css to trigger visibility
        modal.classList.add('is-visible'); 
        // CRITICAL FIX: Use a class to manage overflow instead of inline style
        document.body.classList.add('modal-open'); 
    }
}

/**
 * Hides the Disclaimer Modal with smooth CSS animation.
 */
function hideDisclaimerModal() {
    const modal = document.getElementById('disclaimerModal');
    if (modal) {
        // Removes the CSS class to trigger smooth close animation
        modal.classList.remove('is-visible'); 
        // CRITICAL FIX: Remove the body class to restore scrolling
        document.body.classList.remove('modal-open'); 
    }
}

/**
 * Initializes the Landing Page (Features, AOS, and Modal).
 */
function initializeLanding() {
    console.log("Initializing Landing Page...");
    
    // 1. Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }
    
    // 2. Conditional Modal Show after delay
    // CRITICAL FIX: Only show modal if the device is NOT a mobile/tablet.
    // window.isMobileOrTablet is assumed to be available from shared.js
    if (typeof window.isMobileOrTablet === 'function' && !window.isMobileOrTablet()) {
        setTimeout(showDisclaimerModal, 900); 
    } else {
        console.log("Disclaimer modal suppressed for mobile/tablet user.");
    }
    
    // 3. Bind Modal close button to the hide function
    const closeButton = document.getElementById('closeModalButton');
    if (closeButton) {
        closeButton.onclick = hideDisclaimerModal;
    }
}

// CRITICAL FIX: Use DOMContentLoaded to ensure initializeLanding() runs safely after DOM elements are available.
document.addEventListener('DOMContentLoaded', initializeLanding);

// Expose functions globally.
window.showDisclaimerModal = showDisclaimerModal;
window.hideDisclaimerModal = hideDisclaimerModal;