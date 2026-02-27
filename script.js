
// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const nav = document.getElementById('main-nav');

if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
        const isOpen = nav.classList.toggle('open');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Handle nav link clicks (including Home)
    nav.querySelectorAll('ul li').forEach(li => {
        li.addEventListener('click', function(e) {
            // Remove active from all
            nav.querySelectorAll('ul li').forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Scroll
            if (this.querySelector('a')) {
                // Not Home
                e.preventDefault();
                const href = this.querySelector('a').getAttribute('href');
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Home
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            // Close menu
            nav.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
} else {
    // Fallback: Smooth scroll and active for desktop nav
    const nav = document.querySelector('header nav ul');
    if (nav) {
        nav.querySelectorAll('li').forEach(li => {
            li.addEventListener('click', function(e) {
                nav.querySelectorAll('li').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                if (this.querySelector('a')) {
                    e.preventDefault();
                    const href = this.querySelector('a').getAttribute('href');
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    }
}
// Categories nav active underline
const categoriesNav = document.querySelector('.categories ul');
if (categoriesNav) {
    categoriesNav.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', function() {
            categoriesNav.querySelectorAll('li').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
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

// Intro Video - Autoplay on Scroll (GitHub Pages Optimized)
const introVideo = document.getElementById('introVideo');
if (introVideo && 'IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start autoplay when video enters viewport
                introVideo.play().catch(() => {
                    // Autoplay may fail due to browser policies
                    // Video will still show poster image as fallback
                });
            } else {
                // Pause video when scrolled out of view
                introVideo.pause();
            }
        });
    }, { threshold: 0.1 });

    videoObserver.observe(introVideo);
}
