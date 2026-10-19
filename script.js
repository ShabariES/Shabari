// Shabari E S - Portfolio Interactive Script (Studio Theme)
document.addEventListener('DOMContentLoaded', () => {
    // Render one lightweight network background behind the full portfolio.
    // The static CSS artwork remains visible if WebGL is unavailable or motion is reduced.
    const vantaHost = document.getElementById('vanta-bg');
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (vantaHost && window.VANTA?.NET && window.THREE && !prefersReducedMotion) {
        try {
            window.portfolioVanta = window.VANTA.NET({
                el: vantaHost,
                THREE: window.THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200,
                minWidth: 200,
                scale: 1,
                scaleMobile: 0.8,
                color: 0x0a0a0d,
                backgroundColor: 0xf2f2f4,
                backgroundAlpha: 0,
                points: 9,
                maxDistance: 18,
                spacing: 27,
                showDots: true
            });
        } catch (error) {
            console.warn('Vanta background failed to initialize; static background remains active.', error);
        }
    }

    // 1. Theme Management (Dark / Light Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    function setTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        if (window.lucide) {
            lucide.createIcons();
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme') || 'light';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(nextTheme);
        });
    }

    // Listen to OS system color-scheme changes if user hasn't explicitly set a preference
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('portfolio-theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    // 2. Initialize Lucide Icons if loaded
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Initialize AOS scroll animation
    if (window.AOS) {
        AOS.init({
            duration: prefersReducedMotion ? 1 : 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60
        });
    }

    // 3. Mobile Navigation Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isOpen = navLinks.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
            mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                if (window.lucide) lucide.createIcons();
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.setAttribute('aria-label', 'Open navigation menu');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    if (window.lucide) lucide.createIcons();
                }
            });
        });
    }

    // 4. Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });

    // 5. Interactive Mouse Motion Parallax Tilt for 3D Hero Avatar
    const heroSection = document.querySelector('.hero');
    const heroAvatarImg = document.querySelector('.avatar-img');
    const heroAvatarGlow = document.querySelector('.avatar-glow');

    if (heroSection && heroAvatarImg && !prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
            const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

            // Subtle 3D tilt calculation
            const rotateY = mouseX * 16;
            const rotateX = -mouseY * 12;
            const translateX = mouseX * 15;
            const translateY = mouseY * 10;

            heroAvatarImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${translateX}px, ${translateY}px, 20px) scale(1.03)`;
            
            if (heroAvatarGlow) {
                heroAvatarGlow.style.transform = `translate3d(${translateX * 1.5}px, ${translateY * 1.5}px, 0px) scale(1.1)`;
            }
        });

        heroSection.addEventListener('mouseleave', () => {
            heroAvatarImg.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px) scale(1)';
            if (heroAvatarGlow) {
                heroAvatarGlow.style.transform = 'translate3d(0px, 0px, 0px) scale(1)';
            }
        });
    }

    // 6. Contact Form Email Generator
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const message = document.getElementById('message')?.value || '';

            const mailtoUrl = `mailto:shabaries2866@gmail.com?subject=${encodeURIComponent(`Portfolio Inquiry from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            window.location.href = mailtoUrl;
        });
    }
});
