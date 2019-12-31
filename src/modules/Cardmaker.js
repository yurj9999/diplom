import {dateCalc} from './DateCalc';

class Cardmaker {
    constructor() {
        this._contentIndexResult = document.querySelector('.content-index__result');
    }
    _createCardElements() {
        this._cardLink = document.createElement('a');
        this._contentIndexCard = document.createElement('div');
        this._contentIndexCardText = document.createElement('div');
        this._blockWrapper = document.createElement('div');
        this._cardTextData = document.createElement('p');
        this._cardTextWrapper = document.createElement('div');
        this._cardTextWrapperTitle = document.createElement('h4');
        this._cardTextWrapperMain = document.createElement('p');
        this._cardTextFrom = document.createElement('p');
    }
    _addClass() {
        this._cardLink.classList.add('card-link');
        this._contentIndexCard.classList.add('content-index-card');
        this._contentIndexCardText.classList.add('content-index-card__text');
        this._blockWrapper.classList.add('block-wrapper');
        this._cardTextData.classList.add('card-text-data');
        this._cardTextWrapper.classList.add('card-text-wrapper');
        this._cardTextWrapperTitle.classList.add('card-text-wrapper__title');
        this._cardTextWrapperMain.classList.add('card-text-wrapper__main');
        this._cardTextFrom.classList.add('card-text-from');
    }
    _relatives() {
        this._cardLink.appendChild(this._contentIndexCard);
        this._contentIndexCard.appendChild(this._contentIndexCardText);
        this._contentIndexCardText.appendChild(this._blockWrapper);
        this._blockWrapper.appendChild(this._cardTextData);
        this._blockWrapper.appendChild(this._cardTextWrapper);
        this._contentIndexCardText.appendChild(this._cardTextFrom);
        this._cardTextWrapper.appendChild(this._cardTextWrapperTitle);
        this._cardTextWrapper.appendChild(this._cardTextWrapperMain);
    }
    _emptyPicture() {
        this._nonPictureBlock = document.createElement('div');
        this._message = document.createElement('p');
        this._nonPictureBlock.classList.add('non-picture');
        this._message.classList.add('non-picture__message');
        this._message.textContent = 'Изображение не найдено.';
        this._nonPictureBlock.appendChild(this._message);
        return this._nonPictureBlock;
    }
    blockVisible(block, style) {
        block.style.display = style;
    }
    destroyer() {
        localStorage.clear();
        while (this._contentIndexResult.firstChild) {
            this._contentIndexResult.firstChild.remove();
        }
    }
    _checkLoadImage(url) {
        const _promise = new Promise((resolve, reject) => {
            const _image = document.createElement('img');
            _image.classList.add('content-index-card__img');
            _image.setAttribute('alt', 'новость');
            _image.setAttribute('src', url);    
            _image.onerror=reject;
            _image.onload=function(){
                resolve(_image);
            };
        });
        return _promise;
    }
    _createBlocks(cardData) {
        this._createCardElements();
        this._addClass();
        this._relatives();
        this._cardLink.setAttribute('href', cardData.url);
        this._cardTextData.textContent = dateCalc.convertDate(cardData.publishedAt);
        this._cardTextWrapperTitle.textContent = cardData.title;
        this._cardTextWrapperMain.textContent = cardData.description; 
        this._cardTextFrom.textContent = cardData.source.name;        
        this._contentIndexResult.appendChild(this._cardLink);
    }
    makeCard(cardData) { 
        this.blockVisible(this._contentIndexResult, 'flex');
        this._checkLoadImage(cardData.urlToImage)
            .then((img) => {
                this._createBlocks(cardData);
                this._contentIndexCard.insertBefore(img, this._contentIndexCard.firstChild);
            })
            .catch((error) => {
                this._createBlocks(cardData);
                this._contentIndexCard.insertBefore(this._emptyPicture(), this._contentIndexCard.firstChild);
            });   
    }
}

export const cardmaker = new Cardmaker;