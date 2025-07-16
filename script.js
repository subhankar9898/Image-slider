document.addEventListener('DOMContentLoaded', () => {
    const images = [
        'https://picsum.photos/id/237/900/450',  // Dog
        'https://picsum.photos/id/10/900/450',   // City lights
        'https://picsum.photos/id/1084/900/450', // Beach
        'https://picsum.photos/id/20/900/450',   // Forest
        'https://picsum.photos/id/163/900/450'   // Mountains
    ];

    const sliderImages = document.querySelector('.slider-images');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const playPauseBtn = document.querySelector('.play-pause-btn');
    const dotsContainer = document.querySelector('.dots-container');

    let currentIndex = 0;
    let intervalId;
    let isPlaying = true; // Slider starts playing by default

    // Function to render images and dots
    function renderSlider() {
        sliderImages.innerHTML = ''; // Clear existing images
        dotsContainer.innerHTML = ''; // Clear existing dots

        images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Slide ${index + 1}`;
            sliderImages.appendChild(img);

            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === currentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                goToSlide(index);
                pauseSlideshow(); // Pause when a dot is clicked manually
            });
            dotsContainer.appendChild(dot);
        });

        // Set the initial transform to show the first image
        updateSliderPosition();
        updateDots();
    }

    // Function to update the slider's position based on currentIndex
    function updateSliderPosition() {
        sliderImages.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Function to update active dot
    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Function to go to a specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSliderPosition();
        updateDots();
    }

    // Function for next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        goToSlide(currentIndex);
    }

    // Function for previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        goToSlide(currentIndex);
    }

    // Function to start the automatic slideshow
    function startSlideshow() {
        if (!intervalId) { // Prevent multiple intervals
            intervalId = setInterval(nextSlide, 3000); // Change image every 3 seconds
            isPlaying = true;
            playPauseBtn.textContent = 'Pause';
        }
    }

    // Function to pause the automatic slideshow
    function pauseSlideshow() {
        clearInterval(intervalId);
        intervalId = null; // Clear the interval ID
        isPlaying = false;
        playPauseBtn.textContent = 'Play';
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        pauseSlideshow(); // Pause when manual navigation occurs
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        pauseSlideshow(); // Pause when manual navigation occurs
    });

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseSlideshow();
        } else {
            startSlideshow();
        }
    });

    // Initial render and start slideshow
    renderSlider();
    startSlideshow(); // Start the automatic slideshow when the page loads
});