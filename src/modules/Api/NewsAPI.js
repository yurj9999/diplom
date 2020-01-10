import {
    SOURCE,
    MY_KEY,
    PAGE_SIZE,
    COUNTRY_NEWS
} from '../Consts';

export class NewsAPI {
    constructor(dateForApi) {
        this.dateForApi = dateForApi;
        this.nowDate = this.dateForApi.nowDate;
        this.weekAgoDate = this.dateForApi.weekAgoDate;  
    }

    sendRequest(query) {
        const url = `${SOURCE}q=${query}&language=${COUNTRY_NEWS}&from=${this.weekAgoDate}&to=${this.nowDate}&pageSize=${PAGE_SIZE}&apiKey=${MY_KEY}`;

        return fetch(url)
            .then(result => {
                if (result.ok) {
                    return result.json();
                }
            })
            .then(data => {
                return data.articles;
            })
    }
}