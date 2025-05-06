// Simple Smooth Scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only prevent default for internal links, not external ones
        if (this.getAttribute('href').startsWith('#') && this.getAttribute('href').length > 1 && !this.hasAttribute('data-bs-toggle')) { // Avoid conflict with Bootstrap components
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate scroll position considering the fixed navbar height
                const navbarHeight = document.querySelector('#mainNavbar').offsetHeight || 80; // Fallback height
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Optional: Close mobile navbar if open after clicking a link
                 const navbarToggler = document.querySelector('.navbar-toggler');
                 const navbarCollapse = document.querySelector('.navbar-collapse');
                 if (navbarToggler && navbarCollapse.classList.contains('show')) {
                    // Use Bootstrap's Collapse instance to hide
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                      bsCollapse.hide();
                    } else {
                      // Fallback if instance not found (less ideal)
                      navbarToggler.click();
                    }
                 }
            }
        }
    });
});

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 800, // values from 0 to 3000, with step 50ms
    easing: 'ease-in-out', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  });
});


// Optional: Change navbar background on scroll (if you want solid bg after scroll)
// window.addEventListener('scroll', function() {
//   const navbar = document.getElementById('mainNavbar');
//   if (window.scrollY > 50) { // Change after scrolling 50px
//     navbar.style.backgroundColor = 'rgba(74, 78, 105, 0.9)'; // Example: Darker footer color, less transparent
//      navbar.style.backdropFilter = 'blur(15px)';
//      navbar.style.webkitBackdropFilter = 'blur(15px)';
//   } else {
//      navbar.style.backgroundColor = 'var(--glass-bg)'; // Revert to initial glass bg
//      navbar.style.backdropFilter = 'blur(10px)';
//      navbar.style.webkitBackdropFilter = 'blur(10px)';
//   }
// });