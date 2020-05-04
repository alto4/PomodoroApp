// CACHE DOM ELEMENTS
const timeRemaining = document.querySelector('.time-remaining');
const startButton = document.querySelector('.btn-start');
const stopButton = document.querySelector('.btn-stop');
const moreFocusButton = document.querySelector('.btn-more-focus');
const lessFocusButton = document.querySelector('.btn-less-focus');
const moreBreakButton = document.querySelector('.btn-more-break');
const lessBreakButton = document.querySelector('.btn-less-break');

// VARIABLE DECLARATIONS
const secondsInMinutes = 60;
let minutes = 25;
let secondsForFocus = minutes * secondsInMinutes;
let secondsForBreak = 5 * secondsInMinutes;
let inFocusMode = false;
let secondsRemaining = 10;

// EVENT LISTENERS
startButton.addEventListener('click', function (e) {
    startTimer(secondsForFocus);
    inFocusMode = true;
    console.log(inFocusMode);
});

moreFocusButton.addEventListener('click', function (e) {
    secondsForFocus += 60;
    timeRemaining.textContent = formatSeconds(secondsForFocus);
});

lessFocusButton.addEventListener('click', function (e) {
    secondsForFocus -= 60;
    timeRemaining.textContent = formatSeconds(secondsForFocus);
});

moreBreakButton.addEventListener('click', function (e) {
    secondsForBreak += 60;
});

lessBreakButton.addEventListener('click', function (e) {
    secondsForBreak -= 60;
});

// FUNCTIONS
// Function to format time to mm:ss 
function formatSeconds(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secondsRemaining = seconds % 60;
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    let timeRemainingOutput = `${minutes}:${secondsRemaining}`;
    return timeRemainingOutput;
}

// Function for timer start and countdown - takes in a value of seconds and counts down every second until 0 is reached
// Add second parameter to toggle between focus time and break time messages???? 
function startTimer(secondsRemaining) {

    let timer = setInterval(function () {
        console.log(secondsRemaining);
        secondsRemaining--;
        timeRemaining.textContent = formatSeconds(secondsRemaining);

        if (secondsRemaining === 0) {
            timeRemaining.textContent = "Break!";
            stopTimer();
        }
    }, 1000);

    stopButton.addEventListener('click', function (e) {
        let tempTime = secondsRemaining;
        secondsRemaining = 0;
        stopTimer();
        secondsForFocus = tempTime;
    });

    // Function to stop timer
    function stopTimer() {
        clearInterval(timer);
    }
}