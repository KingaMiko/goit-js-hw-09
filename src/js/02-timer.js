//Timestamp
'use strict';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');
import Notiflix from 'notiflix';

const datePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const resetBtn = document.querySelector('[data-reset]');

let intervalId;
const countdownElements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const startCountdown = () => {
  const selectedTimestamp = new Date(datePicker.value).getTime();
  const currentTimestamp = Date.now();

  if (selectedTimestamp <= currentTimestamp) {
    Notiflix.Notify.failure('Please choose a future date');
    return;
  }

  startBtn.disabled = true;
  stopBtn.disabled = false;

  const updateCountdown = () => {
    const timeDifference = selectedTimestamp - Date.now();
    if (timeDifference <= 0) {
      clearInterval(intervalId);
      startBtn.disabled = false;
      return;
    }

    const addLeadingZero = value => {
      return `${value}`.padStart(2, '0');
    };

    const convertMs = ms => {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
      // Remaining days
      const days = Math.floor(ms / day);
      // Remaining hours
      const hours = Math.floor((ms % day) / hour);
      // Remaining minutes
      const minutes = Math.floor(((ms % day) % hour) / minute);
      // Remaining seconds
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);

      return { days, hours, minutes, seconds };
    };

    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    countdownElements.days.textContent = addLeadingZero(days);
    countdownElements.hours.textContent = addLeadingZero(hours);
    countdownElements.minutes.textContent = addLeadingZero(minutes);
    countdownElements.seconds.textContent = addLeadingZero(seconds);
  };

  updateCountdown();
  intervalId = setInterval(updateCountdown, 1000);
};

const stopCountdown = () => {
  clearInterval(intervalId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

const resetCountdown = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  Object.values(countdownElements).forEach(element => {
    element.textContent = '00';
  });
  startBtn.disabled = false;
  stopBtn.disabled = false;
  datePicker._flatpickr.setDate(new Date());
};

startBtn.addEventListener('click', startCountdown);
stopBtn.addEventListener('click', stopCountdown);
resetBtn.addEventListener('click', resetCountdown);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

//Obiekt Date
// 'use strict';
// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// require('flatpickr/dist/themes/dark.css');
// import Notiflix from 'notiflix';

// const datePicker = document.querySelector('#datetime-picker');
// const startBtn = document.querySelector('[data-start]');
// const stopBtn = document.querySelector('[data-stop]');
// const resetBtn = document.querySelector('[data-reset]');

// let intervalId;
// const countdownElements = {
//   days: document.querySelector('[data-days]'),
//   hours: document.querySelector('[data-hours]'),
//   minutes: document.querySelector('[data-minutes]'),
//   seconds: document.querySelector('[data-seconds]'),
// };

// const startCountdown = () => {
//   const selectedDate = new Date(datePicker.value);
//   const currentDate = new Date();

//   if (selectedDate <= currentDate) {
//     Notiflix.Notify.failure('Please choose a date in the future');
//     return;
//   }

//   startBtn.disabled = true;
//   stopBtn.disabled = false;

//   const updateCountdown = () => {
//     const timeDifference = selectedDate.getTime() - Date.now();
//     if (timeDifference <= 0) {
//       clearInterval(intervalId);
//       startBtn.disabled = false;
//       return;
//     }

//     const addLeadingZero = value => {
//       return `${value}`.padStart(2, '0');
//     };

//     const convertMs = ms => {
//       const second = 1000;
//       const minute = second * 60;
//       const hour = minute * 60;
//       const day = hour * 24;
//       // Remaining days
//       const days = Math.floor(ms / day);
//       // Remaining hours
//       const hours = Math.floor((ms % day) / hour);
//       // Remaining minutes
//       const minutes = Math.floor(((ms % day) % hour) / minute);
//       // Remaining seconds
//       const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//       return { days, hours, minutes, seconds };
//     };

//     const { days, hours, minutes, seconds } = convertMs(timeDifference);

//     countdownElements.days.textContent = addLeadingZero(days);
//     countdownElements.hours.textContent = addLeadingZero(hours);
//     countdownElements.minutes.textContent = addLeadingZero(minutes);
//     countdownElements.seconds.textContent = addLeadingZero(seconds);
//   };

//   updateCountdown();
//   intervalId = setInterval(updateCountdown, 1000);
// };

// const stopCountdown = () => {
//   clearInterval(intervalId);
//   startBtn.disabled = false;
//   stopBtn.disabled = true;
// };

// const resetCountdown = () => {
//   if (intervalId) {
//     clearInterval(intervalId);
//     intervalId = null;
//   }
//   Object.values(countdownElements).forEach(element => {
//     element.textContent = '00';
//   });
//   startBtn.disabled = false;
//   stopBtn.disabled = false;
//   datePicker._flatpickr.setDate(new Date());
// };

// startBtn.addEventListener('click', startCountdown);
// stopBtn.addEventListener('click', stopCountdown);
// resetBtn.addEventListener('click', resetCountdown);

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// };

// flatpickr('#datetime-picker', options);
