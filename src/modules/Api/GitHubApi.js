import {GIT_HUB_URL} from '../Consts';

export class GitHubApi {
    getCommites() { 
        return fetch(GIT_HUB_URL)
            .then(result => {
                if (result.ok) {
                    return result.json(); 
                }
            })
            .then(data => {
                return data;
            })
    }
}