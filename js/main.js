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
