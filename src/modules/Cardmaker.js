class Cardmaker {
    constructor() {
        this._contentIndexResult = document.querySelector('.content-index__result');
    }
    _createCardElements() { // и при клике на карточку - переход к источнику
        this._contentIndexCard = document.createElement('div');
        this._contentIndexCardImg = document.createElement('img');
        this._contentIndexCardText = document.createElement('div');
        this._cardTextData = document.createElement('p');
        this._cardTextWrapper = document.createElement('div');
        this._cardTextWrapperTitle = document.createElement('h4');
        this._cardTextWrapperMain = document.createElement('p');
        this._cardTextFrom = document.createElement('p');
    }
    _relatives() {
            /*
            
                <div class="content-index-card">
                    <img class="content-index-card__img" src="<%=require('./images/image_08-min.jpg')%>" alt="фиолетовые цветы">
                    <div class="content-index-card__text">
                        <p class="card-text-data">2 августа, 2019</p>
                        <div class="card-text-wrapper">
                            <h4 class="card-text-wrapper__title">Национальное достояние – парки</h4>
                            <p class="card-text-wrapper__main">В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.</p>                            
                        </div>
                        <p class="card-text-from">Лента.ру</p>
                    </div>
                </div>
            
            */
        
        this._contentIndexCard.appendChild(this._contentIndexCardImg);
        this._contentIndexCard.appendChild(this._contentIndexCardText);
        this._contentIndexCardText.appendChild(this._cardTextData);
        this._contentIndexCardText.appendChild(this._cardTextWrapper);
        this._contentIndexCardText.appendChild(this._cardTextFrom);
        this._cardTextWrapper.appendChild(this._cardTextWrapperTitle);
        this._cardTextWrapper.appendChild(this._cardTextWrapperMain);
    }
    _addClass() {
        this._contentIndexCard.classList.add('content-index-card');
        this._contentIndexCardImg.classList.add('content-index-card__img');
        this._contentIndexCardText.classList.add('content-index-card__text');
        this._cardTextData.classList.add('card-text-data');
        this._cardTextWrapper.classList.add('card-text-wrapper');
        this._cardTextWrapperTitle.classList.add('card-text-wrapper__title');
        this._cardTextWrapperMain.classList.add('card-text-wrapper__main');
        this._cardTextFrom.classList.add('card-text-from');
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
    makeCard(cardData) { 

        this.blockVisible(this._contentIndexResult, 'flex');
        
        this._createCardElements();
        this._addClass();
        this._relatives();

        //this._contentIndexCardImg.setAttribute('src', "<%=require('../images/image_08-min.jpg')%>"); // путь к картинке
        this._contentIndexCardImg.setAttribute('alt', 'новость');
        this._cardTextData.textContent = cardData.publishedAt; // перевести в дату в соотв с макетом методом из DateCalc
        this._cardTextWrapperTitle.textContent = cardData.title;
        this._cardTextWrapperMain.textContent = cardData.description; // убр стили многоточия и сделать их методом жс
        this._cardTextFrom.textContent = cardData.source.name;

        this._contentIndexResult.appendChild(this._contentIndexCard);
        
    }
}

export const cardmaker = new Cardmaker;