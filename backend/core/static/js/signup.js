 // Add a 'loaded' class to the body when the page is ready to trigger animations
  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loaded");

    // Optional: Provide feedback for the non-functional form
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Manual account creation is not yet available. Please use Google to sign in.');
    });
  });