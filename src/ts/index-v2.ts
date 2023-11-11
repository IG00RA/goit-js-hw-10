import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from '../js/fetchCountries';
import { RenderItemFunction, RenderListFunction } from './fetchCountries-v2';
const DEBOUNCE_DELAY = 300;

interface Refs {
  input: HTMLInputElement | null;
  list: HTMLUListElement | null;
  info: HTMLDivElement | null;
}

const refs: Refs = {
  input: document.getElementById('search-box') as HTMLInputElement,
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input?.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

const renderItem: RenderItemFunction = (data, language) => {
  const item = data
    .map(
      ({ flags, name, capital, population }) =>
        `<li style="display: flex"><img src="${flags}" alt="${name}" width="50px" height="40px"><h2 class="country-name"> ${name}</h2></li>
                <li><b>Capital:</b> ${capital}</li>
                <li><b>Population:</b> ${population}</li>
                <li><b>Languages:</b> ${language}</li>
                `
    )
    .join('');
  refs.list && (refs.list.innerHTML = '');
  refs.list?.insertAdjacentHTML('beforeend', item);
};

const renderList: RenderListFunction = data => {
  const list = data
    .map(
      ({ flags, name }) =>
        `<li style="display: flex;font-size: x-large;align-items: center"><img src="${flags}" alt="${name}" width="50px" height="40px"><p class="country-name"> ${name}</p></li>`
    )
    .join('');
  refs.list && (refs.list.innerHTML = '');
  refs.list?.insertAdjacentHTML('beforeend', list);
};

function onInputChange(e: KeyboardEvent): void {
  const target = e.target as HTMLInputElement;
  const userInput: string = target.value.trim();
  target.value = userInput;
  if (target.value.length > 0) {
    fetchCountries(userInput, renderItem, renderList);
  }
  if (target.value.length === 0) {
    refs.list && (refs.list.innerHTML = '');
  }
}
