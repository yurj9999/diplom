import {
    NEWS_ARRAY,
    TEXT_QUERY_REG
} from '../Consts';

import {
    DAYS_WEEK_ARRAY,
    DAYS_WEEK_GRAPH_ARRAY,
    LINE_GRAPH_ARRAY
} from '../Dom';

import {DateCalc} from '../DateCalc';

const dateCalc = new DateCalc;
const daysObject = dateCalc.getDayWeekData();

export class Gistogram {
    constructor() {
        this._diagramMake();
    }

    // метод отрисовки гистограммы. 
    _diagramMake() {
        DAYS_WEEK_ARRAY.forEach((item, index) => {
            item.textContent = daysObject[`day${index}`];
        });

        DAYS_WEEK_GRAPH_ARRAY.forEach((item, index) => {
            let _count = this._queryObject()[`day${index}`];
            if (_count === 0) {

                // меняется цвет числа в гистограмме, на черный.
                // так как на светлом фоне, при 0 упоминаний, число 0 плохо видно
                item.style.color = '#000000';
            }
            if (_count > 0) {

                // если упоминианий больше 0, но, например, всего 1, то задаем
                // ширину синей линии гистограммы не менее 12px, чтобы число располагалось
                // внутри этой линии, а не за ее пределами
                LINE_GRAPH_ARRAY[index].style.minWidth = `12px`;
            }
            item.textContent = _count;
            LINE_GRAPH_ARRAY[index].style.width = `${_count}%`;
        });
    }

    // алгоритм подсчета упоминаний слова-запроса в заголовках и описании новости
    _queryObject() {
        let _matchQueryItem, _matchQueryDescription, _match;
        let _reg;
        let _result = {};
        let _count;        

        // запускается цикл по значению ключей объекта daysObject, содержащий список 7-ми дней недели,
        // ключ имеет вид - (days<N>, где N - порядковый номер ключа), значениями
        // являются даты в формате - (число, день недели)
        for (let i = 0; i < 7; i++) {
            _reg = new RegExp(daysObject[`day${i}`], 'gi');
            _count = 0;

            // каждый из дней недели сравнивается на совпадение с датой массива, полученного
            // из localStorage. Даты в этом массиве приводятся к такому же виду, как и 
            // даты из daysObject - (число, день недели)
            NEWS_ARRAY.forEach((item) => {
                let _date = new Date(item.publishedAt);
                let _utcDateFix = new Date(_date.getTime() + _date.getTimezoneOffset() * 60000);
                let _day = dateCalc.dayWeekData(_utcDateFix);
                
                _match = _reg.test(_day);
                _reg.lastIndex = 0;

                // при совпадении дат, считается количество слов-запросов в заголовке
                // и в описании новости
                if (_match) {
                    _matchQueryItem = TEXT_QUERY_REG.test(item.title);
                    TEXT_QUERY_REG.lastIndex = 0;
                    _matchQueryDescription = TEXT_QUERY_REG.test(item.description);
                    TEXT_QUERY_REG.lastIndex = 0;

                    if (_matchQueryItem) {
                        _count++;
                    }
                    if (_matchQueryDescription) {
                        _count++;
                    }
                }
            });

            // результат подсчетов записывается в объект, с ключем формата - (days<N>, где N - порядковый номер ключа)
            _result[`day${i}`] = _count;
        }
        return _result;
    }
}