class DateCalc {
    constructor() {
        //this.nowDate = new Date();
        this.now = new Date();
        this.nowDate = new Date(this.now.getTime() + this.now.getTimezoneOffset() * 60000);
        //console.log(this.nowDate);

        this.weekAgoDate = new Date(this.nowDate.getFullYear(), this.nowDate.getMonth(), this.nowDate.getDate());
        this.weekAgoDate.setDate(this.weekAgoDate.getDate() - 6);
    }
    getDateForApi() {    
        return {
            nowDate: `${this.nowDate.getFullYear()}-${this.nowDate.getMonth() + 1}-${this.nowDate.getDate()}`,
            weekAgoDate: `${this.weekAgoDate.getFullYear()}-${this.weekAgoDate.getMonth() + 1}-${this.weekAgoDate.getDate()}`
        }
    }

    convertDate(date) {
        const _months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
        
        //const _myDate = new Date(date);
        const _date = new Date(date);
        const _myDate = new Date(_date.getTime() + _date.getTimezoneOffset() * 60000);
        
        const _fullDate = _myDate.getDate() + ' ' + _months[_myDate.getMonth()] + ', ' + _myDate.getFullYear();
        return _fullDate;
    }

    captionAnalyticsData(date) {
        const _months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        
        const _date = new Date(date);
        const _myDate = new Date(_date.getTime() + _date.getTimezoneOffset() * 60000);
        
        const _comparsionMonth = _months[_myDate.getMonth()];
        return _comparsionMonth;
    }

    dayWeekData(data) {
        const _days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        return data.getDate() + ', ' + _days[data.getDay()]; 
    }

    getDayWeekData() {
        let _weekAgoDate = this.weekAgoDate;
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

export const dateCalc = new DateCalc;

export const dateForApi = dateCalc.getDateForApi();

export const daysObject = dateCalc.getDayWeekData();






/*const nowDate = new Date();
const weekAgoDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
weekAgoDate.setDate(weekAgoDate.getDate() - 6);

class DateCalc {
    constructor() {
        
    }
    toUTCDate() {

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

    captionAnalyticsData(date) {
        const _months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        const _myDate = new Date(date);
        const _comparsionMonth = _months[_myDate.getMonth()];
        return _comparsionMonth;
    }

    dayWeekData(data) {
        const _days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        return data.getDate() + ', ' + _days[data.getDay()]; 
    }

    getDayWeekData(weekAgoDate) {
        let _weekAgoDate = weekAgoDate;
        const _days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
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

export const dateCalc = new DateCalc;

export const dateForApi = dateCalc.getDateForApi(nowDate, weekAgoDate);

export const daysObject = dateCalc.getDayWeekData(weekAgoDate);*/