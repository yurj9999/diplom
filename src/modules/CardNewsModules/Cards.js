import {STORAGE} from '../Consts';

import {
    RESULT_BLOCK,
    PRELOADER_BLOCK,
    ERROR_BLOCK,
    EMPTY_BLOCK,
    ANALYTICS_LINK,
    BUTTON_MORE_CONTAINER,
    BUTTON_MORE,
    LOAD_ELEMENT
} from '../Dom';

import {Cardmaker} from './Cardmaker';

import {ButtonMore} from './ButtonMore';

const cardmaker = new Cardmaker;
const buttonMore = new ButtonMore;

export class Cards {
    constructor() {
        this.cardsLoading = LOAD_ELEMENT.addEventListener('onload', this.resultLoading());
        this._buttonMoreAction = BUTTON_MORE.addEventListener('click', () => buttonMore.showMore(this._buttonMoreAction));
    }

    // отрисовка элементов перед ответом от сервера
    prepareForAnswer() {
        cardmaker.blockVisible(RESULT_BLOCK, 'block');
        cardmaker.blockVisible(ANALYTICS_LINK, 'none');
        cardmaker.blockVisible(ERROR_BLOCK, 'none');
        cardmaker.blockVisible(EMPTY_BLOCK, 'none');
        cardmaker.blockVisible(BUTTON_MORE_CONTAINER, 'none');
        cardmaker.blockVisible(PRELOADER_BLOCK, 'flex');
    }

    // отрисовка элементов в случае ошибки от сервера
    resultError() {
        cardmaker.blockVisible(PRELOADER_BLOCK, 'none');
        cardmaker.blockVisible(ANALYTICS_LINK, 'none');
        cardmaker.blockVisible(BUTTON_MORE_CONTAINER, 'none');
        cardmaker.blockVisible(ERROR_BLOCK, 'flex');
    }

    // отрисовка элементов, при остсутствии карточек
    resultEmpty() {
        cardmaker.blockVisible(PRELOADER_BLOCK, 'none');
        cardmaker.blockVisible(ANALYTICS_LINK, 'none');
        cardmaker.blockVisible(BUTTON_MORE_CONTAINER, 'none');
        cardmaker.blockVisible(EMPTY_BLOCK, 'flex');
    }

    // проверка localStorage на наличие элементов с ключами
    // "news", в случае их наличия, происходит отрисовка карточек
    _checkLocalstorage() {
        for (let key in localStorage) {
            if (key.includes('news')) {
                return true;
            }
        }
    }

    // загрузка ответа с карточками
    resultLoading() {
        LOAD_ELEMENT.removeEventListener('onload', this.cardsLoading);
        
        if (this._checkLocalstorage()) {
            cardmaker.blockVisible(RESULT_BLOCK, 'block');
            cardmaker.blockVisible(ANALYTICS_LINK, 'flex');
            const _newsArray = STORAGE.load();

            // в случае, если карточек > 3, происходит передача 
            // необходимых параметров в метод управления кнопкой
            // "Показать еще"
            if (_newsArray.length > 3) {
                for (let i = 0; i < 3; i ++) {
                    cardmaker.makeCard(_newsArray[i]);    
                }
                buttonMore.loadNewsArray(_newsArray);
                cardmaker.blockVisible(BUTTON_MORE_CONTAINER, 'flex');

            // если карточек < 3, кнопка "Показать еще" не 
            // требуется, происходит отрисовка имеющихся карточек    
            } else {
                _newsArray.forEach((item) => {
                    cardmaker.makeCard(item);
                });
                cardmaker.blockVisible(BUTTON_MORE_CONTAINER, 'none');
            }
        }
    }
    resultFinally() {
        cardmaker.blockVisible(PRELOADER_BLOCK, 'none');
    }
}