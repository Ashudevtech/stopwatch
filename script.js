// Get elements
const timerEl = document.getElementById("timer");
const startButtonEl = document.getElementById("start");
const stopButtonEl = document.getElementById("stop");
const resetButtonEl = document.getElementById("reset");
const lapButtonEl = document.getElementById("lap");
const shareButtonEl = document.getElementById("share");
const lapTimesEl = document.getElementById("lap-times");
const themeSelector = document.getElementById("theme");
const historyEntriesEl = document.getElementById("history-entries");
const clearHistoryButton = document.getElementById("clear-history");
const shareLinkInput = document.getElementById("share-link");

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let lapCounter = 1;
let historyLog = [];

// Helper function to format time
const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));

    return (
        `${hours > 9 ? hours : "0" + hours}:` +
        `${minutes > 9 ? minutes : "0" + minutes}:` +
        `${seconds > 9 ? seconds : "0" + seconds}.` +
        `${milliseconds > 9 ? milliseconds : "0" + milliseconds}`
    );
};

// Timer controls
const startTimer = () => {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timerEl.textContent = formatTime(elapsedTime);
    }, 10);

    startButtonEl.disabled = true;
    stopButtonEl.disabled = false;
    lapButtonEl.disabled = false;
    shareButtonEl.disabled = false; // Enable share button
};

const stopTimer = () => {
    clearInterval(timerInterval);
    startButtonEl.disabled = false;
    stopButtonEl.disabled = true;
    lapButtonEl.disabled = true;
};

const resetTimer = () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    timerEl.textContent = "00:00:00";
    lapTimesEl.innerHTML = "";
    lapCounter = 1;

    startButtonEl.disabled = false;
    stopButtonEl.disabled = true;
    lapButtonEl.disabled = true;
    shareButtonEl.disabled = true; // Disable share button
};

// Lap and history log functions
const recordLap = () => {
    const lapTime = formatTime(elapsedTime);
    const lapRecord = document.createElement("div");
    lapRecord.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapTimesEl.appendChild(lapRecord);

    historyLog.push(`Lap ${lapCounter}: ${lapTime}`);
    updateHistoryLog();

    lapCounter++;
};

const updateHistoryLog = () => {
    historyEntriesEl.innerHTML = "";
    historyLog.forEach((entry) => {
        const historyRecord = document.createElement("div");
        historyRecord.textContent = entry;
        historyEntriesEl.appendChild(historyRecord);
    });
};

const clearHistory = () => {
    historyLog = [];
    updateHistoryLog();
    console.log("History cleared."); // Debugging log
};

// Theme control
const changeTheme = () => {
    document.body.className = themeSelector.value;
};

// Share function
const shareLapTimes = () => {
    const shareText = `Check out my stopwatch laps: \n${historyLog.join('\n')}`;
    const shareUrl = encodeURIComponent(window.location.href);
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;

    // Display shareable link in the hidden input
    shareLinkInput.value = `${shareText}\n\nView my stopwatch: ${shareUrl}`;
    shareLinkInput.style.display = "block"; // Show the share link input

    // Open share in new window (Twitter)
    window.open(twitterShareUrl, "_blank");
};

// Event listeners
startButtonEl.addEventListener("click", startTimer);
stopButtonEl.addEventListener("click", stopTimer);
resetButtonEl.addEventListener("click", resetTimer);
lapButtonEl.addEventListener("click", () => {
    recordLap();
    shareButtonEl.disabled = false; // Enable share button after a lap is recorded
});
shareButtonEl.addEventListener("click", shareLapTimes);
themeSelector.addEventListener("change", changeTheme);
clearHistoryButton.addEventListener("click", clearHistory); // Ensure this is connected
document.addEventListener('DOMContentLoaded', function () {
    const themeSelector = document.getElementById('theme');
    const timer = document.getElementById('timer');
    const buttons = document.querySelectorAll('button');

    themeSelector.addEventListener('change', function () {
        changeTheme(themeSelector.value);
    });

    function changeTheme(theme) {
        // Remove existing theme classes
        document.body.className = '';
        
        // Apply new theme
        if (theme === 'retro') {
            document.body.classList.add('retro-theme');
            timer.style.color = '#4CAF50'; // Change timer color for retro theme
        } else if (theme === 'analog') {
            document.body.classList.add('analog-theme');
            timer.style.color = '#FF9800'; // Change timer color for analog theme
        } else {
            document.body.classList.add('digital-theme');
            timer.style.color = '#FF6F61'; // Default color for digital theme
        }
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const themeSelector = document.getElementById('theme');
    const timer = document.getElementById('timer');
    const buttons = document.querySelectorAll('button');

    themeSelector.addEventListener('change', function () {
        changeTheme(themeSelector.value);
    });

    function changeTheme(theme) {
        // Remove existing theme classes
        document.body.className = '';
        
        // Apply new theme
        if (theme === 'retro') {
            document.body.classList.add('retro-theme');
            timer.style.color = '#6a5acd'; // Change timer color for retro theme
        } else if (theme === 'analog') {
            document.body.classList.add('analog-theme');
            timer.style.color = '#FF9800'; // Change timer color for analog theme
        } else {
            document.body.classList.add('digital-theme');
            timer.style.color = '#FF6F61'; // Default color for digital theme
        }
    }
});
