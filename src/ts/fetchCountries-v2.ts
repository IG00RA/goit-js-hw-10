import { Notify } from 'notiflix/build/notiflix-notify-aio';

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  capital: string[];
  population: number;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  languages: {
    [key: string]: string;
  };
}

export type RenderItemFunction = (data: Country[], language: string) => void;
export type RenderListFunction = (data: Country[]) => void;

export function fetchCountries(
  userInput: string,
  renderItem: RenderItemFunction,
  renderList: RenderListFunction
): void {
  fetch(
    `https://restcountries.com/v2/name/${userInput}?fields=name,capital,population,flag,languages`
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
        const languages = data.map(d => {
          const languageObj = d.languages;
          if (typeof languageObj === 'object') {
            return Object.values(languageObj).map(lang => {
              if (typeof lang === 'string') {
                return { name: lang } as { name: string };
              } else {
                return lang;
              }
            });
          } else {
            console.error('Expected languages to be an object');
            return [];
          }
        });
        const language = languages.join(', ').split(', ').join(', ');
        renderItem(data, language);
      } else {
        renderList(data);
      }
    })
    .catch((error: Error) => {
      Notify.failure(error.message, {
        position: 'center-top',
      });
    });
}
