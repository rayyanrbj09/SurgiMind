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
        modal.classList.add('is-visible');
        document.body.style.overflow = 'hidden'; 
    }
}

/**
 * Hides the Disclaimer Modal with smooth CSS animation.
 */
function hideDisclaimerModal() {
    const modal = document.getElementById('disclaimerModal');
    if (modal) {
        modal.classList.remove('is-visible');
        document.body.style.overflow = ''; 
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
    
    // 3. Show Modal after delay
    setTimeout(showDisclaimerModal, 900);
    
    // 4. Bind Modal close button
    const closeButton = document.getElementById('closeModalButton');
    if (closeButton) {
        closeButton.onclick = hideDisclaimerModal;
    }
}

// ** THE CRITICAL FIX: Expose the initialization function globally **
window.initializeLanding = initializeLanding;