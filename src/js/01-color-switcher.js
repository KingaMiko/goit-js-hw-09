'use strict';

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyBg = document.querySelector('body');

let intrevalId;

const startColorChange = () => {
  startBtn.disabled = true;
  //In this task, after clicking the "start" button, the color changes immediately and then in the 1000 ms interval. Thanks to this we will avoid that awkward moment when after clicking "start nothing happens.
  bodyBg.style.backgroundColor = getRandomHexColor();
  intrevalId = setInterval(() => {
    bodyBg.style.backgroundColor = getRandomHexColor();
  }, 1000);
  stopBtn.disabled = false;
};

const stopColorChange = () => {
  startBtn.disabled = false;
  clearInterval(intrevalId);
  stopBtn.disabled = true;
};

startBtn.addEventListener('click', startColorChange);
stopBtn.addEventListener('click', stopColorChange);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
