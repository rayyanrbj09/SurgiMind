import { AppHeader, AppFooter, navigate, togglePasswordVisibility, handleSocialLogin, showAuthInfo } from '../main.js';
import * as Data from '../data.js';

export function renderPage(appContainer) {
    appContainer.innerHTML = `
        <div class="min-h-screen auth-bg flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div class="absolute top-6 left-6 text-3xl font-bold text-white cursor-pointer" style="transition: all 0.6s ease-out; z-index: 30;" onclick="navigate('landing')">
                Surgi<span class="text-primary-blue">Mind</span>
            </div>
            
            <div class="flex flex-col justify-center w-full max-w-6xl flex-grow px-4 lg:px-0">
                <div class="auth-container mx-auto">
                    
                    <div id="auth-info-modal-privacy" class="auth-info-panel privacy-panel lg:w-[400px] h-full" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="privacy-title">
                        ${Data.PrivacyContent}
                        <button class="absolute top-4 right-4 text-white/70 hover:text-white" onclick="hideAuthInfo('privacy')">✕</button>
                    </div>

                    <div class="glass-auth-card p-8 rounded-xl shadow-2xl relative" role="form" aria-labelledby="login-title">
                        <h1 id="login-title" class="sr-only">Surgeon Login Form</h1>
                        
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

                        <div class="mt-6">
                            <div class="relative flex justify-center items-center py-2">
                                <div class="absolute inset-y-0 w-full border-t border-gray-400/50"></div>
                                <span class="relative px-3 text-sm text-gray-200 bg-black/30 rounded-full">Or continue with</span>
                            </div>

                            <div class="mt-4 flex space-x-3">
                                <button type="button" onclick="handleSocialLogin('Google')" 
                                    class="flex-1 p-3 rounded-lg text-white font-semibold glass-social-button transition button-3d-hover focus:outline-none focus:ring-2 focus:ring-white/50"
                                    aria-label="Continue with Google">
                                    <span class="text-xl mr-2 text-red-400">G</span> Google
                                </button>
                                <button type="button" onclick="handleSocialLogin('GitHub')" 
                                    class="flex-1 p-3 rounded-lg text-white font-semibold glass-social-button transition button-3d-hover focus:outline-none focus:ring-2 focus:ring-white/50"
                                    aria-label="Continue with GitHub">
                                    <span class="text-xl mr-2">🐙</span> GitHub
                                </button>
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
                    <div id="auth-info-modal-terms" class="auth-info-panel terms-panel lg:w-[400px] h-full" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="terms-title">
                        ${Data.TermsContent}
                        <button class="absolute top-4 right-4 text-white/70 hover:text-white" onclick="hideAuthInfo('terms')">✕</button>
                    </div>
                </div>
            </div>
            <p class="mt-8 text-center text-xs text-gray-200" role="alert">
                For authorized surgeons only. All data is encrypted at rest & in transit.
            </p>
            
            <footer class="mt-4 text-center text-xs text-gray-200 w-full">
                <p class="text-center">
                    <a href="#" class="hover:underline text-white/80 transition" onclick="event.preventDefault(); showAuthInfo('privacy')">Privacy Note</a> | 
                    <a href="#" class="hover:underline text-white/80 transition" onclick="event.preventDefault(); showAuthInfo('terms')">Terms of Service</a>
                </p>
            </footer>
        </div>
    `;
}