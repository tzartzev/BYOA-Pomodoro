let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const modeSwitch = document.getElementById('mode-switch');
let isWorkMode = true;
let workTime = 25 * 60; // 25 minutes in seconds
let restTime = 5 * 60;  // 5 minutes in seconds

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                isWorkTime = !isWorkTime;
                timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
                modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
                updateDisplay();
                alert(isWorkTime ? 'Break is over! Time to work!' : 'Work session complete! Take a break!');
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = 25 * 60;
    modeText.textContent = 'Work Time';
    updateDisplay();
}

function toggleMode() {
    isWorkMode = !isWorkMode;
    timeLeft = isWorkMode ? workTime : restTime;
    modeText.textContent = isWorkMode ? 'Work Mode' : 'Rest Mode';
    updateDisplay();
}

modeSwitch.addEventListener('change', toggleMode);

// Update your reset function
function reset() {
    clearInterval(timerInterval);
    timeLeft = isWorkMode ? workTime : restTime;
    updateDisplay();
    startButton.disabled = false;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize display
updateDisplay(); 