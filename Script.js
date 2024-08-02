let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapNumber = 0;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapTimes = document.getElementById('lapTimes');

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        startPauseBtn.innerText = 'Pause';
        lapBtn.disabled = false;
        running = true;
    } else {
        clearInterval(tInterval);
        startPauseBtn.innerText = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    startPauseBtn.innerText = 'Start';
    display.innerText = '00:00:00.000';
    lapTimes.innerHTML = '';
    lapNumber = 0;
    lapBtn.disabled = true;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.innerText = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
    lapNumber++;
    const lapTime = document.createElement('li');
    lapTime.innerText = `Lap ${lapNumber}: ${display.innerText}`;
    lapTimes.appendChild(lapTime);
}

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
