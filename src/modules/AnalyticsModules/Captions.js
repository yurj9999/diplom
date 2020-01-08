import {
    TEXT_QUERY,
    TEXT_QUERY_REG
} from '../Consts';

import {
    titleAnalytics,
    newsCount,
    titleQueryCount,
    dataCaption
} from '../Dom';

export class Captions {
    constructor(dateCalc, storage) {
        this.storage = storage;
        this.dateCalc = dateCalc;
        this.dateForApi = this.dateCalc.getDateForApi();
    }
    
    loadingCaptions() {
        this._titleQuery();
        this._queryTitlesCount();
        this._diagramDataCaption();
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

    // отображаем заголовок гистограммы - дата.
    // если дата новости затрагивает предыдущий месяц, то отображается дата формата - (месяц-месяц),
    // если дата - текущий месяц, то формат отображения имеет вид - (месяц) 
    _diagramDataCaption() {
        
        const nowMonth = this.dateCalc.captionAnalyticsData(this.dateForApi.nowDate);
        const weekAgoMonth = this.dateCalc.captionAnalyticsData(this.dateForApi.weekAgoDate);

        const reg = new RegExp(weekAgoMonth, 'gi');
        const matches = reg.test(nowMonth);

        if (matches) {
            dataCaption.textContent = `Дата (${nowMonth})`;  
        } else {
            dataCaption.textContent = `Дата (${weekAgoMonth} - ${nowMonth})`;
        }
    }
}