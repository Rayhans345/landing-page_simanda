document.addEventListener('DOMContentLoaded', function() {
    // --- Inisialisasi Library Animasi AOS ---
    if (window.AOS) AOS.init();

    // --- SCRIPT UNTUK MENU MOBILE ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Ripple effect for .cta-button
    document.querySelectorAll('.cta-button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const circle = document.createElement('span');
            circle.classList.add('cta-ripple');
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            circle.style.width = circle.style.height = size + 'px';
            circle.style.left = (e.clientX - rect.left - size/2) + 'px';
            circle.style.top = (e.clientY - rect.top - size/2) + 'px';
            btn.appendChild(circle);
            setTimeout(() => circle.remove(), 500);
        });
    });
});

// Fungsi untuk cek apakah elemen ada di viewport
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < window.innerHeight - 50 &&
        rect.bottom > 0
    );
}

function revealOnScroll() {
    const animatedEls = document.querySelectorAll('.animate-fadeInUp');
    animatedEls.forEach((el) => {
        if (isInViewport(el)) {
            el.classList.remove('revealed');
            void el.offsetWidth; // Force reflow
            el.classList.add('revealed');
            el.style.opacity = 1;
        } else {
            el.classList.remove('revealed');
            el.style.opacity = 0;
        }
    });
}

window.addEventListener('DOMContentLoaded', function() {
    // Untuk animasi saat load pertama
    revealOnScroll();
    // Untuk animasi saat scroll
    window.addEventListener('scroll', revealOnScroll);
});

function parallaxOnScroll() {
    const parallaxEls = document.querySelectorAll('.parallax-text');
    parallaxEls.forEach((el) => {
        // Jarak elemen dari atas viewport
        const rect = el.getBoundingClientRect();
        // Efek parallax: semakin jauh dari tengah layar, semakin besar translasi
        const windowHeight = window.innerHeight;
        const offset = (rect.top + rect.height / 2) - windowHeight / 2;
        // Skala efek, bisa diubah sesuai selera
        const maxTranslate = 30; // px
        const translateY = Math.max(Math.min(offset / 10, maxTranslate), -maxTranslate);
        el.style.transform = `translateY(${translateY}px)`;
    });
}

window.addEventListener('scroll', parallaxOnScroll);
window.addEventListener('DOMContentLoaded', parallaxOnScroll);