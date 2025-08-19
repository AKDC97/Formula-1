// JavaScript for Lewis Hamilton Tribute Website

document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const favicon = document.getElementById('favicon');
    const images = document.querySelectorAll("[data-mercedes][data-ferrari]");
    const sliderTrack = document.querySelector('.slider-track');
    const sliderImages = document.querySelectorAll('.slider-img');
    const indicators = document.querySelectorAll('.slider-indicator');
    const mediaCards = document.querySelectorAll('.media-card');
    const modal = document.getElementById('mediaModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalTitle = document.getElementById('mediaModalLabel');
    let currentIndex = 0;
    const totalImages = sliderImages.length;

    function updateIndicators(index) {
        if (!indicators) return;
        indicators.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function showImage(index) {
        if (!sliderTrack) return;
        sliderTrack.style.transform = `translateX(-${index * 100}%)`;
        updateIndicators(index);
    }

    function updateThemeImages() {
        const isLight = body.classList.contains('light');
        images.forEach(img => {
            img.src = isLight ? img.getAttribute('data-ferrari') : img.getAttribute('data-mercedes');
        });
        if (favicon) favicon.href = isLight ? "media/favicon/ferrfav.png" : "media/favicon/mercfav.png";

        // Update modal theme
        if (modal) {
            modal.classList.toggle('modal-light', isLight);
            modal.classList.toggle('modal-dark', !isLight);
        }
    }

    // Theme from localStorage
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light');
        toggleBtn.textContent = '♞';
    } else {
        toggleBtn.textContent = '㉦';
    }
    updateThemeImages();

    // Theme toggle
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            body.classList.toggle('light');
            if (body.classList.contains('light')) {
                toggleBtn.textContent = '♞';
                localStorage.setItem('theme', 'light');
            } else {
                toggleBtn.textContent = '㉦';
                localStorage.setItem('theme', 'dark');
            }
            updateThemeImages();
            updateThemeVideos();
        });
    }

    // Slider controls (only if present)
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");
    if (nextBtn && prevBtn && sliderImages.length) {
        nextBtn.addEventListener("click", function() {
            currentIndex = (currentIndex + 1) % totalImages;
            showImage(currentIndex);
        });

        prevBtn.addEventListener("click", function() {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            showImage(currentIndex);
        });

        indicators.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentIndex = i;
                showImage(currentIndex);
            });
        });

        showImage(currentIndex);
    }

    // Modal logic for media cards
    if (mediaCards.length && modalImage) {
        mediaCards.forEach((card) => {
            card.addEventListener('click', function() {
                const img = card.querySelector('.media-img');
                const isLight = body.classList.contains('light');
                modalImage.src = isLight ? img.getAttribute('data-ferrari') : img.getAttribute('data-mercedes');
                modalImage.alt = img.alt;
            });
        });
    }

    // Video Slider Logic (only if present)
    const videoSlides = document.querySelectorAll('.media-video-slide');
    const videoIndicators = document.querySelectorAll('.media-video-indicator');
    let videoIndex = 0;

    function updateThemeVideos() {
        const isLight = body.classList.contains('light');
        videoSlides.forEach((slide) => {
            const iframe = slide.querySelector('iframe');
            if (slide.classList.contains('active')) {
                iframe.src = isLight ? slide.getAttribute('data-ferrari') : slide.getAttribute('data-mercedes');
            } else {
                iframe.src = '';
            }
        });
    }

    function showVideoSlide(idx) {
        videoSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
            if (videoIndicators[i]) videoIndicators[i].classList.toggle('active', i === idx);
        });
        updateThemeVideos();
    }

    const videoPrev = document.getElementById('mediaVideoPrev');
    const videoNext = document.getElementById('mediaVideoNext');
    if (videoSlides.length && videoIndicators.length && videoPrev && videoNext) {
        videoPrev.addEventListener('click', function() {
            videoIndex = (videoIndex - 1 + videoSlides.length) % videoSlides.length;
            showVideoSlide(videoIndex);
        });
        videoNext.addEventListener('click', function() {
            videoIndex = (videoIndex + 1) % videoSlides.length;
            showVideoSlide(videoIndex);
        });
        videoIndicators.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                videoIndex = i;
                showVideoSlide(videoIndex);
            });
        });
        showVideoSlide(videoIndex);
    }

    // Initial video update if present
    if (videoSlides.length) updateThemeVideos();
});
