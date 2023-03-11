import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.getElementById('search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

const renderItem = (data, language) => {
  const item = data
    .map(
      ({ flag, name, capital, population }) =>
        `<li style="display: flex"><img src="${flag}" alt="${name}" width="50px" height="40px"><h2 class="country-name"> ${name}</h2></li>
                <li><b>Capital:</b> ${capital}</li>
                <li><b>Population:</b> ${population}</li>
                <li><b>Languages:</b> ${language}</li>
                `
    )
    .join('');
  refs.list.innerHTML = '';
  refs.list.insertAdjacentHTML('beforeend', item);
};

const renderList = data => {
  const list = data
    .map(
      ({ flag, name }) =>
        `<li style="display: flex;font-size: x-large;align-items: center"><img src="${flag}" alt="${name}" width="50px" height="40px"><p class="country-name"> ${name}</p></li>`
    )
    .join('');
  refs.list.innerHTML = '';
  refs.list.insertAdjacentHTML('beforeend', list);
};

function onInputChange(e) {
  const userInput = e.target.value.trim();
  e.target.value = userInput;
  fetchCountries(userInput, renderItem, renderList);
}
