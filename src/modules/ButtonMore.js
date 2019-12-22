import {storage} from './Storage';
import {cardmaker} from './Cardmaker';

class ButtonMore {
    constructor() {
        //this._newsArray = storage.load();
        this._arrayPosition = 3;
    }
    buttonMoreActivate() {
        this._buttonMore = document.querySelector('.button-more-cards');
        this._buttonMore.addEventListener('click', () => this._showMore());

        //console.log(this._newsArray);
    }
    _showMore() {

        this._newsArray = storage.load();

        let _nextArrayPosition = this._arrayPosition + 3;
        
        for (let i = this._arrayPosition; i < _nextArrayPosition; ++i) {
            if (i === this._newsArray.length) {
                // убр кнопку
                return;
            } else {
                cardmaker.makeCard(this._newsArray[i]);
                this._arrayPosition = i + 1;    
            }
        }
    }
}

export const buttonMore = new ButtonMore;