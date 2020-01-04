import Swiper from 'swiper'; // slider.js не нужен ?

import {dateCalc} from './DateCalc';

// удаляются ли обработчики ??

// аутентификация !!! 403

// разбить по отдельным фалам этот модуль и все др модули тоже - при рефакте, созд папки для групп модулей

// доводка - в соот с новыми требованиями (частично)

// каждый класс инкапсулирован - справляется без помощи др классов, делает только, то для чего создан

// добавить комменты

// все константы в отдельный класс
// все элементы в отдельный класс
// все обработчики в отдельный класс
// все экземпляры создаются в нужном месте, экспортируются только сами классы

// после все - рефаторинг в сотв с новыми требованиями

// удалить то что закоменчено


class GitHubApi {
    constructor() {
        this._ghLoad = document.querySelector('.github-load');
        this._ghLoadAction = this._ghLoad.addEventListener('onload', this._ghLoading());
        this._swiperWrapper = document.querySelector('.swiper-wrapper');
    }
    _ghLoading() {
        this._ghLoad.removeEventListener('onload', this._ghLoadAction);
        this._getCommites();    
    }
    _getCommites() {
        const _url = 'https://api.github.com/repos/yurj9999/diplom/commits'        
        
        fetch(_url)
            .then((result) => {
                if (result.ok) {
                    return result.json(); 
                } else {
                    this._swiperWrapper.appendChild(this._errorCardSlider('Ошибка получения данных, обновите страницу'));
                    this._sliderActivate(0);        
                }
            })
            .then(data => {
                this._showCommites(data); // передать в метод отрисовки карточек слайдера
            })
            .catch(error => {
                this._swiperWrapper.appendChild(this._errorCardSlider('Ошибка получения данных. ' + error));
                this._sliderActivate(0);
            });
    }
    _showCommites(data) { 
        
        let _countCards = data.length;
        //const _countCards = 1;

        if (_countCards === 0) {
            this._swiperWrapper.appendChild(this._emptyCardSlider('Коммиты не найдены'));
            this._sliderActivate(_countCards);
            
        } else {
            
            // здеся в цикле выводятся карточки и им подставляются данные

            if (_countCards > 20) {
                _countCards = 20;
            }

            //console.log(data);

            for (let i = 0; i != _countCards; i++) {
                this._swiperWrapper.appendChild(this._makeCardSlider(data[i]));  
            }


            //this._swiperWrapper.appendChild(this._makeCardSlider(data[0])); // передать обьект с данными для textContent
            //this._swiperWrapper.appendChild(this._makeCardSlider());
            //this._swiperWrapper.appendChild(this._makeCardSlider());
        
            /*this._swiperWrapper.appendChild(this._makeCardSlider());
            this._swiperWrapper.appendChild(this._makeCardSlider());
            this._swiperWrapper.appendChild(this._makeCardSlider());*/
            
            this._sliderActivate(_countCards);
        }
        
    }
    _sliderActivate(countCards) {

        let _loop;
        let _loopedSlides;

        if (countCards > 2) {
            _loop = true;
            _loopedSlides = 3;
        } else {
            _loop = false;
            _loopedSlides = 0;
        }

        let nextElementOverflow, prevElementOverflow;

        const Slider = new Swiper ('.swiper-container', {
            
            //loop: true, // если более 2х карточек
            //loopedSlides: 3,

            //loop: _loop, // если 2 и менее карточек
            //loopedSlides: 0,

            loop: _loop,
            loopedSlides: _loopedSlides,
            centeredSlides: true,
            spaceBetween: 16,
            slidesPerView: 'auto',
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            navigation: {
              prevEl: '.swiper-button-next',
              nextEl: '.swiper-button-prev'
            },
            on: {
                slideChange: () => {
                    if (countCards > 2) {
                        nextElementOverflow.style.visibility = 'hidden';
                        prevElementOverflow.style.visibility = 'hidden';
                        nextElementOverflow = Slider.slides[Slider.activeIndex + 2].querySelector('.transparency-wrapper__next');
                        prevElementOverflow = Slider.slides[Slider.activeIndex - 2].querySelector('.transparency-wrapper__prev');
                        nextElementOverflow.style.visibility = 'visible';
                        prevElementOverflow.style.visibility = 'visible';
                    }
                }
            }
        });          

        if (countCards > 2) {
            nextElementOverflow = Slider.slides[Slider.activeIndex + 2].querySelector('.transparency-wrapper__next');
            prevElementOverflow = Slider.slides[Slider.activeIndex - 2].querySelector('.transparency-wrapper__prev');

            nextElementOverflow.style.visibility = 'visible';
            prevElementOverflow.style.visibility = 'visible';
        }
    }
    _errorCardSlider(errorMessage) {
    
        this._swiperSlide = document.createElement('div');
        this._emptyText = document.createElement('p');
        this._swiperSlide.classList.add('swiper-slide');
        this._emptyText.classList.add('empty-text');
        this._emptyText.textContent = errorMessage;
        this._swiperSlide.appendChild(this._emptyText);
        
        return this._swiperSlide;
    }
    _makeCardSlider(data) {

        //console.log(data);

        const _date = dateCalc.convertDate(data.commit.committer.date);
        const _avatar = data.author.avatar_url;
        const _name = data.commit.committer.name;
        const _email = data.commit.committer.email;
        const _message = data.commit.message;

        this._swiperSlide = document.createElement('div');
        this._slideBlock = document.createElement('div');
        this._slideBlockData = document.createElement('p');
        this._slideBlockUser = document.createElement('div');
        this._userPhoto = document.createElement('img');
        this._userContacts = document.createElement('div');
        this._userContactsName = document.createElement('p');
        this._userContactsEmail = document.createElement('p');
        this._slideBlockText = document.createElement('p');
        this._transparencyWrapper = document.createElement('div');
        this._transparencyWrapperNext = document.createElement('div');
        this._transparencyWrapperPrev = document.createElement('div');
        
        this._swiperSlide.appendChild(this._slideBlock);
        this._swiperSlide.appendChild(this._transparencyWrapper);

        this._slideBlock.appendChild(this._slideBlockData);
        this._slideBlock.appendChild(this._slideBlockUser);
        this._slideBlock.appendChild(this._slideBlockText);

        this._slideBlockUser.appendChild(this._userPhoto);
        this._slideBlockUser.appendChild(this._userContacts);

        this._transparencyWrapper.appendChild(this._transparencyWrapperNext);
        this._transparencyWrapper.appendChild(this._transparencyWrapperPrev);

        this._userContacts.appendChild(this._userContactsName);
        this._userContacts.appendChild(this._userContactsEmail);

        this._swiperSlide.classList.add('swiper-slide');
        this._slideBlock.classList.add('slide-block');
        this._slideBlockData.classList.add('slide-block__data');
        this._slideBlockUser.classList.add('slide-block__user');
        this._userPhoto.classList.add('user-photo');
        this._userContacts.classList.add('user-contacts');
        this._userContactsName.classList.add('user-contacts__name');
        this._userContactsEmail.classList.add('user-contacts__email');
        this._slideBlockText.classList.add('slide-block__text');
        this._transparencyWrapper.classList.add('transparency-wrapper');
        this._transparencyWrapperNext.classList.add('transparency-wrapper__next');
        this._transparencyWrapperPrev.classList.add('transparency-wrapper__prev');

        this._userPhoto.setAttribute('alt', 'фотография пользователя');

        /*console.log(_date);
        console.log(_avatar);
        console.log(_name);
        console.log(_email);
        console.log(_message);*/

        this._slideBlockData.textContent = _date;
        this._userPhoto.setAttribute('src', _avatar);
        this._userContactsName.textContent = _name;
        this._userContactsEmail.textContent = _email;
        this._slideBlockText.textContent = _message;

        return this._swiperSlide;
    }
}

export const gitHubApi = new GitHubApi;