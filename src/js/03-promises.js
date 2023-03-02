import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  button: document.querySelector('button[type="submit"]'),
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

let timeId;
let position = 0;

const onFormSubmit = event => {
  event.preventDefault();
  let amount = refs.amount.value;
  const step = Number(refs.step.value);
  let delay = Number(refs.delay.value);
  while (amount > 0) {
    amount -= 1;
    position++;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
  position = 0;
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    timeId = setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

refs.form.addEventListener('submit', onFormSubmit);
