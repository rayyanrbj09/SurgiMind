document.addEventListener("DOMContentLoaded", () => {
    // FIX: Add 'loaded' class to the body to trigger entry animations
    document.body.classList.add("loaded");

    const navbar = document.getElementById('navbar');
    const heroBg = document.getElementById('hero-bg');

    // 1. Interactive Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 2. Parallax effect for Hero Background
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        }
    });

    // 3. Dropdown Menu Toggle (only if user is logged in)
    const profileBtn = document.getElementById('profileBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');

    // If the profileBtn exists, the user is logged in.
    if (profileBtn) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents the window click listener from firing immediately
            dropdownMenu.classList.toggle('hidden');
            dropdownMenu.classList.toggle('scale-95');
            dropdownMenu.classList.toggle('opacity-0');
            dropdownMenu.classList.toggle('scale-100');
            dropdownMenu.classList.toggle('opacity-100');
        });

        // Close dropdown if clicked anywhere else on the page
        window.addEventListener('click', function(e) {
            if (dropdownMenu && !dropdownMenu.classList.contains('hidden')) {
                 dropdownMenu.classList.add('hidden', 'scale-95', 'opacity-0');
                 dropdownMenu.classList.remove('scale-100', 'opacity-100');
            }
        });
    }

    // 4. Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
    });
});