import {
    TEXT_QUERY,
    NEWS_ARRAY,
    TEXT_QUERY_REG
} from '../Consts';

import {
    TITLE_ANALYTICS,
    NEWS_COUNT,
    TITLE_QUERY_COUNT,
    DATA_CAPTION
} from '../Dom';

import {DateCalc} from '../DateCalc';

const dateCalc = new DateCalc;
const dateForApi = dateCalc.getDateForApi();

export class Captions {
    constructor() {
        this._titleQuery();
        this._newsWeekCount();
        this._queryTitlesCount();
        this._diagramDataCaption();
    }
    
    // Отображаем запрос пользователя
    _titleQuery() {
        TITLE_ANALYTICS.textContent = `Вы спросили: «${TEXT_QUERY}»`;
    }

    // подсчитываем количество новостей за неделю
    _newsWeekCount() {
        let _countNews = 0;
        for (let key in localStorage) {
            if (key.includes('news')) {
                _countNews ++;
            }    
        }
        NEWS_COUNT.textContent = _countNews;
    }
    
    // подсчитываем количество упоминаний в заголовках
    _queryTitlesCount() {
        let _newsTitleArray = [];
        let _matchArray;
        let _countMatch = 0;

        NEWS_ARRAY.forEach((item, index) => {
            _newsTitleArray[index] = item.title;
        });

        _newsTitleArray.forEach((item) => {
            _matchArray = item.match(TEXT_QUERY_REG);
            if (_matchArray != null) {
                _countMatch = _countMatch + _matchArray.length;
            }  
        });
        
        TITLE_QUERY_COUNT.textContent = _countMatch;
    }

    // отображаем заголовок гистограммы - дата.
    // если дата новости затрагивает предыдущий месяц, то отображается дата формата - (месяц-месяц),
    // если дата - текущий месяц, то формат отображения имеет вид - (месяц) 
    _diagramDataCaption() {
        const _nowMonth = dateCalc.captionAnalyticsData(dateForApi.nowDate);
        const _weekAgoMonth = dateCalc.captionAnalyticsData(dateForApi.weekAgoDate);

        const _reg = new RegExp(_weekAgoMonth, 'gi');
        const _matches = _reg.test(_nowMonth);

        if (_matches) {
            DATA_CAPTION.textContent = `Дата (${_nowMonth})`;  
        } else {
            DATA_CAPTION.textContent = `Дата (${_weekAgoMonth} - ${_nowMonth})`;
        }
    }
}