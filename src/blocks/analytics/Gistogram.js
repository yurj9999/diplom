import {TEXT_QUERY_REG} from '../../modules/Consts';

import {
    daysWeekArray,
    daysWeekGraphArray,
    lineGraphArray,
    dataCaption
} from '../../modules/Dom';

export class Gistogram {
    constructor(dateCalc, storage) {
        this.storage = storage;
        this.dateCalc = dateCalc;
        this.dateForApi = this.dateCalc.getDateForApi();
        this.daysObject = this.dateCalc.getDayWeekData();
    }
    loadingGistogram() {

        this._diagramDataCaption();
        this._diagramMake();
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

    // метод отрисовки гистограммы. 
    _diagramMake() {
        
        daysWeekArray.forEach((item, index) => {
            item.textContent = this.daysObject[`day${index}`];
        });

        daysWeekGraphArray.forEach((item, index) => {
            let count = this._queryObject()[`day${index}`];
            if (count === 0) {

                // меняется цвет числа в гистограмме, на черный.
                // так как на светлом фоне, при 0 упоминаний, число 0 плохо видно
                item.style.color = '#000000';
            }
            if (count > 0) {

                // если упоминианий больше 0, но, например, всего 1, то задаем
                // ширину синей линии гистограммы не менее 12px, чтобы число располагалось
                // внутри этой линии, а не за ее пределами
                lineGraphArray[index].style.minWidth = `12px`;
            }
            item.textContent = count;
            lineGraphArray[index].style.width = `${count}%`;
        });
    }

    // алгоритм подсчета упоминаний слова-запроса в заголовках и описании новости
    _queryObject() {
        let matchQueryItem, matchQueryDescription, match;
        let reg;
        const result = {};
        let count;  
        const maxWeek = 7;      

        // запускается цикл по значению ключей объекта daysObject, содержащий список 7-ми дней недели,
        // ключ имеет вид - (days<N>, где N - порядковый номер ключа), значениями
        // являются даты в формате - (число, день недели)
        for (let i = 0; i < maxWeek; i++) {
            reg = new RegExp(this.daysObject[`day${i}`], 'gi');
            count = 0;

            // каждый из дней недели сравнивается на совпадение с датой массива, полученного
            // из localStorage. Даты в этом массиве приводятся к такому же виду, как и 
            // даты из daysObject - (число, день недели)
            this.storage.forEach((item) => {
                const date = new Date(item.publishedAt);
                const utcDateFix = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
                const day = this.dateCalc.dayWeekData(utcDateFix);
                
                match = reg.test(day);
                reg.lastIndex = 0;

                // при совпадении дат, считается количество слов-запросов в заголовке
                // и в описании новости
                if (match) {
                    matchQueryItem = TEXT_QUERY_REG.test(item.title);
                    TEXT_QUERY_REG.lastIndex = 0;
                    matchQueryDescription = TEXT_QUERY_REG.test(item.description);
                    TEXT_QUERY_REG.lastIndex = 0;

                    if (matchQueryItem) {
                        count++;
                    }
                    if (matchQueryDescription) {
                        count++;
                    }
                }
            });

            // результат подсчетов записывается в объект, с ключем формата - (days<N>, где N - порядковый номер ключа)
            result[`day${i}`] = count;
        }
        return result;
    }
}