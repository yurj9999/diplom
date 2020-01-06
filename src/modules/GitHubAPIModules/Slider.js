import Swiper from 'swiper';

export class Slider {
    activate(countCards) {
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
        const slider = new Swiper ('.swiper-container', {
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
                        nextElementOverflow = slider.slides[slider.activeIndex + 2].querySelector('.transparency-wrapper__next');
                        prevElementOverflow = slider.slides[slider.activeIndex - 2].querySelector('.transparency-wrapper__prev');
                        nextElementOverflow.style.visibility = 'visible';
                        prevElementOverflow.style.visibility = 'visible';
                    }
                }
            }
        });          
        if (countCards > 2) {
            nextElementOverflow = slider.slides[slider.activeIndex + 2].querySelector('.transparency-wrapper__next');
            prevElementOverflow = slider.slides[slider.activeIndex - 2].querySelector('.transparency-wrapper__prev');
            nextElementOverflow.style.visibility = 'visible';
            prevElementOverflow.style.visibility = 'visible';
        }
    }
}