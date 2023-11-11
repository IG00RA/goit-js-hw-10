import { Notify } from 'notiflix/build/notiflix-notify-aio';
export function fetchCountries(userInput, renderItem, renderList) {
    fetch(`https://restcountries.com/v2/name/${userInput}?fields=name,capital,population,flag,languages`)
        .then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error('Oops, there is no country with that name');
    })
        .then((data) => {
        if (data.length > 10) {
            throw new Error('Too many matches found. Please enter a more specific name.');
        }
        if (data.length === 1) {
            const languages = data.map(d => {
                const languageObj = d.languages;
                if (typeof languageObj === 'object') {
                    return Object.values(languageObj).map(lang => {
                        if (typeof lang === 'string') {
                            return { name: lang };
                        }
                        else {
                            return lang;
                        }
                    });
                }
                else {
                    console.error('Expected languages to be an object');
                    return [];
                }
            });
            const language = languages.join(', ').split(', ').join(', ');
            renderItem(data, language);
        }
        else {
            renderList(data);
        }
    })
        .catch((error) => {
        Notify.failure(error.message, {
            position: 'center-top',
        });
    });
}
