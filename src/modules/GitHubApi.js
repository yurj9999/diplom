import {SWIPER_WRAPPER} from './Dom';

import {SliderCards} from './GitHubAPIModules/SliderCards';
import {Slider} from './GitHubAPIModules/Slider';

const sliderCards = new SliderCards;
const slider = new Slider;

export class GitHubApi {
    constructor() {
        this._getCommites();
    }
    _getCommites() {
        const _url = 'https://api.github.com/repos/yurj9999/diplom/commits'        
        fetch(_url)
            .then((result) => {
                if (result.ok) {
                    return result.json(); 
                } else {
                    SWIPER_WRAPPER.appendChild(sliderCards.errorCard('Ошибка получения данных, обновите страницу'));
                    slider.activate(0);
                }
            })
            .then(data => {
                this._showCommites(data);
            })
            .catch(error => {
                SWIPER_WRAPPER.appendChild(sliderCards.errorCard('Ошибка получения данных. ' + error));
                slider.activate(0);
            });
    }
    _showCommites(data) {         
        let _countCards = data.length;
        if (_countCards === 0) {
            SWIPER_WRAPPER.appendChild(sliderCards.errorCard('Коммиты не найдены'));
            slider.activate(_countCards);
        } else {
            if (_countCards > 20) {
                _countCards = 20;
            }
            for (let i = 0; i != _countCards; i++) {
                SWIPER_WRAPPER.appendChild(sliderCards.makeCard(data[i]));  
            }
            slider.activate(_countCards);
        }
    }
}