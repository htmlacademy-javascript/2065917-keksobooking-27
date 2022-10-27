import {getAdvertismentArray} from './data.js';
import {getNewCard} from './card.js';

// массив генерируемых объектов
const ADVERTISMENT_QUANTITY = 1;
const cardArray = getAdvertismentArray(ADVERTISMENT_QUANTITY);

// добавление карточек объявлений на карту
const mapCanvas = document.querySelector('#map-canvas');
const cardArrayFragment = document.createDocumentFragment();

cardArray.forEach((item) => cardArrayFragment.appendChild(getNewCard(item)));
mapCanvas.appendChild(cardArrayFragment);

// import {toggleFormMode} from './form.js';
import {toggleFormMode, toggleFieldsetMode} from './form.js';

// ОТКЛЮЧЕНИЕ ФОРМ НА ВРЕМЯ ЗАГРУЗКИ КАРТЫ

// const noticeForm = document.querySelector('.ad-form'); // форма подачи объявления
// const noticeFieldSets = noticeForm.querySelectorAll('fieldset'); // филдсеты формы подачи объявления
// const mapFiltersForm = document.querySelector('.map__filters'); // форма фильтров
// const mapFiltersOptions = mapFiltersForm.querySelectorAll('fieldset, select'); // фильтры для карты
// Слайдер также должен быть заблокирован

// отключение форм по-умолчанию
// toggleFormMode(noticeForm, noticeFieldSets);
// toggleFormMode(mapFiltersForm, mapFiltersOptions);

// включение форм после загрузки карты
// toggleFormMode(noticeForm, noticeFieldSets);
// toggleFormMode(mapFiltersForm, mapFiltersOptions);


// ОТКЛЮЧЕНИЕ ФОРМ НА ВРЕМЯ ЗАГРУЗКИ КАРТЫ

const forms = document.querySelectorAll('form');
const fieldSets = document.querySelectorAll('fieldset, select');
// Слайдер также должен быть заблокирован

// отключение форм по-умолчанию
forms.forEach((form) => toggleFormMode(form));
fieldSets.forEach((fieldSet) => toggleFieldsetMode(fieldSet));

// включение форм после загрузки карты
// forms.forEach((form) => toggleFormMode(form));
// fieldSets.forEach((fieldSet) => toggleFieldsetMode(fieldSet));

