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
        const newDate = new Date(date);
        const myDate = new Date(newDate.getTime() + newDate.getTimezoneOffset() * 60000);
        const fullDate = myDate.getDate() + ' ' + MONTHS_FOR_CONVERT_DATE[myDate.getMonth()] + ', ' + myDate.getFullYear();
        return fullDate;
    }

    // получаем название месяца для отображения в заголовке гистограммы аналитики
    captionAnalyticsData(date) {
        const newDate = new Date(date);
        const myDate = new Date(newDate.getTime() + newDate.getTimezoneOffset() * 60000);
        const comparsionMonth = MONTHS_FOR_CAPTION_ANALYTICS_DATA[myDate.getMonth()];
        return comparsionMonth;
    }

    // преобразуем дату к виду -(ДД, день недели)
    dayWeekData(data) {
        return data.getDate() + ', ' + DAYS[data.getDay()]; 
    }

    // получаем объект с датами недели, для отображения в гистограмме
    getDayWeekData() {
        const weekAgoDate = WEEK_AGO_DATE;
        const result = {};
        let day;
        for (let i = 0; i < 7; i++) {
            weekAgoDate.setDate(weekAgoDate.getDate() + i);
            day = this.dayWeekData(weekAgoDate);
            weekAgoDate.setDate(weekAgoDate.getDate() - i);
            result[`day${i}`] = day;    
        }
        return result;
    }
}