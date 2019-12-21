import {dateForApi} from './DateCalc';
import {Api} from './Api';

const api = new Api(dateForApi);

/*export */class Validation {
    constructor() {
        this._xssWarning = ['<', '>', '(', ')', ';', '=', '/', '.'];
        this._spacesDeleteReg = /\s+/g;
    }
    valid(textSearch) {
        if ((textSearch.checkValidity()) && (textSearch.value.trim() !== '')) {
            if (this._xssProtect(textSearch) !== '') {
                api.sendRequest(this._xssProtect(textSearch));
                this._updateInput(textSearch, 'Введите тему новости');
            } else this._updateInput(textSearch, 'Нужно ввести ключевое слово');
        } else this._updateInput(textSearch, 'Нужно ввести ключевое слово');
    }
    _xssProtect(textSearch) {
        let _xssTest = textSearch.value.trim().split('');
        _xssTest.forEach((item, index) => {
            if (this._xssWarning.includes(item)) {
                _xssTest[index] = ' ';
            }
        });
        return this._textSearchModified(_xssTest.join('')); 
    }
    _updateInput(input, str) {
        input.value = '';
        input.setAttribute('placeholder', str);
    }
    _textSearchModified(textSearch){
        return textSearch.replace(this._spacesDeleteReg, ' ').trim();
    }
}

export const validation = new Validation;