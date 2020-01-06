import {
    NOW_DATE, 
    WEEK_AGO_DATE, 
    MONTHS_FOR_CONVERT_DATE, 
    MONTHS_FOR_CAPTION_ANALYTICS_DATA, 
    DAYS} 
from '../modules/Consts';

export class DateCalc {

    // nowDate - текущая дата
    // weekAgoDate - дата - неделей ранее
    getDateForApi() {    
        return {
            nowDate: `${NOW_DATE.getFullYear()}-${NOW_DATE.getMonth() + 1}-${NOW_DATE.getDate()}`,
            weekAgoDate: `${WEEK_AGO_DATE.getFullYear()}-${WEEK_AGO_DATE.getMonth() + 1}-${WEEK_AGO_DATE.getDate()}`
        }
    }

    // для отображения даты в карточке, преобразуем дату в формат вида - (ДД, месяц ГГГГ)
    convertDate(date) {
        const _date = new Date(date);
        const _myDate = new Date(_date.getTime() + _date.getTimezoneOffset() * 60000);
        const _fullDate = _myDate.getDate() + ' ' + MONTHS_FOR_CONVERT_DATE[_myDate.getMonth()] + ', ' + _myDate.getFullYear();
        return _fullDate;
    }

    // получаем название месяца для отображения в заголовке гистограммы аналитики
    captionAnalyticsData(date) {
        const _date = new Date(date);
        const _myDate = new Date(_date.getTime() + _date.getTimezoneOffset() * 60000);
        const _comparsionMonth = MONTHS_FOR_CAPTION_ANALYTICS_DATA[_myDate.getMonth()];
        return _comparsionMonth;
    }

    // преобразуем дату к виду -(ДД, день недели)
    dayWeekData(data) {
        return data.getDate() + ', ' + DAYS[data.getDay()]; 
    }

    // получаем объект с датами недели, для отображения в гистограмме
    getDayWeekData() {
        let _weekAgoDate = WEEK_AGO_DATE;
        let _result = {};
        let _day;
        for (let i = 0; i < 7; i++) {
            _weekAgoDate.setDate(_weekAgoDate.getDate() + i);
            _day = this.dayWeekData(_weekAgoDate);
            _weekAgoDate.setDate(_weekAgoDate.getDate() - i);
            _result[`day${i}`] = _day;    
        }
        return _result;
    }
}