import {
    STORAGE,
    SOURCE,
    MY_KEY,
    PAGE_SIZE,
    COUNTRY_NEWS
} from './Consts';

import {TEXT_SEARCH} from './Dom';

import {Cards} from './CardNewsModules/Cards';

import {Cardmaker} from './CardNewsModules/Cardmaker';

const cards = new Cards;
const cardmaker = new Cardmaker;

export class Api {
    constructor(dateForApi) {
        this._nowDate = dateForApi.nowDate;
        this._weekAgoDate = dateForApi.weekAgoDate;
    }

    // метод отправки поискового запроса
    sendRequest(textSearch) {  
        const _url = `${SOURCE}q=${textSearch}&language=${COUNTRY_NEWS}&from=${this._weekAgoDate}&to=${this._nowDate}&pageSize=${PAGE_SIZE}&apiKey=${MY_KEY}`;
        
        // уничтожение предыдущих карточек
        cardmaker.destroyer();

        // отрисовка блоков, предшествующих получению ответа
        cards.prepareForAnswer();

        // метод блокировки поля ввода, на время получения ответа от сервера
        TEXT_SEARCH.setAttribute('disabled', true);

        fetch(_url)
            .then(result => {
                if (result.ok) {
                    return result.json();
                } else {

                    // в случае ошибки - отрисовывается блок ошибки
                    cards.resultError();
                }
            })
            .then(data => {
                if (data.articles.length === 0) {

                    // если искомых новостей не найдено
                    // отрисовывается пустой блок, с соответствующим
                    // сообщением
                    cards.resultEmpty();
                } else {

                    // если данные получены, сохраняется запрос и сами данные
                    // в localStorage, а также, происходит отрисовка и загрузка
                    // информации
                    STORAGE.textQuery(textSearch);
                    STORAGE.save(data.articles);
                    cards.resultLoading();
                }
            })
            .finally(() => {
                cards.resultFinally();
                TEXT_SEARCH.removeAttribute('disabled');
            })
            .catch(error => {
                cards.resultError();
                TEXT_SEARCH.removeAttribute('disabled');
            })
    }
}