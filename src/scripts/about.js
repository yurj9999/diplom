import '../pages/about.css';

import {swiperWrapper} from '../modules/Dom';

import {DateCalc} from '../modules/DateCalc';

import {SliderCards} from '../blocks/swiper-container/SliderCards';
import {GitHubApi} from '../modules/Api/GitHubApi';
import {Slider} from '../blocks/slider/Slider';

const dateCalc = () => new DateCalc; 
const sliderCards = new SliderCards(dateCalc());
const gitHubApi = new GitHubApi;
const slider = new Slider;

const maxCommitCount = 20;

gitHubApi.getCommites()
    .then(data => {
        let countCards = data.length;
        if (countCards === 0) {
            swiperWrapper.appendChild(sliderCards.errorCard('Коммиты не найдены'));
            slider.activate(countCards);
        } else {
            if (countCards > maxCommitCount) {
                countCards = 20;
            }
            for (let i = 0; i != countCards; i++) {
                swiperWrapper.appendChild(sliderCards.makeCard(data[i]));  
            }
            slider.activate(countCards);
        }
    })
    .catch(() => {
        swiperWrapper.appendChild(sliderCards.errorCard('Ошибка получения данных, обновите страницу'));
        slider.activate(0);
    });
