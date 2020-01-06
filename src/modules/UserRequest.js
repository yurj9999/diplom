import {BUTTON_SEARCH} from './Dom';

import {Validation} from './Validation';

const validation = new Validation;

export class UserRequest{
    constructor(){
        this._buttonSearchEvent = BUTTON_SEARCH.addEventListener('click', () => this._requestProcessing());
    }
    
    _requestProcessing(){   
        BUTTON_SEARCH.removeEventListener('click', this._buttonSearchEvent);
        validation.valid();
    }
}