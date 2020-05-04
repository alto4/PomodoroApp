// CACHE DOM ELEMENTS
const timeCategory = document.querySelector('.time-category');
const timeRemaining = document.querySelector('.time-remaining');
const startButton = document.querySelector('.btn-start');
const stopButton = document.querySelector('.btn-stop');
const resetButton = document.querySelector('.btn-reset');
const moreFocusButton = document.querySelector('.btn-more-focus');
const lessFocusButton = document.querySelector('.btn-less-focus');
const moreBreakButton = document.querySelector('.btn-more-break');
const lessBreakButton = document.querySelector('.btn-less-break');
const timeForFocus = document.querySelector('.time-amount-focus');
const timeForBreak = document.querySelector('.time-amount-break');
const outputContainer = document.querySelector('.output');

// VARIABLE DECLARATIONS
const secondsInMinutes = 60;
let minutes = 25;
let secondsForFocus = minutes * secondsInMinutes;
let secondsForBreak = 5 * secondsInMinutes;
let inFocusMode = false;
let secondsRemaining = 10;

timeForFocus.textContent = secondsForFocus / 60;
timeForBreak.textContent = secondsForBreak / 60;

// EVENT LISTENERS
// Event listener for start button - begin counting down timer
startButton.addEventListener('click', function (e) {
    startTimer(secondsForFocus);
    stopButton.disabled = false;
    startButton.disabled = true;
    inFocusMode = true;
    console.log(inFocusMode);
});

// Event listener for more focus button - add 1 minute to length of focus period
moreFocusButton.addEventListener('click', function (e) {
    secondsForFocus += 60;
    timeRemaining.textContent = formatSeconds(secondsForFocus);
    timeForFocus.textContent = Math.round(secondsForFocus / 60);
});

// Event listener for less focus button - subtract 1 minute from length of focus period
lessFocusButton.addEventListener('click', function (e) {
    secondsForFocus -= 60;
    timeRemaining.textContent = formatSeconds(secondsForFocus);
    timeForFocus.textContent = Math.round(secondsForFocus / 60);
});

// Event listener for more break button - add 1 minute to length of break period
moreBreakButton.addEventListener('click', function (e) {
    secondsForBreak += 60;
    timeForBreak.textContent = Math.round(secondsForBreak / 60);
});

// Event listener for less break button - subtract 1 minute from length of focus period
lessBreakButton.addEventListener('click', function (e) {
    secondsForBreak -= 60;
    timeForBreak.textContent = Math.round(secondsForBreak / 60);
});

// FUNCTIONS
// Function to format time to mm:ss for countdown
function formatSeconds(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secondsRemaining = seconds % 60;
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (secondsRemaining < 10) {
        secondsRemaining = "0" + secondsRemaining;
    }

    let timeRemainingOutput = `${minutes}:${secondsRemaining}`;
    return timeRemainingOutput;
}

// Function for timer start and countdown - takes in a value of seconds and counts down every second until 0 is reached
function startTimer(secondsRemaining) {

    let timer = setInterval(function () {

        // Disable buttons for modifying focus and break period lengths to avoid undesirable behaviour with running timer
        moreFocusButton.disabled = true;
        lessFocusButton.disabled = true;
        moreBreakButton.disabled = true;
        lessBreakButton.disabled = true;

        // For every second of runtime, decrement one second from the overall length of the running period
        secondsRemaining--;
        timeRemaining.textContent = formatSeconds(secondsRemaining);

        // Once timer has reached 0, switch into break mode automatically and modify display
        if (secondsRemaining === 0) {
            timeRemaining.textContent = "Break!";
            stopTimer();
            timeCategory.textContent = "Time to Relax:";
            outputContainer.style.backgroundColor = "#619260";
            timeRemaining.textContent = formatSeconds(secondsForBreak);
            startTimer(secondsForBreak);
        }
    }, 1000);

    // Event listener for the stop button - pause the timer and allow for modification of focus and break period lengths
    stopButton.addEventListener('click', function (e) {
        let tempTime = secondsRemaining;
        secondsRemaining = 0;
        stopTimer();
        secondsForFocus = tempTime;
        stopButton.disabled = true;
        startButton.disabled = false;
    });

    // Event listener for the reset button - return all timer settings to defaul length and begin a new focus session of 25 mins
    resetButton.addEventListener('click', function (e) {

        stopTimer();
        minutes = 25;
        secondsForFocus = minutes * secondsInMinutes;;
        timeForFocus.textContent = Math.round(secondsForFocus / 60);
        startTimer(secondsForFocus);
    });

    // Function to stop timer and toggle disabled buttons 
    function stopTimer() {
        moreFocusButton.disabled = false;
        lessFocusButton.disabled = false;
        moreBreakButton.disabled = false;
        lessBreakButton.disabled = false;
        clearInterval(timer);
    }
}