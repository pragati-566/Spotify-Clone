// Select DOM elements
const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const currTimeDisplay = document.getElementById('curr-time');
const totTimeDisplay = document.getElementById('tot-time');
const volumeSlider = document.getElementById('control-5');

// Track state
let isPlaying = false;

// Initialize Audio object with the downloaded sample
const audio = new Audio('./assets/sample.mp3');

// Helper function to format seconds into mm:ss
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Update total time when audio metadata is loaded
audio.addEventListener('loadedmetadata', () => {
    totTimeDisplay.innerText = formatTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

// Play / Pause functionality
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.src = "./assets/player_icon3.png"; // Reset to play icon (assume original is play)
    } else {
        audio.play();
        playPauseBtn.src = "./assets/player_icon4.png"; // Use one of the other icons as 'pause' for now, ideally needs a specific pause icon
    }
    isPlaying = !isPlaying;
});

// Update progress bar and current time text as audio plays
audio.addEventListener('timeupdate', () => {
    progressBar.value = Math.floor(audio.currentTime);
    currTimeDisplay.innerText = formatTime(audio.currentTime);
});

// Handle user seeking using the progress bar
progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value;
});

// Volume control (range slider needs proper configuration)
if (volumeSlider) {
    // Set default volume slider properties
    volumeSlider.min = 0;
    volumeSlider.max = 1;
    volumeSlider.step = 0.05;
    volumeSlider.value = audio.volume;

    volumeSlider.addEventListener('input', (event) => {
        audio.volume = event.target.value;
    });
}
