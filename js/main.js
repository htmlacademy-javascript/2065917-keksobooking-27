import {getAdvertismentArray} from './data.js';
import {getNewCard} from './card.js';
import {toggleFormMode} from './form.js';

// ДОБАВЛЕНИЕ КАРТОЧЕК НА КАРТУ

// массив генерируемых объектов
const ADVERTISMENT_QUANTITY = 1;
const cardArray = getAdvertismentArray(ADVERTISMENT_QUANTITY);

// рендеринг карточек
const mapCanvas = document.querySelector('#map-canvas');
const cardArrayFragment = document.createDocumentFragment();

cardArray.forEach((item) => cardArrayFragment.appendChild(getNewCard(item)));
mapCanvas.appendChild(cardArrayFragment);

// ОТКЛЮЧЕНИЕ ФОРМ НА ВРЕМЯ ЗАГРУЗКИ КАРТЫ

const forms = document.querySelectorAll('form');
// Слайдер также должен быть заблокирован

// отключение форм по-умолчанию
forms.forEach((form) => toggleFormMode(form));

// включение форм после загрузки карты
// forms.forEach((form) => toggleFormMode(form));

