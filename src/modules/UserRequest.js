//import {Validation} from './Validation';
import {validation} from './Validation';

//const validation = new Validation;

/*export */class UserRequest{
    constructor(){
        this._textSearch = document.querySelector('.body-search-wrapper__input');
        this._buttonSearch = document.querySelector('.button-search');
        this._buttonSearchEvent = this._buttonSearch.addEventListener('click', () => this._requestProcessing());
    }
    _requestProcessing(){   
        this._buttonSearch.removeEventListener('click', this._buttonSearchEvent);
        validation.valid(this._textSearch);
    }
}

export const userRequest = new UserRequest;