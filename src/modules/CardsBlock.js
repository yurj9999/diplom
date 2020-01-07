import {} from './Consts';

import {
    input,
    contentIndexResult,
    buttonMore,
    buttonMoreContainer
} from './Dom';

export class Cards {
    constructor() {
        this.startPosition = 0;
    }

    _createCardElements() {
        this.cardLink = document.createElement('a');
        this.contentIndexCard = document.createElement('div');
        this.contentIndexCardText = document.createElement('div');
        this.blockWrapper = document.createElement('div');
        this.cardTextData = document.createElement('p');
        this.cardTextWrapper = document.createElement('div');
        this.cardTextWrapperTitle = document.createElement('h4');
        this.cardTextWrapperMain = document.createElement('p');
        this.cardTextFrom = document.createElement('p');
    }

    _addClass() {
        this.cardLink.classList.add('card-link');
        this.contentIndexCard.classList.add('content-index-card');
        this.contentIndexCardText.classList.add('content-index-card__text');
        this.blockWrapper.classList.add('block-wrapper');
        this.cardTextData.classList.add('card-text-data');
        this.cardTextWrapper.classList.add('card-text-wrapper');
        this.cardTextWrapperTitle.classList.add('card-text-wrapper__title');
        this.cardTextWrapperMain.classList.add('card-text-wrapper__main');
        this.cardTextFrom.classList.add('card-text-from');
    }

    _relatives() {
        this.cardLink.appendChild(this.contentIndexCard);
        this.contentIndexCard.appendChild(this.contentIndexCardText);
        this.contentIndexCardText.appendChild(this.blockWrapper);
        this.blockWrapper.appendChild(this.cardTextData);
        this.blockWrapper.appendChild(this.cardTextWrapper);
        this.contentIndexCardText.appendChild(this.cardTextFrom);
        this.cardTextWrapper.appendChild(this.cardTextWrapperTitle);
        this.cardTextWrapper.appendChild(this.cardTextWrapperMain);
    }

    // метод отображения надписи "Изображение не найдено.", в случае отсутствия изображения новости, на сервере
    _emptyPicture() {
        this.nonPictureBlock = document.createElement('div');
        this.message = document.createElement('p');
        this.nonPictureBlock.classList.add('non-picture');
        this.message.classList.add('non-picture__message');
        this.message.textContent = 'Изображение не найдено.';
        this.nonPictureBlock.appendChild(this.message);    
        return this.nonPictureBlock;
    }

    // проверка доступности картинки карточки новостей на сервере
    _checkLoadImage(url) {
        const promise = new Promise((resolve, reject) => {
            const image = document.createElement('img');
            image.classList.add('content-index-card__img');
            image.setAttribute('alt', 'новость');
            image.setAttribute('src', url);    
            image.onerror=reject;
            image.onload = function(){
                resolve(image);
            };
        });
        return promise;
    }

    // создание готовой карточки без картинки
    _createBlocks(cardData, dateCalc) {
        this._createCardElements();
        this._addClass();
        this._relatives();
        this.cardLink.setAttribute('href', cardData.url);
        this.cardTextData.textContent = dateCalc.convertDate(cardData.publishedAt);
        this.cardTextWrapperTitle.textContent = cardData.title;
        this.cardTextWrapperMain.textContent = cardData.description; 
        this.cardTextFrom.textContent = cardData.source.name;        
        contentIndexResult.appendChild(this.cardLink);
    }

    // добавление картинки новостей, в зависисмости от ее доступности на сервере
    _makeCard(cardData, dateCalc) {        
        this._checkLoadImage(cardData.urlToImage)
            .then((img) => {
                this._createBlocks(cardData, dateCalc);
                this.contentIndexCard.insertBefore(img, this.contentIndexCard.firstChild);
            })
            .catch((error) => {
                this._createBlocks(cardData, dateCalc);
                this.contentIndexCard.insertBefore(this._emptyPicture(), this.contentIndexCard.firstChild);
            });   
    }

    // метод, удаляющий кнопку "Показать еще", при достижении
    // последней карточки в массиве
    _stopShow(moreAction) {
        buttonMore.removeEventListener('click', moreAction);
        buttonMoreContainer.style.display = 'none';
        return;
    }

    // метод кнопки "Показать еще", показывающий следующие три карточки
    showMore(moreAction, storage, dateCalc) {
        this.startPosition = this.startPosition + 3;
        for (let i = 0; i < 3; i++) {
            if (i + this.startPosition >= storage.length) {
                this._stopShow(moreAction);
            }
            else {
                this._makeCard(storage[i + this.startPosition], dateCalc);
                if (i + 1 + this.startPosition >= storage.length) {
                    this._stopShow(moreAction);
                }
            }
        }
    }

    // создание карточек
    createCardsBlock(storage, dateCalc) {
        this.startPosition = 0;
        const cardsLine = 3;
        const lastQuery = JSON.parse(localStorage.getItem('query'));
        if (lastQuery) {
            input.value = lastQuery;
        }
            
        // в случае, если карточек > 3, происходит последовательная отрисовка
        // карточек - по три в каждой строке, при нажатии на кнопку "Показать еще"
        if (storage.length > 3) {        
            for (let i = 0; i < cardsLine; i ++) {        
                this._makeCard(storage[i], dateCalc);    
            }
                
            // если карточек < 3, кнопка "Показать еще" не 
            // требуется, происходит отрисовка имеющихся карточек    
        } else {
            storage.forEach((item) => {
                this._makeCard(item, dateCalc);
            });    
        }
    }
}