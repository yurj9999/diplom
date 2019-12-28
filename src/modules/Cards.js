import {storage} from './Storage';
import {cardmaker} from './Cardmaker';
import {buttonMore} from './ButtonMore';

class Cards {
    constructor() {
        this._resultsBlock = document.querySelector('.content-index');
        this._preloaderBlock = document.querySelector('.preloader-loading');
        this._errorBlock = document.querySelector('.error');
        this._emptyBlock = document.querySelector('.preloader-empty');
        this._analyticsLink = document.querySelector('.index-header-wrapper');
        this._buttonMoreContainer = document.querySelector('.content-index__more');
        this._buttonMore = document.querySelector('.button-more-cards');
        this.loadElement = document.querySelector('.blocks-load');

        this.cardsLoading = this.loadElement.addEventListener('onload', this.resultLoading());
        this._buttonMore.addEventListener('click', () => buttonMore.showMore(this._buttonMoreContainer)); // когда его удалять ?
    }
    prepareForAnswer() {
        cardmaker.blockVisible(this._resultsBlock, 'block');
        cardmaker.blockVisible(this._analyticsLink, 'none');
        cardmaker.blockVisible(this._errorBlock, 'none');
        cardmaker.blockVisible(this._emptyBlock, 'none');
        cardmaker.blockVisible(this._buttonMoreContainer, 'none');
        cardmaker.blockVisible(this._preloaderBlock, 'flex');
    }
    resultError() {
        cardmaker.blockVisible(this._preloaderBlock, 'none');
        cardmaker.blockVisible(this._analyticsLink, 'none');
        cardmaker.blockVisible(this._buttonMoreContainer, 'none');
        cardmaker.blockVisible(this._errorBlock, 'flex');
    }
    resultEmpty() {
        cardmaker.blockVisible(this._preloaderBlock, 'none');
        cardmaker.blockVisible(this._analyticsLink, 'none');
        cardmaker.blockVisible(this._buttonMoreContainer, 'none');
        cardmaker.blockVisible(this._emptyBlock, 'flex');
    }
    _checkLocalstorage() {
        for (let key in localStorage) {
            if (key.includes('news')) {
                return true;
            }
        }
    }
    resultLoading() {
        this.loadElement.removeEventListener('onload', this.cardsLoading); 
        if (this._checkLocalstorage()) {
            cardmaker.blockVisible(this._resultsBlock, 'block');
            cardmaker.blockVisible(this._analyticsLink, 'flex');
            const _newsArray = storage.load();

                console.log(_newsArray);

            if (_newsArray.length > 3) {
                for (let i = 0; i < 3; i ++) {
                    cardmaker.makeCard(_newsArray[i]);    
                }

                buttonMore.loadNewsArray(_newsArray);

                cardmaker.blockVisible(this._buttonMoreContainer, 'flex');
            
            } else {
                _newsArray.forEach((item) => {
                    cardmaker.makeCard(item);
                });
                cardmaker.blockVisible(this._buttonMoreContainer, 'none');
                
            }
        }
    }
    resultFinally() {
        cardmaker.blockVisible(this._preloaderBlock, 'none');
    }
}

export const cards = new Cards;