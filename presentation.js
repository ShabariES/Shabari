document.addEventListener('DOMContentLoaded', () => {
    const slidesWrapper = document.querySelector('.slides-wrapper');
    const slides = document.querySelectorAll('.slide');
    const header = document.querySelector('.fixed-header');
    const footer = document.querySelector('.fixed-footer');
    const progressBar = document.querySelector('.progress-bar');

    const updateUI = () => {
        let currentSlide = null;
        let maxVisible = 0;

        slides.forEach(slide => {
            const rect = slide.getBoundingClientRect();
            const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
            
            if (visibleHeight > maxVisible) {
                maxVisible = visibleHeight;
                currentSlide = slide;
            }

            if (rect.top < window.innerHeight * 0.85) {
                slide.classList.add('visible');
            }
        });

        if (currentSlide) {
            const isDark = currentSlide.classList.contains('dark-slide');
            const color = isDark ? '#ffffff' : '#000000';
            
            header.style.color = color;
            footer.style.color = color;
            progressBar.style.backgroundColor = color;

            const scrollTotal = slidesWrapper.scrollHeight - window.innerHeight;
            const progress = (slidesWrapper.scrollTop / scrollTotal) * 100;
            progressBar.style.height = `${progress}%`;
        }
    };

    window.addEventListener('keydown', (e) => {
        const h = window.innerHeight;
        if (['ArrowDown', 'ArrowRight', ' '].includes(e.key)) {
            e.preventDefault();
            slidesWrapper.scrollBy({ top: h, behavior: 'smooth' });
        } else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
            e.preventDefault();
            slidesWrapper.scrollBy({ top: -h, behavior: 'smooth' });
        }
    });

    slidesWrapper.addEventListener('scroll', updateUI);
    updateUI();
});
