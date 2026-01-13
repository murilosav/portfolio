// Custom Carousel with CSS scroll-snap
document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const nav = carousel.querySelector('.carousel-nav');
    const prevBtn = nav ? nav.querySelector('.carousel-btn-prev') : null;
    const nextBtn = nav ? nav.querySelector('.carousel-btn-next') : null;

    if (!track) return;

    // Get slide width for scrolling
    const getScrollAmount = () => {
        const slide = track.querySelector('.carousel-slide');
        if (!slide) return 300;
        return slide.offsetWidth + 14; // 14 = gap
    };

    // Scroll to prev
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
    }

    // Scroll to next
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });
    }

    // Keyboard navigation when track is focused
    track.setAttribute('tabindex', '0');
    track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        }
    });
});
