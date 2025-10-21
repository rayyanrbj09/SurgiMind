// signup.js
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const agreeCheckbox = document.getElementById('agree-terms');
            if (!agreeCheckbox.checked) {
                showToast('Please agree to the Terms of Service to continue.', 'error');
                return;
            }

            showToast('Account Created! Redirecting to Dashboard...', 'success');
            
            // CRITICAL FIX: Redirect to dashboard.html on success
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 500);
        });
    }
});