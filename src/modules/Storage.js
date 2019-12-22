class Storage{
    save(newsArray) {   
        newsArray.forEach((item, index) => {
            localStorage.setItem(`news${index}`, JSON.stringify(item));
        });        
    }
    load() {
        let _newsArray = [];
        let _countNews = 0;
        for (let key in localStorage) {
            if (key.includes('news')) {
                _countNews ++;
            }    
        }
        for (let i = 0; i != _countNews; i ++) {
            _newsArray[i] = JSON.parse(localStorage.getItem(`news${i}`));
        }
        return _newsArray;
    }
}

export const storage = new Storage;