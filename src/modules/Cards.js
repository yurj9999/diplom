import {storage} from './Storage';
import {cardmaker} from './Cardmaker';

class Cards {
    constructor() {
        this._resultsBlock = document.querySelector('.content-index');
        this._preloaderBlock = document.querySelector('.preloader-loading');
        this._errorBlock = document.querySelector('.error');
        this._emptyBlock = document.querySelector('.preloader-empty');
        this._analyticsLink = document.querySelector('.index-header-wrapper');

        //this._contentIndexResult = document.querySelector('.content-index__result');

        this.loadElement = document.querySelector('.blocks-load');
        this.cardsLoading = this.loadElement.addEventListener('onload', this.resultLoading());
        
    }
    /*_blockVisible(block, style) { // убр в кардмейкер, туда же конст родителя и передать ее там же дестроеру и мейкеру и поменять на сет атр
        block.style.display = style;
    }*/
    prepareForAnswer() {
        /*this._blockVisible(this._resultsBlock, 'block');
        this._blockVisible(this._analyticsLink, 'none');
        this._blockVisible(this._errorBlock, 'none');
        this._blockVisible(this._emptyBlock, 'none');
        this._blockVisible(this._preloaderBlock, 'flex');*/

        cardmaker.blockVisible(this._resultsBlock, 'block');
        cardmaker.blockVisible(this._analyticsLink, 'none');
        cardmaker.blockVisible(this._errorBlock, 'none');
        cardmaker.blockVisible(this._emptyBlock, 'none');
        cardmaker.blockVisible(this._preloaderBlock, 'flex');
    }
    resultError() {
        /*this._blockVisible(this._preloaderBlock, 'none');
        this._blockVisible(this._analyticsLink, 'none');
        this._blockVisible(this._errorBlock, 'flex');*/

        cardmaker.blockVisible(this._preloaderBlock, 'none');
        cardmaker.blockVisible(this._analyticsLink, 'none');
        cardmaker.blockVisible(this._errorBlock, 'flex');
    }
    resultEmpty() {
        /*this._blockVisible(this._preloaderBlock, 'none');
        this._blockVisible(this._analyticsLink, 'none');
        this._blockVisible(this._emptyBlock, 'flex');*/

        cardmaker.blockVisible(this._preloaderBlock, 'none');
        cardmaker.blockVisible(this._analyticsLink, 'none');
        cardmaker.blockVisible(this._emptyBlock, 'flex');
    }
    resultLoading() {
        this.loadElement.removeEventListener('onload', this.cardsLoading);
        if (localStorage.length > 0) {

            const _newsArray = storage.load();

            /*this._blockVisible(this._resultsBlock, 'block');
            this._blockVisible(this._analyticsLink, 'flex');*/

            cardmaker.blockVisible(this._resultsBlock, 'block');
            cardmaker.blockVisible(this._analyticsLink, 'flex');
            
            //this._blockVisible(this._contentIndexResult, 'flex');

            _newsArray.forEach((item, index) => { // отрисовываются ??? для кнопки фик высота, котор увелич при нажатии на высоту карточки + отступы
                //cardmaker.makeCard(item, this._contentIndexResult);
                cardmaker.makeCard(item);
            });

        }
    }
    resultFinally() {
        /*this._blockVisible(this._preloaderBlock, 'none');*/

        cardmaker.blockVisible(this._preloaderBlock, 'none');
    }
}

export const cards = new Cards;