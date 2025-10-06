import { AppHeader, AppFooter, navigate } from '../main.js';
import * as Data from '../data.js';

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

export function renderPage(appContainer) {
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

            <section id="detailed-features" class="pt-16 pb-10 md:pt-24 md:pb-16 bg-soft-gray-bg">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl sm:text-4xl font-extrabold text-text-dark text-center mb-12" data-aos="fade-up">
                        Three Pillars of Surgical Intelligence
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        ${renderFeatureCard(Data.features[0])}
                        ${renderFeatureCard(Data.features[1])}
                        ${renderFeatureCard(Data.features[2])}
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