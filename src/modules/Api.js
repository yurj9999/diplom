import {storage} from './Storage';
import {cards} from './Cards';
import {cardmaker} from './Cardmaker';

import {userRequest} from './UserRequest';

export class Api {
    constructor(dateForApi) {
        this._source ='https://newsapi.org/v2/everything?';
        this._myKey = '4027e192fd724e1c94914d595f5d9814';
        this._nowDate = dateForApi.nowDate;
        this._weekAgoDate = dateForApi.weekAgoDate;
        this._pageSize = 100;
        this._countryNews = 'ru';
    }
    sendRequest(textSearch) {  
        const _url = `${this._source}q=${textSearch}&language=${this._countryNews}&from=${this._weekAgoDate}&to=${this._nowDate}&pageSize=${this._pageSize}&apiKey=${this._myKey}`;
        cardmaker.destroyer();
        cards.prepareForAnswer();

        userRequest.blockSearchInput(true);

        fetch(_url)
            .then(result => {
                if (result.ok) {
                    return result.json();
                } else {
                    cards.resultError();
                }
            })
            .then(data => {
                if (data.articles.length === 0) {
                    cards.resultEmpty();
                } else {

                    storage.textQuery(textSearch);

                    storage.save(data.articles);
                    cards.resultLoading();
                }
            })
            .finally(() => {
                cards.resultFinally();
                userRequest.blockSearchInput(false);
            })
            .catch(error => {
                cards.resultError();
                userRequest.blockSearchInput(false);
            })
    }
}