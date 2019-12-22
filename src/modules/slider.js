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
      nextElementOverflow.style.visibility = 'hidden';
      prevElementOverflow.style.visibility = 'hidden';
      nextElementOverflow = Slider.slides[Slider.activeIndex + 2].querySelector('.transparency-wrapper__next');
      prevElementOverflow = Slider.slides[Slider.activeIndex - 2].querySelector('.transparency-wrapper__prev');
      nextElementOverflow.style.visibility = 'visible';
      prevElementOverflow.style.visibility = 'visible';
    }
  }
});

let nextElementOverflow = Slider.slides[Slider.activeIndex + 2].querySelector('.transparency-wrapper__next');
let prevElementOverflow = Slider.slides[Slider.activeIndex - 2].querySelector('.transparency-wrapper__prev');
nextElementOverflow.style.visibility = 'visible';
prevElementOverflow.style.visibility = 'visible';

export {Slider};