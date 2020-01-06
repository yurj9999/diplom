import {DateCalc} from '../DateCalc';

const dateCalc = new DateCalc;

export class SliderCards {
    errorCard(errorMessage) {
    
        this._swiperSlide = document.createElement('div');
        this._emptyText = document.createElement('p');
        this._swiperSlide.classList.add('swiper-slide');
        this._emptyText.classList.add('empty-text');
        this._emptyText.textContent = errorMessage;
        this._swiperSlide.appendChild(this._emptyText);
        
        return this._swiperSlide;
    }

    makeCard(data) {

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

        this._slideBlockData.textContent = _date;
        this._userPhoto.setAttribute('src', _avatar);
        this._userContactsName.textContent = _name;
        this._userContactsEmail.textContent = _email;
        this._slideBlockText.textContent = _message;

        return this._swiperSlide;
    }
}