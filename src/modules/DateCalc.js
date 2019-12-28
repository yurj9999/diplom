const nowDate = new Date();
const weekAgoDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
weekAgoDate.setDate(weekAgoDate.getDate() - 7);

class DateCalc {
    constructor() {
        
    }
    getDateForApi(nowDate, weekAgoDate) {
        return {
            nowDate: `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`,
            weekAgoDate: `${weekAgoDate.getFullYear()}-${weekAgoDate.getMonth() + 1}-${weekAgoDate.getDate()}`
        }
    }

    convertDate(date) {
        const _months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
        const _myDate = new Date(date);
        const _fullDate = _myDate.getDate() + ' ' + _months[_myDate.getMonth()] + ', ' + _myDate.getFullYear();
        return _fullDate;
    }
}

export const dateCalc = new DateCalc;

export const dateForApi = dateCalc.getDateForApi(nowDate, weekAgoDate);