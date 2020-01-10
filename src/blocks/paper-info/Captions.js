import {
    TEXT_QUERY,
    TEXT_QUERY_REG
} from '../../modules/Consts';

import {
    titleAnalytics,
    newsCount,
    titleQueryCount
} from '../../modules/Dom';

export class Captions {
    constructor(storage) {
        this.storage = storage;
    }
    
    loadingCaptions() {
        this._titleQuery();
        this._queryTitlesCount();
    }
    
    // Отображаем запрос пользователя
    _titleQuery() {
        titleAnalytics.textContent = `Вы спросили: «${TEXT_QUERY}»`;
        newsCount.textContent = this.storage.length;
    }

    // подсчитываем количество упоминаний в заголовках
    _queryTitlesCount() {
        const newsTitleArray = [];
        let matchArray;
        let countMatch = 0;

        this.storage.forEach((item, index) => {

            // встречаются запросы, которые возвращают новости, без заголовка
            // в последствии, в коде ниже, могут возникнуть ошибки,
            // поэтому, проверка на null - производит отсев новостей без заголовков
            if (item.title != null) {
                newsTitleArray[index] = item.title;
            }
        });

        newsTitleArray.forEach((item) => {
            matchArray = item.match(TEXT_QUERY_REG);
            if (matchArray != null) {
                countMatch = countMatch + matchArray.length;
            }  
        });
        
        titleQueryCount.textContent = countMatch;
    }
}