export class SliderCards {
    constructor(dateCalc) {
        this.dateCalc = dateCalc;
    }
    errorCard(errorMessage) {
        this.swiperSlide = document.createElement('div');
        this.emptyText = document.createElement('p');
        this.swiperSlide.classList.add('swiper-slide');
        this.emptyText.classList.add('empty-text');
        this.emptyText.textContent = errorMessage;
        this.swiperSlide.appendChild(this.emptyText);
        return this.swiperSlide;
    }

    makeCard(data) {

        const date = this.dateCalc.convertDate(data.commit.committer.date);
        const avatar = data.author.avatar_url;
        const name = data.commit.committer.name;
        const email = data.commit.committer.email;
        const message = data.commit.message;

        this.swiperSlide = document.createElement('div');
        this.slideBlock = document.createElement('div');
        this.slideBlockData = document.createElement('p');
        this.slideBlockUser = document.createElement('div');
        this.userPhoto = document.createElement('img');
        this.userContacts = document.createElement('div');
        this.userContactsName = document.createElement('p');
        this.userContactsEmail = document.createElement('p');
        this.slideBlockText = document.createElement('p');
        this.transparencyWrapper = document.createElement('div');
        this.transparencyWrapperNext = document.createElement('div');
        this.transparencyWrapperPrev = document.createElement('div');
        
        this.swiperSlide.appendChild(this.slideBlock);
        this.swiperSlide.appendChild(this.transparencyWrapper);

        this.slideBlock.appendChild(this.slideBlockData);
        this.slideBlock.appendChild(this.slideBlockUser);
        this.slideBlock.appendChild(this.slideBlockText);

        this.slideBlockUser.appendChild(this.userPhoto);
        this.slideBlockUser.appendChild(this.userContacts);

        this.transparencyWrapper.appendChild(this.transparencyWrapperNext);
        this.transparencyWrapper.appendChild(this.transparencyWrapperPrev);

        this.userContacts.appendChild(this.userContactsName);
        this.userContacts.appendChild(this.userContactsEmail);

        this.swiperSlide.classList.add('swiper-slide');
        this.slideBlock.classList.add('slide-block');
        this.slideBlockData.classList.add('slide-block__data');
        this.slideBlockUser.classList.add('slide-block__user');
        this.userPhoto.classList.add('user-photo');
        this.userContacts.classList.add('user-contacts');
        this.userContactsName.classList.add('user-contacts__name');
        this.userContactsEmail.classList.add('user-contacts__email');
        this.slideBlockText.classList.add('slide-block__text');
        this.transparencyWrapper.classList.add('transparency-wrapper');
        this.transparencyWrapperNext.classList.add('transparency-wrapper__next');
        this.transparencyWrapperPrev.classList.add('transparency-wrapper__prev');

        this.userPhoto.setAttribute('alt', 'фотография пользователя');

        this.slideBlockData.textContent = date;
        this.userPhoto.setAttribute('src', avatar);
        this.userContactsName.textContent = name;
        this.userContactsEmail.textContent = email;
        this.slideBlockText.textContent = message;

        return this.swiperSlide;
    }
}