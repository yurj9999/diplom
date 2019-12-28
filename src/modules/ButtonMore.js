import {storage} from './Storage';
import {cardmaker} from './Cardmaker';

// заблокировать поле на время запроса

// удалить обработчик
// сформировать карточку со всеми фичами
// доводка - в соот с новыми требованиями (частично) - массив событий, экспорт не экземпляра, посм что улучшить
//          по использ/передаче данных

class ButtonMore {
    constructor() {
        this._newsArray = [];
        this._startPosition = 0;
    }
    loadNewsArray(newsArray) {
        this._newsArray = newsArray;
        this._startPosition = 0;
    }
    showMore(moreContainer) {
        this._startPosition = this._startPosition + 3;
        for (let i = 0; i < 3; i++) {
            if (i + this._startPosition === this._newsArray.length) {
                cardmaker.blockVisible(moreContainer, 'none');
                break;
            } else {
                cardmaker.makeCard(this._newsArray[i + this._startPosition]);
            }
        }
        console.log(this._startPosition);
    }
}

export const buttonMore = new ButtonMore;