export class Storage{

    // сохраняем данные в localStorage, в виде объекта с ключем - (news<N>), где N - присваиваемый порядковый номер новости
    save(newsArray) {  
        localStorage.setItem('answer', JSON.stringify(newsArray));      
    }

    // загружаем данные из localStorage в массив
    load() {
        return JSON.parse(localStorage.getItem('answer'));
    }

    // сохраняем в localStorage текст запроса с ключем - (query), для использования в разделе "Аналитика"
    textQuery(textSearch) {
        localStorage.setItem('query', JSON.stringify(textSearch));
    }
}