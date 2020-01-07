import {
    XSS_WARNING,
    SPACES_DELETE_REG
} from './Consts';

import {input} from './Dom';

export class UserRequest{

    validation() {

        // если строка не пустая, происходит проверка XSS атаки, возвращается обработанный
        // запрос. Если строка пустая - выводятся соответствующие сообщения в
        // поле ввода
        if ((input.checkValidity()) && (input.value.trim() !== '')) {
            if (this._xssProtect() !== '') {
                return this._xssProtect();
            } else this._updateInput('Нужно ввести ключевое слово');
        } else this._updateInput('Нужно ввести ключевое слово');
    }

    // метод проверки на XSS атакау и удаление лишних пробелов
    _xssProtect() {
        const xssTests = input.value.trim().split('');
        xssTests.forEach((item, index) => {
            if (XSS_WARNING.includes(item)) {
                xssTests[index] = ' ';
            }
        });
        return xssTests.join('').replace(SPACES_DELETE_REG, ' ').trim();
    }

    // обновление placeholder
    _updateInput(str) {
        input.value = '';
        input.setAttribute('placeholder', str);
        input.setAttribute('color', 'red');
    }
}