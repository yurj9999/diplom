//import {Validation} from './Validation';
import {validation} from './Validation';

//const validation = new Validation;

/*export */class UserRequest{
    constructor(){
        this._textSearch = document.querySelector('.body-search-wrapper__input');
        this._buttonSearch = document.querySelector('.button-search');
        this._buttonSearchEvent = this._buttonSearch.addEventListener('click', () => this._requestProcessing());
    }
    blockSearchInput(status) {
        if (status) {
            this._textSearch.setAttribute('disabled', true);
        } else {
            this._textSearch.removeAttribute('disabled');
        }
    }
    _requestProcessing(){   
        this._buttonSearch.removeEventListener('click', this._buttonSearchEvent);
        validation.valid(this._textSearch);
    }
}

export const userRequest = new UserRequest;