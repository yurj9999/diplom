import {storage} from './Storage';
import {dateCalc, dateForApi, daysObject} from './DateCalc';

class Analytics {
    constructor () {
        this._textQuery = JSON.parse(localStorage.getItem('query'));
        this._titleAnalytics = document.querySelector('.paper-info__title');
        this._results = document.querySelector('.analytics-loading-results');
        this._newsCount = document.querySelector('.news-week-count'); 
        this._titleQueryCount = document.querySelector('.title-query-count');  
        this._dataCaption = document.querySelector('.analytics-caption');      
        
        this._daysWeek = document.querySelectorAll('.graphic-data__text');
        this._daysWeekGraph = document.querySelectorAll('.text-line-wrapper__line-info-text');
        this._lineGraph = document.querySelectorAll('.text-line-wrapper');

        this._loadResults = this._results.addEventListener('onload', this._resultsLoading());
    }
    _resultsLoading() {
        this._results.removeEventListener('onload', this._loadResults);
        this._titleQuery();
        this._newsWeekCount();
        this._queryTitlesCount();
        this._diagramDataCaption();
        this._diagramMake();
    }
    _titleQuery() {
        this._titleAnalytics.textContent = `Вы спросили: «${this._textQuery}»`;
    }
    _newsWeekCount() {
        let _countNews = 0;
        for (let key in localStorage) {
            if (key.includes('news')) {
                _countNews ++;
            }    
        }
        this._newsCount.textContent = _countNews;
    }
    _queryTitlesCount() {
        const _newsArray = storage.load();
        const _newsTitleArray = [];
        const _reg = new RegExp(this._textQuery, 'gi');
        let _matchArray;
        let _countMatch = 0;

        _newsArray.forEach((item, index) => {
            _newsTitleArray[index] = item.title.toLowerCase();
        });

        _newsTitleArray.forEach((item) => {
            _matchArray = item.match(_reg);
            if (_matchArray != null) {
                _countMatch = _countMatch + _matchArray.length;
            }  
        });
        
        this._titleQueryCount.textContent = _countMatch;
    }
    _diagramDataCaption() {
        const _nowMonth = dateCalc.captionAnalyticsData(dateForApi.nowDate);
        const _weekAgoMonth = dateCalc.captionAnalyticsData(dateForApi.weekAgoDate);

        const _reg = new RegExp(_weekAgoMonth, 'gi');
        const _matches = _reg.test(_nowMonth);

        if (_matches) {
            this._dataCaption.textContent = `Дата (${_nowMonth})`;  
        } else {
            this._dataCaption.textContent = `Дата (${_weekAgoMonth} - ${_nowMonth})`;
        }
    }
    _diagramMake() {
        const _daysWeek = Array.from(this._daysWeek);
        const _daysWeekGraph = Array.from(this._daysWeekGraph);
        const _lineGraph = Array.from(this._lineGraph);

        _daysWeek.forEach((item, index) => {
            item.textContent = daysObject[`day${index}`];
        });

        _daysWeekGraph.forEach((item, index) => {
            let _count = this._queryObject()[`day${index}`];
            if (_count === 0) {
                item.style.color = '#000000';
            }
            item.textContent = _count;
            
            _lineGraph[index].style.width = `${_count}%`;
        });
    }
    _queryObject() {
        const _newsArray = storage.load();

        let _result = {};
        let _day;
        let _count = 0;
        let _matchesQuery;
        
        for (let i = 0; i < 7; i++) {
            
            _result[`day${i}`] = 0;

            let _keySearch = daysObject[`day${i}`];
            let _reg = new RegExp(_keySearch, 'gi');

            const _regQuery = new RegExp(this._textQuery, 'gi');

            for (let k = 0; k < _newsArray.length; k++) {
                let _date = new Date(_newsArray[k].publishedAt);
                let _utcDateFix = new Date(_date.getTime() + _date.getTimezoneOffset() * 60000);
                let _day = dateCalc.dayWeekData(_utcDateFix);

                let _match = _reg.test(_day);
                _reg.lastIndex = 0;
                
                if (_match) {
                    
                    _matchesQuery = _regQuery.test(_newsArray[k].title);
                    if (_matchesQuery) {
                        _count++;
                    }

                    _matchesQuery = _regQuery.test(_newsArray[k].description);
                    if (_matchesQuery) {
                        _count++;
                    }
            
                    _result[`day${i}`] = _result[`day${i}`] + _count;
                    _count = 0;
                }
            }
        }
        return _result;        
    }
}

export const analytics = new Analytics;