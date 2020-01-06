import {
    BUTTON_MORE_CONTAINER,
    BUTTON_MORE,
} from '../Dom';

import {Cardmaker} from './Cardmaker';

const cardmaker = new Cardmaker;

export class ButtonMore {
    constructor() {
        this._newsArray = [];
        this._startPosition = 0;
    }

    // метод передачи массива новостей в класс ButtonMore,
    // для определения доступности кнопки "Показать еще"
    loadNewsArray(newsArray) {
        this._newsArray = newsArray;
        this._startPosition = 0;
    }

    // метод, удаляющий кнопку "Показать еще", при достижении
    // последней карточки в массиве
    _stopShow(moreAction) {
        BUTTON_MORE.removeEventListener('click', moreAction);
        cardmaker.blockVisible(BUTTON_MORE_CONTAINER, 'none');
        return;
    }

    // метод кнопки "Показать еще", показывающий следующие три карточки
    showMore(moreAction) {
        this._startPosition = this._startPosition + 3;
        for (let i = 0; i < 3; i++) {
            if (i + this._startPosition >= this._newsArray.length) {
                this._stopShow(moreAction);
            }
            else {
                cardmaker.makeCard(this._newsArray[i + this._startPosition]);
                if (i + 1 + this._startPosition >= this._newsArray.length) {
                    this._stopShow(moreAction);
                }
            }
        }
    }
}