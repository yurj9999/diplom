import '../pages/index.css';

import {
    buttonSearch,
    buttonMoreContainer,
    buttonMore
} from '../modules/Dom';

import {UserRequest} from '../modules/UserRequest';
import {Utilities} from '../modules/Utilities';
import {DateCalc} from '../modules/DateCalc';
import {NewsAPI} from '../modules/NewsAPI';
import {Storage} from '../modules/Storage';
import {Cards} from '../modules/CardsBlock';

let query;
let buttonMoreAction;

const userRequest = new UserRequest;
const utilities = new Utilities;
const dateCalc = () => new DateCalc;

const dateForApi = dateCalc().getDateForApi();
const newsApi = new NewsAPI(dateForApi);

const storage = new Storage;
const cards = new Cards;

const newsLoad = () => {
    if (utilities.checkLocalstorage()) {
        utilities.newsVisible();
    if (storage.load().length > 3) {
        utilities.blockVisible(buttonMoreContainer, 'flex');
    } else {
        utilities.blockVisible(buttonMoreContainer, 'none');
    }
    cards.createCardsBlock(storage.load(), dateCalc());
    }
}

if (utilities.checkLocalstorage()) {
    utilities.starter();
    newsLoad();
}

buttonMoreAction = buttonMore.addEventListener('click', () => cards.showMore(buttonMoreAction, storage.load(), dateCalc()));

const buttonSearchEvent = buttonSearch.addEventListener('click', () => {  
    buttonSearch.removeEventListener('click', buttonSearchEvent);
    buttonMore.removeEventListener('click', buttonMoreAction);
    
    query = userRequest.validation();
    utilities.destroyer();
    utilities.starter();
    newsApi.sendRequest(query)
        .then(data => {
            if (data.length === 0) {

                // если искомых новостей не найдено
                // отрисовывается пустой блок, с соответствующим
                // сообщением
                utilities.newsEmpty();
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
            utilities.newsError();
        });
});
