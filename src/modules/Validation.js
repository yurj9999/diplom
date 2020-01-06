import {
    XSS_WARNING,
    SPACES_DELETE_REG
} from './Consts';

import {
    TEXT_SEARCH
} from './Dom';

import {DateCalc} from './DateCalc';

import {Api} from './Api';

const dateCalc = new DateCalc;
const dateForApi = dateCalc.getDateForApi();

const api = new Api(dateForApi);

export class Validation {

    // передаем запрос в метод валидации
    valid() {
        // если строка не пустая, происходит проверка XSS атаки, отправляется
        // запрос. Если строка пустая - выводятся соответствующие сообщения в
        // поле ввода
        if ((TEXT_SEARCH.checkValidity()) && (TEXT_SEARCH.value.trim() !== '')) {
            if (this._xssProtect() !== '') {
                api.sendRequest(this._xssProtect());
                this._updateInput('Введите тему новости');
            } else this._updateInput('Нужно ввести ключевое слово');
        } else this._updateInput('Нужно ввести ключевое слово');
    }

    // метод проверки на XSS атакау
    _xssProtect() {
        let _xssTest = TEXT_SEARCH.value.trim().split('');
        _xssTest.forEach((item, index) => {
            if (XSS_WARNING.includes(item)) {
                _xssTest[index] = ' ';
            }
        });
        return this._textSearchModified(_xssTest.join('')); 
    }

    // обновление placeholder
    _updateInput(str) {
        TEXT_SEARCH.value = '';
        TEXT_SEARCH.setAttribute('placeholder', str);
    }

    // удаление лишних пробелов
    _textSearchModified(textSearch){
        return textSearch.replace(SPACES_DELETE_REG, ' ').trim();
    }
}