document.addEventListener("DOMContentLoaded", function() {
    let isRunning = false;      // To track whether the stopwatch is running
    let interval;               // To store the interval ID
    let elapsedTime = 0;        // To keep track of elapsed time in seconds

    const startStopButton = document.getElementById('startStop');
    const resetButton = document.getElementById('reset');
    const stopwatchDisplay = document.getElementById('stopwatch');

    // Function to format time as hh:mm:ss
    function formatTime(seconds) {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    }

    // Function to update the stopwatch display every second
    function updateStopwatch() {
        elapsedTime += 1;
        stopwatchDisplay.innerText = formatTime(elapsedTime);
    }

    // Event listener for start/stop button
    startStopButton.addEventListener('click', function() {
        if (isRunning) {
            clearInterval(interval);               // Stop the interval
            startStopButton.innerText = 'Start';   // Change button text to "Start"
        } else {
            interval = setInterval(updateStopwatch, 1000);  // Start the interval
            startStopButton.innerText = 'Stop';             // Change button text to "Stop"
        }
        isRunning = !isRunning;  // Toggle the running state
    });

    // Event listener for reset button
    resetButton.addEventListener('click', function() {
        clearInterval(interval);        // Stop the interval
        isRunning = false;              // Reset the running state
        elapsedTime = 0;                // Reset elapsed time
        stopwatchDisplay.innerText = '00:00:00'; // Reset display
        startStopButton.innerText = 'Start';      // Reset button text to "Start"
    });
});
