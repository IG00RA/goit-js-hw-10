import { Notify } from 'notiflix/build/notiflix-notify-aio';
export function fetchCountries(userInput, renderItem, renderList) {
  fetch(
    `https://restcountries.com/v2/name/${userInput}?fields=name,capital,population,flag,languages`
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Notify.failure('Oops, there is no country with that name', {
        position: 'center-top',
      });
    })
    .then(data => {
      if (data) {
        if (data.length > 10) {
          return Notify.info(
            'Too many matches found. Please enter a more specific name.',
            {
              position: 'center-top',
            }
          );
        }
        if (data.length === 1) {
          const language = data.map(d =>
            d.languages.map(language => language.name)
          );
          return renderItem(data, language);
        }

        renderList(data);
      }
    });
}
