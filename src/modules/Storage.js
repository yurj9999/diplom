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

    // проверяем наличие поля с ключем "answer", для дальнейшей отрисовки карточек
    checkLocalstorage() {
        for (let key in localStorage) {
            if (key.includes('answer')) {
                return true;
            }
        }
    }
}