export class Storage{

    // сохраняем данные в localStorage, в виде объекта с ключем - (news<N>), где N - присваиваемый порядковый номер новости
    save(newsArray) {  
        newsArray.forEach((item, index) => {
            localStorage.setItem(`news${index}`, JSON.stringify(item));
        });        
    }

    // загружаем данные из localStorage в массив
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

    // сохраняем в localStorage текст запроса с ключем - (query), для использования в разделе "Аналитика"
    textQuery(textSearch) {
        localStorage.setItem('query', JSON.stringify(textSearch));
    }
}