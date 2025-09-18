
// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const nav = document.getElementById('main-nav');

if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
        const isOpen = nav.classList.toggle('open');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu on link click (for mobile)
    nav.querySelectorAll('ul li a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Smooth scroll
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            // Close menu
            nav.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Also close menu if "Home" is clicked (li, not a)
    const homeLi = nav.querySelector('ul li.active');
    if (homeLi) {
        homeLi.addEventListener('click', function() {
            nav.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    }
} else {
    // Fallback: Smooth scroll for desktop nav
    document.querySelectorAll('header nav ul li a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Netflix-style carousel scroll with mouse wheel
document.querySelectorAll('.carousel').forEach(carousel => {
    carousel.addEventListener('wheel', function(e) {
        if (e.deltaY !== 0) {
            e.preventDefault();
            carousel.scrollLeft += e.deltaY;
        }
    });
});

// (Optional) Add arrows for carousel scroll
document.querySelectorAll('.carousel').forEach(carousel => {
    const container = carousel.parentElement;

    // Left Arrow
    const leftBtn = document.createElement("button");
    leftBtn.className = "carousel-btn left";
    leftBtn.innerHTML = "&#8249;"; // ‹
    container.appendChild(leftBtn);

    // Right Arrow
    const rightBtn = document.createElement("button");
    rightBtn.className = "carousel-btn right";
    rightBtn.innerHTML = "&#8250;"; // ›
    container.appendChild(rightBtn);

    // Scroll functions
    leftBtn.addEventListener("click", () => {
        carousel.scrollBy({ left: -300, behavior: "smooth" });
    });
    rightBtn.addEventListener("click", () => {
        carousel.scrollBy({ left: 300, behavior: "smooth" });
    });
});
