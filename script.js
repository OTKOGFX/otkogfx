document.addEventListener('DOMContentLoaded', () => {

    /* ==============================================
       1. LOADING SCREEN
       ============================================== */
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loader = document.querySelector('.loader');
            loader.classList.add('hidden');
        }, 1500); // 1.5s delay to show off the cool animation
    });

    /* ==============================================
       2. CUSTOM CURSOR
       ============================================== */
    const cursor = document.querySelector('.cursor');
    const cursorGlow = document.querySelector('.cursor-glow');

    document.addEventListener('mousemove', (e) => {
        // Fast follow for dot
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Smooth follow for glow using Web Animations API
        cursorGlow.animate({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Cursor hover effects on interactive elements
    const interactables = document.querySelectorAll('a, button, .img-wrapper, .close-lightbox');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    /* ==============================================
       3. BACKGROUND PARTICLES
       ============================================== */
    const particlesContainer = document.getElementById('particles');
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size, position, and animation duration
        let size = Math.random() * 4 + 1; // 1px to 5px
        let posX = Math.random() * 100; // 0vw to 100vw
        let duration = Math.random() * 15 + 10; // 10s to 25s
        let delay = Math.random() * 10; // 0s to 10s

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}vw`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);
    }

    /* ==============================================
       4. SCROLL REVEAL & STATS COUNTER
       ============================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealElements = document.querySelectorAll('.reveal');
    let counted = false;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger counter if stats section comes into view
                if (entry.target.classList.contains('stats-grid') && !counted) {
                    runCounters();
                    counted = true;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));

    // Counter Animation Logic
    function runCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 50; 

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target + (target > 100 ? '+' : ''); // add + to big numbers
                }
            };
            updateCount();
        });
    }

    /* ==============================================
       5. HERO PARALLAX
       ============================================== */
    const heroTitle = document.querySelector('.parallax-text');
    document.addEventListener('mousemove', (e) => {
        let x = (window.innerWidth - e.pageX * 2) / 90;
        let y = (window.innerHeight - e.pageY * 2) / 90;
        
        if (heroTitle) {
            heroTitle.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }
    });

    /* ==============================================
       6. LIGHTBOX FOR PORTFOLIO
       ============================================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = document.querySelector('.close-lightbox');
    const portfolioImages = document.querySelectorAll('.img-wrapper img');

    portfolioImages.forEach(img => {
        img.parentElement.addEventListener('click', () => {
            // Get full resolution image from data-full attribute, fallback to src
            const fullRes = img.getAttribute('data-full') || img.src;
            lightboxImg.src = fullRes;
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden'; // prevent background scrolling
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
        setTimeout(() => lightboxImg.src = '', 400); // clear src after animation
    };

    closeLightboxBtn.addEventListener('click', closeLightbox);
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    });

});