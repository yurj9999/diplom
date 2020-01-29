import '../pages/index.css';

import {
    buttonSearch,
    buttonMoreContainer,
    buttonMore
} from '../modules/Dom';

import {UserRequest} from '../blocks/body-search-wrapper/UserRequest';

import {Utilities} from '../modules/Utilities';
import {DateCalc} from '../modules/DateCalc';

import {NewsAPI} from '../modules/Api/NewsAPI';
import {Storage} from '../modules/Storage';

import {Cards} from '../blocks/content-index/Cards';

let query;

const userRequest = new UserRequest;
const utilities = new Utilities;
const dateCalc = () => new DateCalc;

const dateForApi = dateCalc().getDateForApi();
const newsApi = new NewsAPI(dateForApi);

const storage = new Storage;
const cards = new Cards;

const newsLoad = () => {
    if (storage.checkLocalstorage()) {
        cards.newsVisible();
    if (storage.load().length > 3) {
        cards.blockVisible(buttonMoreContainer, 'flex');
    } else {
        cards.blockVisible(buttonMoreContainer, 'none');
    }
    cards.createCardsBlock(storage.load(), dateCalc());
    }
}

if (storage.checkLocalstorage()) {
    cards.starter();
    newsLoad();
}

buttonMore.addEventListener('click', () => cards.showMore(storage.load(), dateCalc()));

buttonSearch.addEventListener('click', () => { 
    query = userRequest.validation();

    if (!!query) { 
        utilities.destroyer();
        cards.starter();
        newsApi.sendRequest(query)
            .then(data => {
                if (data.length === 0) {
    
                    // если искомых новостей не найдено
                    // отрисовывается пустой блок, с соответствующим
                    // сообщением
                    cards.newsEmpty();
                } else {
                    
                    // если данные получены, сохраняется запрос и сами данные
                    // в localStorage, а также, происходит отрисовка и загрузка
                    // информации
                    storage.textQuery(query);
                    storage.save(data);
                    newsLoad();
                }
            })
            .catch(() => {
                cards.newsError();
            });
    }
    
});

