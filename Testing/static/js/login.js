// login.js
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            showToast('Login successful! Redirecting to Dashboard...', 'success');
            
            // CRITICAL FIX: Redirect to dashboard.html on success
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 500); 
        });
    }
});