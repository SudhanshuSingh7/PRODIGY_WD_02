let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime = 0;
let running = false;
let lapCount = 0;

const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const display = document.getElementById('display');
const lapsList = document.getElementById('lapsList');

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(getShowTime, 10); 
        running = true;
        startPauseBtn.innerHTML = 'Pause';
        lapBtn.style.display = 'inline-block';
    } else {
        clearInterval(tInterval);
        savedTime = new Date().getTime() - startTime;
        running = false;
        startPauseBtn.innerHTML = 'Start';
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startPauseBtn.innerHTML = 'Start';
    savedTime = 0;
    display.innerHTML = '00:00:00:00';
    lapsList.innerHTML = '';
    lapBtn.style.display = 'none';
    lapCount = 0;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10); 

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds; 

    display.innerHTML = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapItem = document.createElement('li');
        lapItem.innerText = `Lap ${lapCount}: ${display.innerHTML}`;
        lapsList.appendChild(lapItem);
    }
}
