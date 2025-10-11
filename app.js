
        const appContainer = document.getElementById('app-container');
        let currentPage = 'landing';
        
        // --- Custom Content for Privacy & Terms ---
        const PrivacyContent = `
            <h4 class="text-lg font-bold text-accent-green mb-2">Privacy Note: Project Focus & Data Security</h4>
            <p class="text-sm text-gray-200 mb-4">
                SurgiMind is a **B.Tech Final Year Project** developed by Mohd Rayyan, Syed Saad Ahmed, and Mohammed Sofiyaan from JNTUH. 
                This platform is purely for **educational and research simulation**.
            </p>
            <h4 class="text-lg font-bold text-accent-green mb-2">1. Data Handling & Anonymization (Simulated)</h4>
            <ul class="list-disc list-inside text-sm text-gray-200 space-y-1">
                <li>**No Real Patient Data:** The application handles simulated, anonymized clinical data (placeholder reports, mock video streams).</li>
                <li>**Data Segregation:** Simulated case files are segregated by surgeon and are not publicly visible.</li>
                <li>**Anonymized Logs:** System metrics (e.g., model usage, processing times) are recorded in anonymized form for performance analysis only.</li>
            </ul>
            <h4 class="text-lg font-bold text-accent-green mb-2 mt-4">2. Security & Access Control (Simulated)</h4>
            <ul class="list-disc list-inside text-sm text-gray-200 space-y-1">
                <li>**Encryption:** All data fields in our mock environment are secured using industry-standard simulation of **end-to-end encryption** and storage.</li>
                <li>**Surgeon-Only Access:** Authentication is simulated to ensure only authorized users (surgeons) access the platform. Access tokens are simulated to expire periodically.</li>
            </ul>
            <h4 class="text-lg font-bold text-accent-green mb-2 mt-4">3. Data Usage & Commercial Policy</h4>
            <ul class="list-disc list-inside text-sm text-gray-200 space-y-1">
                <li>**Research Only:** Data generated within the platform is solely for academic purposes (JNTUH B.Tech Project).</li>
                <li>**No Commercial Use:** Data is **not** shared, sold, or used for any commercial or external third-party applications, strictly adhering to academic integrity.</li>
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
                <li>**No Medical Advice:** The summaries, checklists, and procedural confidence scores provided are for **simulation/educational reference only** and should not replace professional medical judgment.</li>
                <li>**Liability Waiver:** The project creators (Mohd Rayyan, Syed Saad Ahmed, Mohammed Sofiyaan) and JNTUH hold **no liability** for any clinical decisions made based on the platform's simulated outputs.</li>
            </ul>
            <h4 class="text-lg font-bold text-accent-green mb-2 mt-4">2. Software and Model Limitations</h4>
            <ul class="list-disc list-inside text-sm text-gray-200 space-y-1">
                <li>**Prototype Status:** The application is provided "as is" with known limitations and bugs typical of final year academic projects.</li>
                <li>**Simulated Accuracy:** The reported AI model accuracies (e.g., 94.8%) are simulated for demonstration purposes.</li>
                <li>**Compliance:** This application does **not** comply with real-world HIPAA, GDPR, or FDA regulations, as it is non-operational academic software.</li>
            </ul>
            <h4 class="text-lg font-bold text-accent-green mb-2 mt-4">3. User Conduct</h4>
            <ul class="list-disc list-inside text-sm text-gray-200 space-y-1">
                <li>**Authorized Use:** This platform is intended strictly for authorized surgical personnel involved in the associated academic study.</li>
                <li>**Misuse Prohibited:** Users must not attempt to upload real patient identifiable information or attempt to exploit the platform's simulated security features.</li>
            </ul>
        `;
        
        // --- Shared Components ---
        
        const AppHeader = (activePage) => {
            const isApp = ['dashboard', 'upload', 'detection', 'outcome', 'history', 'help'].includes(activePage);
            
            // Only render the header if we are NOT on the landing/auth pages
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

        // UPDATED FOOTER FUNCTION
        const AppFooter = () => `
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
        
        // --- Utility Functions ---

        function togglePasswordVisibility(id) {
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

        // UPDATED: This function now demonstrates the real Firebase Auth flow start.
        function handleSocialLogin(provider) {
            // --- SIMULATED REDIRECTION FOR THIS SINGLE-FILE EXAMPLE ---
            showToast(`Simulating connection to ${provider} server...`, 'info');
            
            // Simulate delay for redirection
            setTimeout(() => {
                showToast(`Login via ${provider} successful! (Simulated)`, 'success');
                navigate('dashboard');
            }, 1500);
        }

        // --- DYNAMIC FEATURE VIEWER LOGIC (Removed for scroll layout) ---
        // Retained for data structure only
        const features = [
            { id: 'report', title: 'Report Detection & Summarization', subtitle: 'Extracts and synthesizes clinical data', 
              description: 'Leverages NLP models to ingest medical reports (PDF/DICOM), extracting key findings, generating concise summaries, and recommending surgical procedures and checklists with high confidence scores.', 
              img: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVwb3J0JTIwYW5hbHlzaXN8ZW58MHx8MHx8fDA%3D' 
            },
            { id: 'tool', title: 'Real-Time Tool Detection', subtitle: 'Live visual intelligence in the operating room', 
              description: 'Uses cutting-edge computer vision to provide live detection of surgical instruments via a camera feed. It applies bounding boxes, confidence scores, and maintains a real-time event log of tool usage.', 
              img: 'https://images.unsplash.com/photo-1725409796886-850f46d1d0cb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VyZ2ljYWwlMjB0b29sc3xlbnwwfHwwfHx8MA%3D%3D' 
            },
            { id: 'workflow', title: 'Procedural Workflow Analysis', subtitle: 'Mapping efficiency and procedural compliance', 
              description: 'Analyzes recorded sessions to map procedural steps, identify surgical phases, and pinpoint bottlenecks. The final outcome includes a detailed, auditable timeline and procedure validation checks.', 
              img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29ya2Zsb3d8ZW58MHx8MHx8fDA%3D' 
            }
        ];
        
        // --- Page Renderers ---
        
        // Helper function to render a single feature card (for the three-column grid layout)
        const renderFeatureCard = (feature) => {
            return `
                <div class="feature-card bg-surface-white rounded-xl shadow-lg border border-gray-200 p-4" data-aos="fade-up" data-aos-duration="800">
                    <div class="grid-image-container rounded-lg overflow-hidden shadow-md">
                        <img src="${feature.img}" alt="${feature.title}" class="object-cover w-full h-full">
                    </div>
                    <div class="p-2">
                        <h3 class="text-xl font-bold text-primary-blue mb-1">${feature.title}</h3>
                        <p class="text-sm text-gray-700">${feature.description}</p>
                    </div>
                </div>
            `;
        }

        function renderLandingPage() {
             appContainer.innerHTML = `
                <main class="bg-soft-gray-bg">
                    <section class="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden full-screen-hero">
                        <img src="https://images.unsplash.com/photo-1734094546615-045bf5f7ea0e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHN1cmdlcnl8ZW58MHx8MHx8fDA%3D" 
                             alt="Surgical Team Background" 
                             class="absolute inset-0 w-full h-full object-cover">
                        <div class="hero-overlay-dark absolute inset-0"></div>

                        <div class="relative z-10 p-4 max-w-4xl pt-24" data-aos="fade-up" data-aos-duration="1500">
                            <h1 class="text-6xl sm:text-7xl font-extrabold text-white mb-6 tracking-wide hero-text-shadow">
                                Surgi<span class="text-primary-blue">Mind</span>
                            </h1>
                            <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 hero-text-shadow">
                                AI-Powered Surgical Workflow Analysis
                            </h2>
                            <p class="text-lg md:text-xl text-gray-200 mb-8 hero-text-shadow">
                                SurgiMind integrates medical report detection, surgical tool recognition, and procedural workflow analysis to support precision, safety, and efficiency in the operating room.
                            </p>
                            <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                                <a href="#" onclick="navigate('login')" class="px-8 py-3 rounded-lg text-white bg-primary-blue hover:bg-blue-900 font-semibold text-lg btn-start button-3d-hover">
                                    Login
                                </a>
                                <a href="#" onclick="navigate('signup')" class="px-8 py-3 rounded-lg text-primary-blue bg-white border-2 border-primary-blue transition duration-300 font-semibold text-lg btn-demo-hover button-3d-hover">
                                    Sign Up
                                </a>
                            </div>
                        </div>
                    </section>
                    
                    <!-- Integrated Video Analysis Block -->
                    <section id="video-analysis" class="py-16 md:py-24 bg-surface-white">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div data-aos="fade-right">
                                    <p class="text-lg font-semibold text-accent-green uppercase mb-2">SEE IT IN ACTION</p>
                                    <h2 class="text-4xl sm:text-5xl font-extrabold text-text-dark mb-6">
                                        Integrated Video Analysis: Tools and Workflow
                                    </h2>
                                    <p class="text-xl text-gray-700 mb-6 leading-relaxed">
                                        Our powerful AI simultaneously tracks **surgical tools** and identifies the current **procedural phase** in real-time. The visual feedback provides immediate insights for training, quality control, and procedural refinement.
                                    </p>
                                    <ul class="space-y-4 text-gray-600">
                                        <li class="flex items-start">
                                            <span class="text-primary-blue mr-3 flex-shrink-0 text-xl" role="img" aria-label="Line icon">〰️</span>
                                            <span>**Real-time Tool Recognition** with bounding boxes and labels.</span>
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-primary-blue mr-3 flex-shrink-0 text-xl" role="img" aria-label="Clock icon">⏱️</span>
                                            <span>**Automatic Phase Detection** displayed on an interactive timeline.</span>
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-primary-blue mr-3 flex-shrink-0 text-xl" role="img" aria-label="Checklist icon">📋</span>
                                            <span>Identify bottlenecks and areas for **procedural optimization**.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div class="w-full" data-aos="fade-left" data-aos-duration="1500">
                                    <div class="relative pt-[56.25%] overflow-hidden max-w-full rounded-xl shadow-2xl" style="background-color: #111827;">
                                        <!-- Video Demonstration Placeholder -->
                                        <div class="absolute inset-0 flex items-center justify-center text-center text-white p-4">
                                            <div class="p-8 border-4 border-white border-dashed rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                                                <p class="text-xl font-bold">Video Demonstration Placeholder</p>
                                                <p class="text-sm mt-1 text-gray-300">Surgical Video with AI Overlays for Tool & Workflow</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p class="text-center text-sm text-gray-500 mt-4">Simulated analysis view showing real-time tool detection and phase annotation.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <hr class="max-w-7xl mx-auto border-gray-200">

                    <!-- NEW SCROLL-BASED THREE PILLARS SECTION (Grid Layout) -->
                    <section id="detailed-features" class="pt-16 pb-10 md:pt-24 md:pb-16 bg-soft-gray-bg">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 class="text-3xl sm:text-4xl font-extrabold text-text-dark text-center mb-12" data-aos="fade-up">
                                Three Pillars of Surgical Intelligence
                            </h2>
                            
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                                ${renderFeatureCard(features[0])}
                                ${renderFeatureCard(features[1])}
                                ${renderFeatureCard(features[2])}
                            </div>
                        </div>
                    </section>
                    
                    <hr class="max-w-7xl mx-auto border-gray-200">

                    <section id="contact" class="pt-12 pb-16 md:pt-16 md:pb-24 bg-soft-gray-bg text-center" data-aos="fade-up" data-aos-delay="200">
                        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 class="text-3xl sm:text-4xl font-extrabold text-text-dark mb-4">
                                Ready to Transform Your Surgical Workflow?
                            </h2>
                            <p class="text-lg text-gray-600 mb-8">
                                Contact us to learn more about how SurgiMind can benefit your operating room.
                            </p>
                            <a href="#" onclick="navigate('signup')" class="px-8 py-3 rounded-lg text-white bg-primary-blue hover-bg-primary font-semibold text-lg btn-start button-3d-hover">
                                Sign Up Now
                            </a>
                        </div>
                    </section>
                </main>
                ${AppFooter()}
            `;
            // Re-initialize AOS on page load
            AOS.init({ duration: 1000, once: true, easing: 'ease-out-cubic' });
        }
        
        function renderSignupPage() {
             appContainer.innerHTML = `
                <div class="min-h-screen signup-bg flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
                    <!-- ANIMATED LOGO -->
                    <div class="absolute top-6 left-6 text-3xl font-bold text-white cursor-pointer" style="transition: all 0.6s ease-out; z-index: 30;" onclick="navigate('landing')">
                        Surgi<span class="text-primary-blue">Mind</span>
                    </div>
                    
                    <!-- MAIN CONTENT CARD - ADDED FLEX-GROW AND JUSTIFY-CENTER FOR VERTICAL CENTERING -->
                    <div class="flex flex-col justify-center w-full max-w-6xl flex-grow px-4 lg:px-0">
                        <div class="auth-container mx-auto">
                            
                            <!-- PRIVACY PANEL (Left) -->
                            <div id="auth-info-modal-privacy" class="auth-info-panel privacy-panel lg:w-[400px] h-full" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="privacy-title">
                                ${PrivacyContent}
                                <button class="absolute top-4 right-4 text-white/70 hover:text-white" onclick="hideAuthInfo('privacy')">✕</button>
                            </div>

                            <!-- MAIN FORM CARD (Center) -->
                            <div class="glass-auth-card p-8 rounded-xl shadow-2xl relative" role="form" aria-labelledby="signup-title">
                                <h1 id="signup-title" class="sr-only">Surgeon Sign Up Form</h1>
                                
                                <!-- Standard Form -->
                                <form class="space-y-6" onsubmit="event.preventDefault(); handleSignup();">
                                    <div>
                                        <label for="name" class="block text-sm font-medium text-white">Full Name</label>
                                        <input id="name" name="name" type="text" required 
                                               class="mt-1 block w-full rounded-lg p-3 glass-input" 
                                               placeholder="Dr. Jane Doe">
                                    </div>
                                    <div>
                                        <label for="email" class="block text-sm font-medium text-white">Email</label>
                                        <input id="email" name="email" type="email" autocomplete="email" required 
                                               class="mt-1 block w-full rounded-lg p-3 glass-input" 
                                               placeholder="jane.doe@hospital.org">
                                    </div>
                                    <div class="glass-input-container">
                                        <label for="password-signup" class="block text-sm font-medium text-white">Password</label>
                                        <input id="password-signup" name="password" type="password" required
                                               class="mt-1 block w-full rounded-lg p-3 glass-input pr-10" 
                                               placeholder="••••••••">
                                        <button type="button" onclick="togglePasswordVisibility('password-signup')" 
                                                class="absolute inset-y-0 right-0 top-6 px-3 text-white/70 hover:text-white transition" aria-label="Toggle password visibility">
                                            <span id="password-signup-icon">🔒</span>
                                        </button>
                                    </div>
                                    
                                    <!-- Terms Checkbox -->
                                    <div class="flex items-center pt-2">
                                        <input id="agree-terms" type="checkbox" required
                                               class="h-4 w-4 text-accent-green border-gray-300 rounded focus:ring-accent-green">
                                        <label for="agree-terms" class="ml-2 block text-gray-200 text-sm">
                                            I agree to the <a href="#" onclick="event.preventDefault(); showAuthInfo('terms')" class="font-medium text-primary-blue hover:text-blue-300 underline">Terms of Service</a>.
                                        </label>
                                    </div>

                                    <button type="submit" 
                                            class="w-full bg-accent-green text-white py-3 rounded-lg text-lg font-semibold shadow-md 
                                                   button-3d-hover focus:outline-none focus:ring-4 focus:ring-accent-green/50" 
                                            aria-label="Sign Up to SurgiMind">
                                        Create Account
                                    </button>
                                </form>
                                
                                <!-- Social Login Integration -->
                                <div class="mt-6">
                                    <div class="relative flex justify-center items-center py-2">
                                        <div class="absolute inset-y-0 w-full border-t border-gray-400/50"></div>
                                        <span class="relative px-3 text-sm text-gray-200 bg-black/30 rounded-full">Or continue with</span>
                                    </div>

                                    <div class="mt-4 flex space-x-3">
                                        <!-- Google -->
                                        <button type="button" onclick="handleSocialLogin('Google')" 
                                            class="flex-1 p-3 rounded-lg text-white font-semibold glass-social-button transition button-3d-hover focus:outline-none focus:ring-2 focus:ring-white/50"
                                            aria-label="Continue with Google">
                                            <span class="text-xl mr-2 text-red-400">G</span> Google
                                        </button>
                                        <!-- GitHub -->
                                        <button type="button" onclick="handleSocialLogin('GitHub')" 
                                            class="flex-1 p-3 rounded-lg text-white font-semibold glass-social-button transition button-3d-hover focus:outline-none focus:ring-2 focus:ring-white/50"
                                            aria-label="Continue with GitHub">
                                            <span class="text-xl mr-2">🐙</span> GitHub
                                        </button>
                                        <!-- Facebook -->
                                        <button type="button" onclick="handleSocialLogin('Facebook')" 
                                            class="flex-1 p-3 rounded-lg text-white font-semibold glass-social-button transition button-3d-hover focus:outline-none focus:ring-2 focus:ring-white/50"
                                            aria-label="Continue with Facebook">
                                            <span class="text-xl mr-2 text-blue-400">f</span> Facebook
                                        </button>
                                    </div>
                                </div>

                                <p class="mt-6 text-center text-sm text-gray-200">
                                    Already have an account? 
                                    <a href="#" onclick="navigate('login')" class="font-medium text-accent-green hover:text-green-200">
                                        Login Here
                                    </a>
                                </p>
                            </div>
                            <!-- End Main Content Card -->

                            <!-- TERMS PANEL (Right) -->
                            <div id="auth-info-modal-terms" class="auth-info-panel terms-panel lg:w-[400px] h-full" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="terms-title">
                                ${TermsContent}
                                <button class="absolute top-4 right-4 text-white/70 hover:text-white" onclick="hideAuthInfo('terms')">✕</button>
                            </div>
                        </div>
                    </div>
                    <!-- End Main Content Container -->

                    <p class="mt-8 text-center text-xs text-gray-200" role="alert">
                        For authorized surgeons only. All data is encrypted at rest & in transit.
                    </p>
                    
                    <!-- Footer Links (now using dedicated JS handlers) -->
                    <footer class="mt-4 text-center text-xs text-gray-200 w-full">
                        <p class="text-center">
                            <a href="#" class="hover:underline text-white/80 transition" onclick="event.preventDefault(); showAuthInfo('privacy')">Privacy Note</a> | 
                            <a href="#" class="hover:underline text-white/80 transition" onclick="event.preventDefault(); showAuthInfo('terms')">Terms of Service</a>
                        </p>
                    </footer>
                </div>
            `;
        }

        function renderLoginPage() {
            appContainer.innerHTML = `
                <div class="min-h-screen auth-bg flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
                    <!-- ANIMATED LOGO -->
                    <div class="absolute top-6 left-6 text-3xl font-bold text-white cursor-pointer" style="transition: all 0.6s ease-out; z-index: 30;" onclick="navigate('landing')">
                        Surgi<span class="text-primary-blue">Mind</span>
                    </div>
                    
                    <!-- MAIN CONTENT CARD - ADDED FLEX-GROW AND JUSTIFY-CENTER FOR VERTICAL CENTERING -->
                    <div class="flex flex-col justify-center w-full max-w-6xl flex-grow px-4 lg:px-0">
                        <div class="auth-container mx-auto">
                            
                            <!-- PRIVACY PANEL (Left) -->
                            <div id="auth-info-modal-privacy" class="auth-info-panel privacy-panel lg:w-[400px] h-full" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="privacy-title">
                                ${PrivacyContent}
                                <button class="absolute top-4 right-4 text-white/70 hover:text-white" onclick="hideAuthInfo('privacy')">✕</button>
                            </div>

                            <!-- MAIN FORM CARD (Center) -->
                            <div class="glass-auth-card p-8 rounded-xl shadow-2xl relative" role="form" aria-labelledby="login-title">
                                <h1 id="login-title" class="sr-only">Surgeon Login Form</h1>
                                
                                <!-- Standard Form -->
                                <form class="space-y-6" onsubmit="event.preventDefault(); showToast('Login Successful! Redirecting...', 'success'); navigate('dashboard');">
                                    <div>
                                        <label for="email" class="block text-sm font-medium text-white">Email</label>
                                        <input id="email" name="email" type="email" autocomplete="email" required 
                                               class="mt-1 block w-full rounded-lg p-3 glass-input" 
                                               aria-required="true" placeholder="dr.smith@hospital.org">
                                    </div>
                                    <div class="glass-input-container">
                                        <label for="password-login" class="block text-sm font-medium text-white">Password</label>
                                        <input id="password-login" name="password" type="password" autocomplete="current-password" required
                                               class="mt-1 block w-full rounded-lg p-3 glass-input pr-10" 
                                               aria-required="true" placeholder="••••••••">
                                        <button type="button" onclick="togglePasswordVisibility('password-login')" 
                                                class="absolute inset-y-0 right-0 top-6 px-3 text-white/70 hover:text-white transition" aria-label="Toggle password visibility">
                                            <span id="password-login-icon">🔒</span>
                                        </button>
                                    </div>
                                    
                                    <div class="flex items-center justify-between text-sm">
                                        <!-- Removed 2FA toggle -->
                                        <div class="flex items-center">
                                            <input id="remember-me" name="remember-me" type="checkbox" 
                                                   class="h-4 w-4 text-primary-blue border-gray-300 rounded focus:ring-primary-blue">
                                            <label for="remember-me" class="ml-2 block text-gray-200">Remember this device</label>
                                        </div>
                                    </div>

                                    <button type="submit" 
                                            class="w-full bg-primary-blue text-white py-3 rounded-lg text-lg font-semibold shadow-md 
                                                   button-3d-hover focus:outline-none focus:ring-4 focus:ring-primary-blue/50" 
                                            aria-label="Sign In to SurgiMind">
                                        Sign In
                                    </button>
                                </form>

                                <!-- Social Login Integration -->
                                <div class="mt-6">
                                    <div class="relative flex justify-center items-center py-2">
                                        <div class="absolute inset-y-0 w-full border-t border-gray-400/50"></div>
                                        <span class="relative px-3 text-sm text-gray-200 bg-black/30 rounded-full">Or continue with</span>
                                    </div>

                                    <div class="mt-4 flex space-x-3">
                                        <!-- Google -->
                                        <button type="button" onclick="handleSocialLogin('Google')" 
                                            class="flex-1 p-3 rounded-lg text-white font-semibold glass-social-button transition button-3d-hover focus:outline-none focus:ring-2 focus:ring-white/50"
                                            aria-label="Continue with Google">
                                            <span class="text-xl mr-2 text-red-400">G</span> Google
                                        </button>
                                        <!-- GitHub -->
                                        <button type="button" onclick="handleSocialLogin('GitHub')" 
                                            class="flex-1 p-3 rounded-lg text-white font-semibold glass-social-button transition button-3d-hover focus:outline-none focus:ring-2 focus:ring-white/50"
                                            aria-label="Continue with GitHub">
                                            <span class="text-xl mr-2">🐙</span> GitHub
                                        </button>
                                        <!-- Facebook -->
                                        <button type="button" onclick="handleSocialLogin('Facebook')" 
                                            class="flex-1 p-3 rounded-lg text-white font-semibold glass-social-button transition button-3d-hover focus:outline-none focus:ring-2 focus:ring-white/50"
                                            aria-label="Continue with Facebook">
                                            <span class="text-xl mr-2 text-blue-400">f</span> Facebook
                                        </button>
                                    </div>
                                </div>

                                <p class="mt-6 text-center text-sm text-gray-200">
                                    Need an account? 
                                    <a href="#" onclick="navigate('signup')" class="font-medium text-accent-green hover:text-green-200">
                                        Sign Up Here
                                    </a>
                                </p>
                            </div>
                            <!-- End Main Content Card -->

                            <!-- TERMS PANEL (Right) -->
                            <div id="auth-info-modal-terms" class="auth-info-panel terms-panel lg:w-[400px] h-full" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="terms-title">
                                ${TermsContent}
                                <button class="absolute top-4 right-4 text-white/70 hover:text-white" onclick="hideAuthInfo('terms')">✕</button>
                            </div>
                        </div>
                    </div>
                    <!-- End Main Content Container -->
                    
                    <p class="mt-8 text-center text-xs text-gray-200" role="alert">
                        For authorized surgeons only. All data is encrypted at rest & in transit.
                    </p>
                    
                    <!-- Footer Links (now using dedicated JS handlers) -->
                    <footer class="mt-4 text-center text-xs text-gray-200 w-full">
                        <p class="text-center">
                            <a href="#" class="hover:underline text-white/80 transition" onclick="event.preventDefault(); showAuthInfo('privacy')">Privacy Note</a> | 
                            <a href="#" class="hover:underline text-white/80 transition" onclick="event.preventDefault(); showAuthInfo('terms')">Terms of Service</a>
                        </p>
                    </footer>
                </div>
            `;
        }

        function renderDashboardPage() {
            appContainer.innerHTML = `
                ${AppHeader('dashboard')}
                <main class="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                    <!-- Hero Band -->
                    <div class="mb-10 p-8 bg-surface-white rounded-xl shadow-lg border-l-4 border-primary-blue">
                        <h1 class="text-4xl font-bold text-text-dark mb-1">Welcome back, Dr. Smith</h1>
                        <p class="text-lg text-gray-600 mb-6">Start a new analysis or continue previous cases.</p>
                        
                        <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                            <!-- Primary CTA -->
                            <button onclick="navigate('upload')" class="w-full sm:w-auto bg-primary-blue text-white rounded-lg px-6 py-3 text-lg font-semibold shadow-md button-3d-hover">
                                Upload Patient Report
                            </button>
                            <!-- Secondary CTA -->
                            <button onclick="navigate('detection')" class="w-full sm:w-auto bg-white border border-primary-blue text-primary-blue rounded-lg px-6 py-3 text-lg font-semibold hover:bg-gray-50 transition duration-300 ease-cubic-bezier">
                                Start Tool Detection (Live)
                            </button>
                            <!-- Status Pill -->
                            <span class="text-xs bg-accent-green text-white px-3 py-1 rounded-full font-medium ml-4 mt-3 sm:mt-0">
                                Live model v2.2 — last trained: 2025-10-01
                            </span>
                        </div>
                    </div>

                    <!-- Main Grid Layout -->
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <!-- Left Column (2/3): Recent Cases -->
                        <div class="lg:col-span-2 space-y-4">
                            <h2 class="text-2xl font-semibold text-text-dark">Recent Cases</h2>
                            
                            <!-- Case Card Example 1: Full Processed -->
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
                             <!-- Case Card Example 2: Report Only -->
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

                        <!-- Right Column (1/3): Metrics & Notifications -->
                        <div class="space-y-8">
                            <!-- Quick Metrics -->
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

                            <!-- Notifications -->
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
        
        // State for Upload Flow: 1=Initial, 2=Processing, 3=Results
        let uploadState = 1;
        // Simulation variables for dynamic content
        let simulatedProcedure = Math.random() < 0.5 ? 'Heart Surgery' : 'Cholecystectomy';

        function getReportAnalysis(procedure) {
            if (procedure === 'Heart Surgery') {
                return {
                    summary: "This report details a high-risk Coronary Artery Bypass Graft (CABG) procedure due to multi-vessel disease. Key findings include severe stenosis in the LAD and L-CX arteries. The suggested tools reflect the complexity and precision required for vascular suturing and clamping.",
                    findings: [
                        "Severe stenosis (85%) in Left Anterior Descending (LAD) artery.",
                        "Left Ventricular Ejection Fraction (LVEF) is 45%.",
                        "Patient has a history of controlled hypertension, but no prior cardiac events.",
                    ],
                    tools: [
                        { name: "Rib Spreader (Finochietto)", icon: "🦴", type: "Required" },
                        { name: "Coronary Scissor (Potts-Smith)", icon: "✂️", type: "Required" },
                        { name: "Vascular Clamps (Bulldog)", icon: "📎", type: "Required" },
                        { name: "Sutures (6-0 Prolene)", icon: "🧵", type: "Required" },
                        { name: "DeBakey Forceps", icon: "🥢", type: "Optional" },
                    ]
                };
            } else {
                return {
                    summary: "Patient reports indicate a complex Cholecystitis case requiring a planned laparoscopic Cholecystectomy. Key concerns include significant inflammation and potential minor biliary duct involvement, requiring meticulous dissection.",
                    findings: [
                        "Elevated WBC count (14.5 K/μL) consistent with acute inflammation.",
                        "Ultrasound confirms gall bladder wall thickening (>5mm).",
                        "No evidence of common bile duct (CBD) stone obstruction on MRI.",
                    ],
                    tools: [
                        { name: "Scalpel (#10)", icon: "🔪", type: "Required" },
                        { name: "Laparoscopic Graspers", icon: "🍴", type: "Required" },
                        { name: "Harmonic Scalpel", icon: "⚡", type: "Required" },
                        { name: "Sutures (3-0 Vicryl)", icon: "🪡", type: "Optional" },
                        { name: "Trocar/Cannula Set", icon: "⚙️", type: "Required" },
                    ]
                };
            }
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

        function renderUploadPage() {
            const analysis = getReportAnalysis(simulatedProcedure);
            
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
                                    <!-- Looping, buttery-smooth progress animation -->
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

                                <!-- Progress Bar -->
                                <div class="w-full bg-gray-200 rounded-full h-3 my-4">
                                    <div id="progress-bar" class="bg-accent-green h-3 rounded-full transition-all duration-1000" style="width: 10%"></div>
                                </div>
                                <p id="progress-percent" class="text-sm font-semibold text-text-dark mb-4">10% Complete - ETA: 50s</p>

                                <!-- Log Lines -->
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
                            <!-- Case Header -->
                            <div class="bg-white p-4 rounded-xl border-l-4 border-accent-green shadow-md">
                                <h3 class="text-xl font-bold text-text-dark">Case ID: C-7024 - Analysis Complete</h3>
                                <p class="text-sm text-gray-500">Patient Alias: M. King | Uploaded: Oct 2, 2025 | Surgeon: D. Smith</p>
                            </div>

                            <!-- Structured Analysis Tabs -->
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
                            
                            <!-- Actions -->
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
                        <!-- Left (60%): Upload Area & Results -->
                        <div class="lg:w-3/5">
                            ${processingContent(uploadState)}
                        </div>

                        <!-- Right (40%): Live Processing Panel + Checklist -->
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
        
        // Processing Simulation
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
            simulatedProcedure = Math.random() < 0.5 ? 'Heart Surgery' : 'Cholecystectomy';
            uploadState = 2;
            renderUploadPage();
            
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
                    uploadState = 3;
                    renderUploadPage();
                    showToast('Analysis complete. Results ready!', 'success');
                }
            }, 500); // Faster simulation for testing (0.5s intervals)
        }

        function stopProcessing() {
            clearInterval(processingInterval);
            uploadState = 1;
            renderUploadPage();
            showToast('Analysis cancelled by user.', 'error');
        }

        // --- CAMERA ACCESS FUNCTION ---
        function startLiveCamera() {
            const video = document.getElementById('liveCameraFeed');
            const placeholder = document.getElementById('camera-placeholder');
            
            if (!video || !placeholder) return;

            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                // Hide placeholder
                placeholder.classList.add('hidden');
                video.classList.remove('hidden');
                
                navigator.mediaDevices.getUserMedia({ 
                        video: { facingMode: "environment" }
                    })
                    .then(stream => {
                        video.srcObject = stream;
                        video.onloadedmetadata = () => {
                            video.play();
                            showToast('Live camera started successfully.', 'success');
                        };
                    })
                    .catch(error => {
                        console.error("Camera access denied or failed: ", error);
                        // Show permission denied message in placeholder area
                        placeholder.classList.remove('hidden');
                        video.classList.add('hidden');
                        placeholder.innerHTML = '<div class="text-center text-white"><div class="text-4xl mb-4">🚫</div>Camera access denied. Please allow permissions to start detection.</div>';
                        showToast('Camera access denied or failed. Using placeholder.', 'error');
                    });
            } else {
                 placeholder.innerHTML = '<div class="text-center text-white"><div class="text-4xl mb-4">❌</div>getUserMedia not supported in this browser.</div>';
                 showToast('getUserMedia not supported in this browser.', 'error');
            }
        }
        
        function stopLiveCamera() {
            const video = document.getElementById('liveCameraFeed');
            if (video && video.srcObject) {
                video.srcObject.getTracks().forEach(track => track.stop());
                video.srcObject = null;
                // Reset recording state
                isRecording = false;
                clearInterval(detectionInterval);
                seconds = 0;
            }
        }

        function renderDetectionPage() {
            // Live simulation setup
            const toolDetections = [
                { id: 1, name: "Scalpel", x: 10, y: 50, w: 20, h: 15, conf: 0.98, color: 'border-red-500' },
                { id: 2, name: "Retractor", x: 65, y: 70, w: 25, h: 20, conf: 0.92, color: 'border-primary-blue' },
                { id: 3, name: "Sponge", x: 25, y: 80, w: 10, h: 5, conf: 0.85, color: 'border-yellow-500' }
            ];
            
            // Generate tool bounding box divs
            const bboxHtml = toolDetections.map(tool => `
                <div class="bbox ${tool.color} bg-opacity-10" 
                     style="left: ${tool.x}%; top: ${tool.y}%; width: ${tool.w}%; height: ${tool.h}%;"
                     title="Confidence: ${tool.conf*100}%"
                     onclick="showToast('Tool Info: ${tool.name} (${Math.round(tool.conf*100)}%) clicked.', 'info')">
                    <span class="absolute -top-6 left-0 bg-primary-blue text-white text-xs font-medium px-2 py-0.5 rounded-tr-lg rounded-tl-lg">${tool.name} ${Math.round(tool.conf*100)}%</span>
                </div>
            `).join('');

            appContainer.innerHTML = `
                ${AppHeader('detection')}
                <main class="h-[calc(100vh-64px)] overflow-hidden">
                    <div class="flex h-full detection-layout">
                        <!-- Left (2/3): Live Camera Feed Area -->
                        <div class="camera-feed-area lg:w-2/3 h-full bg-gray-900 relative">
                            <h2 class="sr-only">Live Surgical Tool Detection Feed</h2>
                            
                            <!-- Video Feed Element (Hidden initially) -->
                            <video id="liveCameraFeed" autoplay muted playsinline class="h-full w-full object-cover hidden"></video>

                            <!-- Placeholder/Loading State -->
                            <div id="camera-placeholder" class="h-full w-full flex items-center justify-center bg-gray-800 text-white text-xl">
                                <div class="text-center">
                                    <svg class="animate-spin h-10 w-10 text-white mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Awaiting Camera Permissions...
                                </div>
                            </div>

                            <!-- Bounding Box Overlays -->
                            <div id="bbox-container" class="absolute inset-0 pointer-events-none">
                                ${bboxHtml}
                            </div>
                            
                            <!-- Floating Controls -->
                            <div class="absolute top-4 left-4 flex items-center space-x-3">
                                <span class="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">LIVE</span>
                                <span class="text-white text-xs bg-gray-900/50 p-1 rounded-md">FPS: 30 | Latency: 42ms</span>
                            </div>
                            
                            <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                                <button class="p-3 bg-gray-700/80 hover:bg-gray-600 rounded-full text-white shadow-lg transition" title="Switch Camera">🔄</button>
                                <button class="p-3 bg-gray-700/80 hover:bg-gray-600 rounded-full text-white shadow-lg transition" title="Toggle HUD Overlays" onclick="toggleHud()">👁️</button>
                                <button class="p-3 bg-gray-700/80 hover:bg-gray-600 rounded-full text-white shadow-lg transition" title="Detection Mode">⚙️</button>
                            </div>
                            
                            <!-- Edge Case Warning -->
                            <div id="light-warning" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-yellow-500 text-text-dark rounded-lg shadow-xl font-semibold opacity-0 transition duration-300">
                                ⚠️ Lighting insufficient — increase OR lighting (Gain Suggestion: +3.0dB)
                            </div>
                        </div>

                        <!-- Right (1/3): Controls + Live Analysis + Event Log -->
                        <div class="analysis-panel lg:w-1/3 h-full bg-surface-white flex flex-col p-6 space-y-6">
                            
                            <!-- Controls Bar -->
                            <div class="flex space-x-4">
                                <button id="record-btn" onclick="toggleRecording()" class="flex-1 bg-red-600 text-white py-3 rounded-lg text-lg font-semibold shadow-xl hover:bg-red-700 transition duration-300 button-3d-hover">
                                    Start Recording 🔴
                                </button>
                                <button id="pause-btn" disabled onclick="toggleRecording()" class="bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold">⏸️ Pause</button>
                                <button id="stop-btn" disabled onclick="showStopModal()" class="bg-primary-blue text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-900 transition button-3d-hover">⏹️ Stop</button>
                            </div>
                            <p id="recording-duration" class="text-center text-sm text-gray-600">
                                Position camera to include patient field and instruments. Press ‘Start Recording’ when ready.
                            </p>
                            <!-- Live Summary Box -->
                            <div class="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <h3 class="text-lg font-semibold text-text-dark mb-2">Live Analysis Summary</h3>
                                <p id="live-summary" class="text-gray-700 text-sm">
                                    Detected: **Scalpel** (12s), **Retractor** (5s); Suggesting Step: **Incision**; Confidence: <span class="text-accent-green font-bold">95%</span>.
                                </p>
                            </div>
                            
                            <!-- Event Log -->
                            <div class="flex-1 overflow-y-auto border border-gray-200 rounded-xl p-4 bg-gray-50">
                                <h3 class="text-lg font-semibold text-text-dark mb-2 sticky top-0 bg-gray-50 pb-2">Event Log</h3>
                                <div id="event-log" class="text-xs text-gray-700 space-y-1">
                                    <!-- Log lines will be prepended here -->
                                    <p>[00:00:01] System: Live stream initialized.</p>
                                    <p>[00:00:03] Detection: Scalpel (98%) detected.</p>
                                    <p>[00:00:15] Detection: Retractor (92%) detected.</p>
                                    <p>[00:00:30] Warning: Low light detected. Adjusting exposure.</p>
                                </div>
                            </div>
                            
                            <!-- Discard Button (Hidden when recording is active) -->
                            <button onclick="stopLiveCamera(); navigate('dashboard'); showToast('Recording discarded.', 'error')" id="discard-btn" class="text-sm text-red-600 hover:text-red-800 transition">
                                Cancel & Discard
                            </button>
                        </div>
                    </div>
                </main>
                ${Modal()}
                ${AppFooter()}
            `;
            // Call the camera function immediately after the DOM is ready
            setTimeout(startLiveCamera, 100); 
        }

        // Helper to toggle bounding box visibility
        function toggleHud() {
            const bboxContainer = document.getElementById('bbox-container');
            if (bboxContainer) {
                bboxContainer.classList.toggle('hidden');
                showToast(bboxContainer.classList.contains('hidden') ? 'HUD Hidden' : 'HUD Visible', 'info');
            }
        }

        // --- Recording Logic ---
        let isRecording = false;
        let detectionInterval;
        let lowLightTimeout;
        let seconds = 0;

        function toggleRecording() {
            isRecording = !isRecording;
            const recordBtn = document.getElementById('record-btn');
            const pauseBtn = document.getElementById('pause-btn');
            const stopBtn = document.getElementById('stop-btn');
            const discardBtn = document.getElementById('discard-btn');
            const durationEl = document.getElementById('recording-duration');
            
            if (isRecording) {
                // START or RESUME
                recordBtn.innerHTML = 'Recording...';
                recordBtn.classList.replace('bg-red-600', 'bg-gray-500');
                recordBtn.disabled = true;

                pauseBtn.disabled = false;
                pauseBtn.innerHTML = '⏸️ Pause';
                pauseBtn.classList.replace('bg-gray-400', 'bg-yellow-500');
                
                stopBtn.disabled = false;
                discardBtn.classList.add('hidden'); // Hide discard button when recording is active
                
                if (seconds === 0) {
                    durationEl.innerHTML = 'REC: 00:00';
                }

                detectionInterval = setInterval(() => {
                    seconds++;
                    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
                    const secs = String(seconds % 60).padStart(2, '0');
                    durationEl.innerHTML = `<span class="font-bold text-red-600">REC: ${minutes}:${secs}</span>`;
                    
                    if (seconds % 15 === 0) {
                        const eventLog = document.getElementById('event-log');
                        const newEntry = document.createElement('p');
                        newEntry.innerHTML = `[${minutes}:${secs}] Detection: Instrument Change detected.`;
                        eventLog.prepend(newEntry);
                    }
                }, 1000);
                
            } else {
                // PAUSE
                clearInterval(detectionInterval);
                recordBtn.innerHTML = 'Resume Recording 🔴';
                recordBtn.classList.replace('bg-gray-500', 'bg-red-600');
                recordBtn.disabled = false;

                pauseBtn.innerHTML = 'PAUSED';
                discardBtn.classList.remove('hidden'); // Show discard button when paused
            }
        }
        
        function showStopModal() {
            clearInterval(detectionInterval);
            
            const modal = document.getElementById('app-modal');
            modal.innerHTML = `
                <div class="bg-surface-white p-8 rounded-xl shadow-2xl max-w-lg w-full">
                    <h3 class="text-xl font-bold text-text-dark mb-4">Process Recorded Clip?</h3>
                    <p class="text-gray-700 mb-6">Recording duration: ${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}. Confirm to analyze and summarize the video clip.</p>
                    <div class="flex justify-end space-x-3">
                        <button onclick="closeModal(); toggleRecording();" class="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition">Cancel</button>
                        <button onclick="simulateVideoProcessing()" class="bg-primary-blue text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-900 transition">Process & Save</button>
                    </div>
                </div>
            `;
            modal.classList.remove('hidden');
        }
        
        function simulateVideoProcessing() {
            closeModal();
            // Stop camera and navigation streams
            stopLiveCamera(); 
            
            showToast('Processing recorded clip... Redirecting to Final Outcome.', 'info');
            
            // Re-render outcome with the latest simulated procedure
            simulatedProcedure = 'Aortic Valve Replacement'; 

            setTimeout(() => {
                navigate('outcome');
            }, 2000);
        }


        function renderOutcomePage() {
            // Static content for the outcome page since the detailed outcome is complex
            const analysis = getReportAnalysis('Heart Surgery'); // Use heart surgery for the outcome page
            
            appContainer.innerHTML = `
                ${AppHeader('outcome')}
                <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <h1 class="text-4xl font-bold text-text-dark mb-2">Final Outcome: Case C-7023 (CABG)</h1>
                    <p class="text-sm text-gray-500 mb-6">Patient: J. Doe | Date: 2025-09-27 | Surgeon: Dr. Smith</p>
                    
                    <!-- Action Bar -->
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

                    <!-- Video Playback Section -->
                    <div class="bg-gray-900 rounded-xl overflow-hidden mb-8 shadow-xl">
                        <div class="w-full aspect-video flex items-center justify-center text-white text-3xl relative">
                            Video Playback Placeholder (4:20 duration)
                            <!-- Timeline Markers Simulation -->
                            <div class="absolute bottom-0 h-2 w-full bg-gray-700">
                                <div class="absolute h-3 w-1 bg-red-500 rounded-full cursor-pointer transition hover:scale-150" title="Warning: Tool Conflict"></div>
                                <div class="absolute h-3 w-1 bg-primary-blue rounded-full cursor-pointer transition hover:scale-150" style="left: 40%" title="Event: Incision Start"></div>
                                <div class="absolute h-3 w-1 bg-accent-green rounded-full cursor-pointer transition hover:scale-150" style="left: 85%" title="Event: Closure Started"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Summaries & Analysis (Two-Column Desktop) -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        <!-- Left: Report Analysis -->
                        <div class="bg-surface-white p-6 rounded-xl shadow-lg border-t-4 border-primary-blue">
                            <h3 class="text-2xl font-semibold text-text-dark mb-4">Report Analysis Summary</h3>
                            <p class="text-sm text-gray-500 mb-4">Model v2.2 | Confidence: 96%</p>
                            
                            <div class="space-y-4">
                                <!-- Overview -->
                                <details class="border-b pb-2 open:pb-4" open>
                                    <summary class="font-bold cursor-pointer text-lg text-text-dark hover:text-primary-blue transition">Report Summary (CABG)</summary>
                                    <p class="text-gray-700 leading-relaxed mt-3 text-sm">${analysis.summary}</p>
                                    <p class="text-sm mt-2 font-semibold text-accent-green">Suggested Tool Set: Vascular/Bypass Tools (See Checklist)</p>
                                </details>

                                <!-- NEW: Workflow Flowchart Simulation -->
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
                                <!-- END NEW Flowchart -->

                                <div class="pt-4">
                                    <h4 class="font-bold text-lg text-text-dark mb-2">Surgeon Validation</h4>
                                    <div class="flex items-center space-x-2 text-sm">
                                        <input type="checkbox" id="validation" checked class="h-4 w-4 text-accent-green border-gray-300 rounded focus:ring-accent-green">
                                        <label for="validation" class="text-gray-700">I confirm the predicted procedure and key findings are accurate.</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Right: Video Summary & Transcript -->
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
                            
                            <!-- Security and Audit -->
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

        function renderHistoryPage() {
            appContainer.innerHTML = `
                ${AppHeader('history')}
                <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <h1 class="text-4xl font-bold text-text-dark mb-6">Profile & Case History</h1>
                    
                    <!-- Search and Filters -->
                    <div class="bg-surface-white p-6 rounded-xl shadow-lg mb-8 flex flex-col md:flex-row gap-4">
                        <input type="text" placeholder="Search by Patient ID or Alias (e.g., P-00451)" 
                               class="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-primary-blue focus:border-primary-blue" aria-label="Search Patient Cases">
                        <select class="border border-gray-300 rounded-lg p-3">
                            <option>Filter by Status</option>
                            <option>Completed</option>
                            <option>Pending Video</option>
                        </select>
                        <button class="bg-primary-blue text-white rounded-lg px-6 py-3 font-semibold button-3d-hover hover:scale-[1.03] transition">
                            Export Filtered Cases
                        </button>
                    </div>

                    <!-- Case List -->
                    <div class="space-y-4">
                        <h2 class="text-2xl font-semibold text-text-dark">All Cases (25 Total)</h2>

                        <!-- Case Card 1 (Completed) -->
                        <div class="bg-surface-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer flex justify-between items-center" onclick="navigate('outcome')">
                            <div>
                                <h3 class="text-xl font-bold text-primary-blue">Case C-7023 (Aortic Valve Replacement)</h3>
                                <p class="text-sm text-gray-500 mt-1">Patient Alias: J. Doe | Date: 2025-09-27 | Status: <span class="text-accent-green font-semibold">Completed</span></p>
                            </div>
                            <div class="text-right">
                                <p class="text-xs text-gray-500">Audit Logs: 3 views</p>
                                <button class="text-sm text-primary-blue font-medium hover:underline mt-1" onclick="navigate('outcome')">View Outcome</button>
                            </div>
                        </div>

                        <!-- Case Card 2 (Pending Video) -->
                        <div class="bg-surface-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer flex justify-between items-center" onclick="navigate('upload')">
                            <div>
                                <h3 class="text-xl font-bold text-text-dark">Case C-7024 (Cholecystectomy)</h3>
                                <p class="text-sm text-gray-500 mt-1">Patient Alias: M. King | Date: 2025-10-02 | Status: <span class="text-red-600 font-semibold">Pending Detection</span></p>
                            </div>
                            <div class="text-right">
                                <p class="text-xs text-gray-500">Last Action: Report Analyzed</p>
                                <button class="text-sm text-primary-blue font-medium hover:underline mt-1" onclick="navigate('upload')">Continue Flow</button>
                            </div>
                        </div>
                    </div>
                </main>
                ${AppFooter()}
            `;
        }

        function renderHelpPage() {
             appContainer.innerHTML = `
                ${AppHeader('help')}
                <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <!-- About Page Content (Integrated) -->
                    <div class="min-h-screen p-4 sm:p-8 md:p-12 lg:p-16 max-w-7xl mx-auto">
                        <header class="text-center mb-12">
                            <h1 class="text-5xl md:text-7xl font-extrabold text-[#1f2937] mb-2 tracking-tight">
                                About <span class="text-primary-blue">SurgiMind</span>
                            </h1>
                            <p class="text-xl text-gray-600 mb-8">AI-Powered Surgical Workflow Analysis</p>

                            <div class="bg-glass border border-red-400 text-red-800 p-4 rounded-lg max-w-2xl mx-auto" role="alert">
                                <p class="font-bold">⚠️ Research Disclaimer</p>
                                <p class="text-sm mt-1">SurgiMind is an academic research and educational project. It is **not** approved or intended for clinical use.</p>
                            </div>
                        </header>

                        <section class="bg-glass p-6 md:p-10 rounded-xl mb-12 border-l-8 border-primary-blue animate-pulse-border">
                            <h2 class="text-3xl font-bold text-[#1f2937] mb-4">Precision Intelligence in the Operating Room</h2>
                            <p class="text-lg text-gray-700 leading-relaxed">
                                SurgiMind is an advanced research system designed to integrate medical report detection, surgical tool recognition, and procedural workflow analysis. Our mission is to prototype the future of surgical support by delivering **real-time, actionable insights** that enhance precision, safety, and efficiency during complex operations.
                            </p>
                        </section>

                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

                            <!-- Use Cases -->
                            <section class="bg-glass p-6 rounded-xl">
                                <h2 class="text-2xl font-bold text-[#1f2937] mb-4 flex items-center border-b border-gray-200 pb-2">
                                    <span class="text-accent-green mr-2">&rsaquo;&rsaquo;</span>
                                    Impactful Use Cases
                                
                                </h2>
                                <ul class="space-y-3 text-gray-700">
                                    <li class="flex items-start">
                                        <span class="text-primary-blue font-bold mr-2">&bull;</span>
                                        <p><strong>Real-Time Support:</strong> Provides instantaneous, objective feedback to the surgical team.</p>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="text-primary-blue font-bold mr-2">&bull;</span>
                                        <p><strong>Training Enhancement:</strong> Offers automated, data-driven assessment for surgical residents.</p>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="text-primary-blue font-bold mr-2">&bull;</span>
                                        <p><strong>Patient Safety:</strong> Workflow monitoring aids in identifying and flagging potential procedural deviations.</p>
                                    </li>
                                </ul>
                            </section>

                            <!-- Tech Stack -->
                            <section class="bg-glass p-6 rounded-xl">
                                <h2 class="text-2xl font-bold text-[#1f2937] mb-4 flex items-center border-b border-gray-200 pb-2">
                                    <span class="text-primary-blue mr-2">&rsaquo;&rsaquo;</span>
                                    Core Technology Stack
                                </h2>
                                <div class="space-y-2 text-gray-700">
                                    <p class="font-semibold text-[#1f2937]">AI / ML Engines:</p>
                                    <p class="ml-4">PyTorch, YOLOv8, LSTM/GRU</p>
                                    <p class="font-semibold text-[#1f2937]">Computer Vision:</p>
                                    <p class="ml-4">OpenCV</p>
                                    <p class="font-semibold text-[#1f2937]">Backend & Frontend:</p>
                                    <p class="ml-4">Flask / FastAPI, Streamlit or React.js</p>
                                </div>
                            </section>
                        </div>
                        
                        <!-- Contributors -->
                        <section class="mb-12 pt-8">
                            <h2 class="text-3xl font-bold text-[#1f2937] text-center mb-8">Team & Contributors</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                
                                <div class="bg-glass p-6 rounded-xl text-center">
                                    <img src="https://placehold.co/70x70/E0F2F1/1E40AF?text=MR" class="w-16 h-16 rounded-full object-cover mx-auto mb-3">
                                    <p class="font-bold text-text-dark">MOHD RAYYAN BIN MOHD JAWEED</p>
                                    <span class="text-xs text-gray-600">B.Tech Student, JNTUH | AI/ML Enthusiast</span>
                                    <div class="flex justify-center space-x-3 mt-2">
                                        <a href="#" target="_blank" class="text-primary-blue hover:text-accent-green transition duration-150">L</a>
                                        <a href="#" target="_blank" class="text-primary-blue hover:text-accent-green transition duration-150">G</a>
                                    </div>
                                </div>
                                <div class="bg-glass p-6 rounded-xl text-center">
                                    <img src="https://placehold.co/70x70/E0F2F1/1E40AF?text=SA" class="w-16 h-16 rounded-full object-cover mx-auto mb-3">
                                    <p class="font-bold text-text-dark">SYED SAAD AHMED</p>
                                    <span class="text-xs text-gray-600">B.Tech Student, JNTUH | AI/ML Enthusiast</span>
                                    <div class="flex justify-center space-x-3 mt-2">
                                        <a href="#" target="_blank" class="text-primary-blue hover:text-accent-green transition duration-150">L</a>
                                        <a href="#" target="_blank" class="text-primary-blue hover:text-accent-green transition duration-150">G</a>
                                    </div>
                                </div>
                                <div class="bg-glass p-6 rounded-xl text-center">
                                    <img src="https://placehold.co/70x70/E0F2F1/1E40AF?text=MS" class="w-16 h-16 rounded-full object-cover mx-auto mb-3">
                                    <p class="font-bold text-text-dark">MOHAMMED SOFIYAAN</p>
                                    <span class="text-xs text-gray-600">B.Tech Student, JNTUH | AI/ML Enthusiast</span>
                                    <div class="flex justify-center space-x-3 mt-2">
                                        <a href="#" target="_blank" class="text-primary-blue hover:text-accent-green transition duration-150">L</a>
                                        <a href="#" target="_blank" class="text-primary-blue hover:text-accent-green transition duration-150">G</a>
                                    </div>
                                </div>

                            </div>
                        </section>
                    </div>
                </main>
                ${AppFooter()}
            `;
        }


        // --- Core Navigation and Utility ---

        function navigate(page) {
            // Stop camera if leaving detection page
            if (currentPage === 'detection') {
                stopLiveCamera();
            }

            // playSound('page'); // REMOVED
            currentPage = page;
            document.getElementById('app-container').classList.add('opacity-0', 'transition-opacity', 'duration-600');
            
            setTimeout(() => {
                // Hide any visible auth info panels before navigating
                hideAuthInfo('privacy', 0); 
                hideAuthInfo('terms', 0);

                switch (page) {
                    case 'landing':
                        renderLandingPage();
                        break;
                    case 'signup':
                        renderSignupPage();
                        break;
                    case 'login':
                        renderLoginPage();
                        break;
                    case 'dashboard':
                        renderDashboardPage();
                        break;
                    case 'upload':
                        renderUploadPage();
                        break;
                    case 'detection':
                        renderDetectionPage();
                        break;
                    case 'outcome':
                        renderOutcomePage();
                        break;
                    case 'history':
                        renderHistoryPage();
                        break;
                    case 'help':
                        renderHelpPage();
                        break;
                    default:
                        renderLandingPage();
                }
                document.getElementById('app-container').classList.remove('opacity-0');
            }, 60); // Small delay to trigger the fade out/in effect
        }

        
        // --- Modal/Disclaimer Functions ---
        
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

        function hideDisclaimerModal() {
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
        
        // --- AUTH INFO PANEL LOGIC ---
        function showAuthInfo(type) {
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
                targetPanel.focus(); // Optional: focus for accessibility
            }
        }

        function hideAuthInfo(type, duration = 500) {
            const targetPanel = document.getElementById(`auth-info-modal-${type}`);
            if (targetPanel) {
                // If duration is 0, hide instantly (used during navigation)
                if (duration === 0) {
                    targetPanel.style.transition = 'none';
                    targetPanel.classList.remove('visible');
                    setTimeout(() => targetPanel.style.transition = '', 50); // Restore transition
                } else {
                    targetPanel.classList.remove('visible');
                }
            }
        }

        // Handle Sign Up Form Submission with Checkbox validation
        function handleSignup() {
            const agreeCheckbox = document.getElementById('agree-terms');
            if (!agreeCheckbox.checked) {
                showToast('Please agree to the Terms of Service to continue.', 'error');
                return;
            }
            showToast('Account Created! Redirecting...', 'success');
            navigate('dashboard');
        }

        const Modal = () => `
            <div id="app-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex items-center justify-center transition-opacity duration-300" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <!-- Modal Content injected by JS -->
            </div>
        `;
        function closeModal() {
            document.getElementById('app-modal').classList.add('hidden');
        }
        
        // --- Toast System Component ---
        const Toast = () => `
            <div id="toast-container" class="fixed bottom-4 right-4 z-[100] space-y-3">
                <!-- Toasts will be appended here -->
            </div>
        `;
        
        function showToast(message, type = 'info') {
            let toastContainer = document.getElementById('toast-container');
            if (!toastContainer) {
                appContainer.insertAdjacentHTML('afterbegin', Toast());
                toastContainer = document.getElementById('toast-container');
            }
            
            let colorClass, icon;
            if (type === 'success') {
                colorClass = 'bg-accent-green border-accent-green';
                icon = '✅';
                // playSound('success'); // REMOVED
            } else if (type === 'error') {
                colorClass = 'bg-red-600 border-red-600';
                icon = '❌';
                // playSound('error'); // REMOVED
            } else {
                colorClass = 'bg-primary-blue border-primary-blue';
                icon = 'ℹ️';
                // playSound('click'); // REMOVED
            }
            
            const toast = document.createElement('div');
            toast.className = `p-4 rounded-lg shadow-xl text-white font-medium border-l-4 ${colorClass} transition-all duration-300 ease-in-out transform translate-x-full opacity-0`;
            toast.innerHTML = `${icon} ${message}`;
            
            toastContainer.appendChild(toast);
            
            // Animate in
            setTimeout(() => {
                toast.classList.remove('translate-x-full', 'opacity-0');
                toast.classList.add('translate-x-0', 'opacity-100');
            }, 10);
            
            // Animate out and remove after 3s
            setTimeout(() => {
                toast.classList.add('translate-x-full', 'opacity-0');
                toast.addEventListener('transitionend', () => toast.remove());
            }, 3000);
        }

        // --- Init and Ripple ---
        
        function initApp() {
            AOS.init({ duration: 1000, once: true, easing: 'ease-out-cubic' });
            navigate('landing');
            setTimeout(showDisclaimerModal, 1000);
            
            // Re-bind ripple effect listener to the app container, or attach listeners to specific elements
            document.querySelectorAll('.btn-start, .btn-demo-hover, .feature-card, .button-3d-hover, .glass-social-button').forEach(element => {
                element.addEventListener('click', function(e) {
                    createRipple(e);
                });
            });
            // REMOVED window.addEventListener('resize', () => updateFeatureViewer(false));
        }
        
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
        
        window.initApp = initApp;
        window.startLiveCamera = startLiveCamera;
        window.toggleHud = toggleHud;
        window.showToast = showToast;
        window.navigate = navigate;
        window.startProcessing = startProcessing;
        window.stopProcessing = stopProcessing;
        window.togglePasswordVisibility = togglePasswordVisibility; // Expose new function
        window.showAuthInfo = showAuthInfo; // Expose new function
        window.hideAuthInfo = hideAuthInfo; // Expose new function
        window.handleSignup = handleSignup; // Expose new signup handler
    