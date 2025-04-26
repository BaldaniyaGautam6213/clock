const homeBtn = document.getElementById('homeBtn');
const timerBtn = document.getElementById('timerBtn');
const stopwatchBtn = document.getElementById('stopwatchBtn');
const worldClockBtn = document.getElementById('worldClockBtn');

const homePage = document.getElementById('homePage');
const timerPage = document.getElementById('timerPage');
const stopwatchPage = document.getElementById('stopwatchPage');
const worldClockPage = document.getElementById('worldClockPage');

function showPage(page, button) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  page.classList.add('active');
  button.classList.add('active');
}

homeBtn.addEventListener('click', () => showPage(homePage, homeBtn));
timerBtn.addEventListener('click', () => showPage(timerPage, timerBtn));
stopwatchBtn.addEventListener('click', () => showPage(stopwatchPage, stopwatchBtn));
worldClockBtn.addEventListener('click', () => showPage(worldClockPage, worldClockBtn));

// Clock
const clockDisplay = document.getElementById('clockDisplay');
setInterval(() => {
  const now = new Date();
  clockDisplay.textContent = now.toLocaleTimeString();
}, 1000);

// Timer
let timerInterval;
let totalSeconds = 0;

function startTimer() {
  const mins = parseInt(document.getElementById('timerMinutes').value) || 0;
  const secs = parseInt(document.getElementById('timerSeconds').value) || 0;
  totalSeconds = mins * 60 + secs;

  if (totalSeconds <= 0) {
    alert("Set a time greater than 0.");
    return;
  }

  updateTimerDisplay();

  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    totalSeconds--;
    updateTimerDisplay();
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      alert("Timer finished!");
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateTimerDisplay() {
  const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');
  document.getElementById('timerDisplay').textContent = `${mins}:${secs}`;
}

// Stopwatch
let stopwatchSeconds = 0;
let stopwatchInterval;
const stopwatchDisplay = document.getElementById('stopwatchDisplay');

function startStopwatch() {
  if (stopwatchInterval) return;
  stopwatchInterval = setInterval(() => {
    stopwatchSeconds++;
    updateStopwatchDisplay();
  }, 1000);
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
}

function resetStopwatch() {
  stopStopwatch();
  stopwatchSeconds = 0;
  updateStopwatchDisplay();
}

function updateStopwatchDisplay() {
  const hrs = String(Math.floor(stopwatchSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((stopwatchSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(stopwatchSeconds % 60).padStart(2, '0');
  stopwatchDisplay.textContent = `${hrs}:${mins}:${secs}`;
}

// World Clock
const worldClockList = document.getElementById('worldClockList');
const cities = [
  { name: 'New York', timeZone: 'America/New_York' },
  { name: 'London', timeZone: 'Europe/London' },
  { name: 'Tokyo', timeZone: 'Asia/Tokyo' },
  { name: 'Sydney', timeZone: 'Australia/Sydney' },
  { name: 'Kuala Lumpur(Malasiya)', timeZone: 'Asia/Kuala_Lumpur' },
  { name: 'Vadodara', timeZone: 'Asia/Kolkata' }
];


function updateWorldClock() {
  worldClockList.innerHTML = '';
  const now = new Date();
  cities.forEach(city => {
    const time = now.toLocaleTimeString('en-US', {
      timeZone: city.timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    const p = document.createElement('p');
    p.textContent = `${city.name}: ${time}`;
    worldClockList.appendChild(p);
  });
}

setInterval(updateWorldClock, 1000);
updateWorldClock();