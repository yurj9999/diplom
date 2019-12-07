import Swiper from 'swiper';

let Slider = new Swiper ('.swiper-container', {
  loop: true,
  loopedSlides: 3,
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
      nextElementOverflow.setAttribute('style', 'visibility: none;');
      prevElementOverflow.setAttribute('style', 'visibility: none;');
      nextElementOverflow = Slider.slides[Slider.activeIndex + 2].querySelector('.transparency-wrapper__next');
      prevElementOverflow = Slider.slides[Slider.activeIndex - 2].querySelector('.transparency-wrapper__prev');
      nextElementOverflow.setAttribute('style', 'visibility: visible;');
      prevElementOverflow.setAttribute('style', 'visibility: visible;');
    }
  }
});

let nextElementOverflow = Slider.slides[Slider.activeIndex + 2].querySelector('.transparency-wrapper__next');
let prevElementOverflow = Slider.slides[Slider.activeIndex - 2].querySelector('.transparency-wrapper__prev');
nextElementOverflow.setAttribute('style', 'visibility: visible;');
prevElementOverflow.setAttribute('style', 'visibility: visible;');

export {Slider};