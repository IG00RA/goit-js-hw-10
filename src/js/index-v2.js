var _a;
import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from '../js/fetchCountries';
const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.getElementById('search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
};
(_a = refs.input) === null || _a === void 0 ? void 0 : _a.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));
const renderItem = (data, language) => {
    var _a;
    const item = data
        .map(({ flags, name, capital, population }) => `<li style="display: flex"><img src="${flags}" alt="${name}" width="50px" height="40px"><h2 class="country-name"> ${name}</h2></li>
                <li><b>Capital:</b> ${capital}</li>
                <li><b>Population:</b> ${population}</li>
                <li><b>Languages:</b> ${language}</li>
                `)
        .join('');
    refs.list && (refs.list.innerHTML = '');
    (_a = refs.list) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', item);
};
const renderList = data => {
    var _a;
    const list = data
        .map(({ flags, name }) => `<li style="display: flex;font-size: x-large;align-items: center"><img src="${flags}" alt="${name}" width="50px" height="40px"><p class="country-name"> ${name}</p></li>`)
        .join('');
    refs.list && (refs.list.innerHTML = '');
    (_a = refs.list) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', list);
};
function onInputChange(e) {
    const target = e.target;
    const userInput = target.value.trim();
    target.value = userInput;
    if (target.value.length > 0) {
        fetchCountries(userInput, renderItem, renderList);
    }
    if (target.value.length === 0) {
        refs.list && (refs.list.innerHTML = '');
    }
}
