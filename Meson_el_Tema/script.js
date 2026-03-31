// NAV scroll effect
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// Menu tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const menuCards = document.querySelectorAll('.menu-card');
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const cat = btn.dataset.cat;
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        menuCards.forEach(card => {
            card.classList.toggle('active', card.dataset.cat === cat);
        });
    });
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// Form submit
document.getElementById('submitBtn').addEventListener('click', () => {
    const btn = document.getElementById('submitBtn');
    btn.textContent = '✓ Solicitud enviada — Te llamamos pronto';
    btn.style.background = 'var(--brown-d)';
    btn.style.color = 'var(--warm1)';
    btn.disabled = true;
});