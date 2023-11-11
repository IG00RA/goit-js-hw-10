import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  Country,
  RenderItemFunction,
  RenderListFunction,
} from './fetchCountries-v2';

export function fetchCountries(
  userInput: string,
  renderItem: RenderItemFunction,
  renderList: RenderListFunction
): void {
  fetch(
    `https://restcountries.com/v3.1/name/${userInput}?fields=name,capital,population,flags,languages`
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Oops, there is no country with that name');
    })
    .then((data: Country[]) => {
      if (data.length > 10) {
        throw new Error(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (data.length === 1) {
        const languages = data.map(d => d.languages);
        const lang: string[][] = [];
        for (const el of languages) {
          lang.push(Object.values(el));
        }
        const language = lang.join(',').split(',').join(', ');
        return renderItem(data, language);
      }
      renderList(data);
    })
    .catch((error: Error) => {
      Notify.failure(error.message, {
        position: 'center-top',
      });
      throw error;
    });
}
