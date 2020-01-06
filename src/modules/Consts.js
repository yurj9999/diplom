import {Storage} from './Storage';

const NOW = new Date();

// NOW_DATE - конвертируем дату в UTC формат, для корректного отображения даты в карточке
export const NOW_DATE = new Date(NOW.getTime() + NOW.getTimezoneOffset() * 60000);

export const WEEK_AGO_DATE = new Date(NOW_DATE.getFullYear(), NOW_DATE.getMonth(), NOW_DATE.getDate());

// устанавливаем дату - неделя назад
WEEK_AGO_DATE.setDate(WEEK_AGO_DATE.getDate() - 6);

export const MONTHS_FOR_CONVERT_DATE = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
export const MONTHS_FOR_CAPTION_ANALYTICS_DATA = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
export const DAYS = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export const STORAGE = new Storage;
export const NEWS_ARRAY = STORAGE.load();
export const TEXT_QUERY = JSON.parse(localStorage.getItem('query'));
export const TEXT_QUERY_REG = new RegExp(TEXT_QUERY, 'gi');

export const CONTENT_INDEX_RESULT = document.querySelector('.content-index__result');

export const SOURCE ='https://newsapi.org/v2/everything?';
export const MY_KEY = '4027e192fd724e1c94914d595f5d9814';
export const PAGE_SIZE = 100;
export const COUNTRY_NEWS = 'ru';

export const XSS_WARNING = ['<', '>', '(', ')', ';', '=', '/', '.'];
export const SPACES_DELETE_REG = /\s+/g;
