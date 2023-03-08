import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.getElementById('search-box'),
};

refs.input.addEventListener('input', onInputChange);

let userInput = '';

function onInputChange(e) {
  console.log(e.target.value);
  userInput = e.target.value;
  fetch(`https://restcountries.com/v3.1/name/${userInput}`);
}

console.log(userInput);
