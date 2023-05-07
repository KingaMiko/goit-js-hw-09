'use strict';
import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delayInput = document.querySelector('[name="delay"]');
  const stepInput = document.querySelector('[name="step"]');
  const amountInput = document.querySelector('[name="amount"]');

  const delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  createPromises(delay, step, amount)
    .then(results => {
      results.forEach(result => {
        if (result.shouldResolve) {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${result.position} in ${result.delay}ms`
          );
        } else {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${result.position} in ${result.delay}ms`
          );
        }
      });
    })
    .catch(error => {
      console.error('Błąd:', error);
    });
}

function createPromises(firstDelay, step, amount) {
  let currentDelay = firstDelay;
  let promises = [];

  for (let i = 1; i <= amount; i++) {
    promises.push(createPromise(i, currentDelay));
    currentDelay += step;
  }

  return Promise.all(promises);
}

const createPromise = (position, delay) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      resolve({ position, delay, shouldResolve });
    }, delay);
  });
};
