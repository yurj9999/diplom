import {cardmaker} from './Cardmaker';

class ButtonMore {
    constructor() {
        this._newsArray = [];
        this._startPosition = 0;
    }
    loadNewsArray(newsArray) {
        this._newsArray = newsArray;
        this._startPosition = 0;
    }
    _stopShow(moreContainer, moreButton, moreAction) {
        moreButton.removeEventListener('click', moreAction);
        cardmaker.blockVisible(moreContainer, 'none');
        return;
    }
    showMore(moreContainer, moreButton, moreAction) {
        this._startPosition = this._startPosition + 3;
        for (let i = 0; i < 3; i++) {
            if (i + this._startPosition >= this._newsArray.length) {
                this._stopShow(moreContainer, moreButton, moreAction);
            }
            else {
                cardmaker.makeCard(this._newsArray[i + this._startPosition]);
                if (i + 1 + this._startPosition >= this._newsArray.length) {
                    this._stopShow(moreContainer, moreButton, moreAction);
                }
            }
        }
    }
}

export const buttonMore = new ButtonMore;