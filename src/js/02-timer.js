import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dataInput = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEL = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]'); 
const secondsEl = document.querySelector('[data-seconds]');
let deltaTime = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  dateFormat: 'Y-m-d H:i',
  minuteIncrement: 1,


   onClose(selectedDates) {
     const selectedDate = selectedDates[0].getTime();
     
      deltaTime = selectedDate - options.defaultDate;

     if (deltaTime < 0) {
        
       window.alert("Please choose a date in the future");
        startBtn.classList.add("btn-disabled");
        startBtn.disabled = true;
       return;
       
      } 
        startBtn.classList.remove("btn-disabled");
        startBtn.disabled = false;
    }, 
};

console.log(deltaTime);


flatpickr(dataInput, options);
startBtn.addEventListener('click', () => {
  timer.start();});

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    
    this.isActive = true;

    this.intervalId = setInterval(() => {
     
         deltaTime = deltaTime - 1000;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      updateClock({ days, hours, minutes, seconds });
      console.log(`${days}:${hours}:${minutes}:${seconds}`);
    }, 1000)
  },
};


function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

function updateClock({ days, hours, minutes, seconds }) {
  daysEL.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
};

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}