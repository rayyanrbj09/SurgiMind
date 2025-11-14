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

function renderFeatures() {
  const grid = document.getElementById("featureGrid");
  if (!grid) return;
    
  grid.innerHTML = ''; 

  features.forEach(f => {
    const card = document.createElement("div");
    card.className = "feature-card bg-white rounded-xl shadow-lg border border-gray-200 p-4";
    card.setAttribute("data-aos", "fade-up");
    card.innerHTML = `
      <div class="grid-image-container"><img src="${f.img}" alt="${f.title}" /></div>
      <h3 class="text-xl font-bold text-primary-blue mb-1">${f.title}</h3>
      <p class="text-sm text-gray-700">${f.description}</p>
    `;
    grid.appendChild(card);
  });
}

/**
 * Shows the Disclaimer Modal with smooth CSS animation.
 */
function showDisclaimerModal() {
    const modal = document.getElementById('disclaimerModal');
    if (modal) {
<<<<<<< HEAD
        modal.classList.add('is-visible');
        document.body.style.overflow = 'hidden'; 
=======
        // Uses the CSS class defined in style.css to trigger visibility
        modal.classList.add('is-visible'); 
        // CRITICAL FIX: Use a class to manage overflow instead of inline style
        document.body.classList.add('modal-open'); 
>>>>>>> Sofiyaan
    }
}

/**
 * Hides the Disclaimer Modal with smooth CSS animation.
 */
function hideDisclaimerModal() {
    const modal = document.getElementById('disclaimerModal');
    if (modal) {
<<<<<<< HEAD
        modal.classList.remove('is-visible');
        document.body.style.overflow = ''; 
=======
        // Removes the CSS class to trigger smooth close animation
        modal.classList.remove('is-visible'); 
        // CRITICAL FIX: Remove the body class to restore scrolling
        document.body.classList.remove('modal-open'); 
>>>>>>> Sofiyaan
    }
}

/**
 * Initializes the Landing Page (Features, AOS, and Modal).
 */
function initializeLanding() {
    console.log("Initializing Landing Page...");
    
    // 1. Render Features (optional, if your HTML is dynamic)
    // renderFeatures();
    
    // 2. Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }
    
<<<<<<< HEAD
    // 3. Show Modal after delay
    setTimeout(showDisclaimerModal, 900);
=======
    // 2. Conditional Modal Show after delay
    // CRITICAL FIX: Only show modal if the device is NOT a mobile/tablet.
    // window.isMobileOrTablet is assumed to be available from shared.js
    if (typeof window.isMobileOrTablet === 'function' && !window.isMobileOrTablet()) {
        setTimeout(showDisclaimerModal, 900); 
    } else {
        console.log("Disclaimer modal suppressed for mobile/tablet user.");
    }
>>>>>>> Sofiyaan
    
    // 4. Bind Modal close button
    const closeButton = document.getElementById('closeModalButton');
    if (closeButton) {
        closeButton.onclick = hideDisclaimerModal;
    }
}

<<<<<<< HEAD
// ** THE CRITICAL FIX: Expose the initialization function globally **
window.initializeLanding = initializeLanding;
=======
// CRITICAL FIX: Use DOMContentLoaded to ensure initializeLanding() runs safely after DOM elements are available.
document.addEventListener('DOMContentLoaded', initializeLanding);

// Expose functions globally.
window.showDisclaimerModal = showDisclaimerModal;
window.hideDisclaimerModal = hideDisclaimerModal;
>>>>>>> Sofiyaan
