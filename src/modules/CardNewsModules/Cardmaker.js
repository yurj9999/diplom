import {CONTENT_INDEX_RESULT} from '../Consts';

import {DateCalc} from '../DateCalc';

const dateCalc = new DateCalc;

export class Cardmaker {
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

    // метод отображения надписи "Изображение не найдено.", в случае отсутствия изображения новости, на сервере
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

    // метод ниже, уничтожает ранее созданные карточки новостей, подготавливая место для новых
    destroyer() {
        localStorage.clear();
        while (CONTENT_INDEX_RESULT.firstChild) {
            CONTENT_INDEX_RESULT.firstChild.remove();
        }
    }

    // проверка доступности картинки карточки новостей на сервере
    _checkLoadImage(url) {
        const _promise = new Promise((resolve, reject) => {
            const _image = document.createElement('img');
            _image.classList.add('content-index-card__img');
            _image.setAttribute('alt', 'новость');
            _image.setAttribute('src', url);    
            _image.onerror=reject;
            _image.onload = function(){
                resolve(_image);
            };
        });
        return _promise;
    }

    // создание готовой карточки без картинки
    _createBlocks(cardData) {
        this._createCardElements();
        this._addClass();
        this._relatives();
        this._cardLink.setAttribute('href', cardData.url);
        this._cardTextData.textContent = dateCalc.convertDate(cardData.publishedAt);
        this._cardTextWrapperTitle.textContent = cardData.title;
        this._cardTextWrapperMain.textContent = cardData.description; 
        this._cardTextFrom.textContent = cardData.source.name;        
        CONTENT_INDEX_RESULT.appendChild(this._cardLink);
    }

    // добавление картинки новостей, в зависисмости от ее доступности на сервере
    makeCard(cardData) { 
        this.blockVisible(CONTENT_INDEX_RESULT, 'flex');
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