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

import {
  noticeForm,
  noticeFieldSets,
  mapFiltersForm,
  mapFiltersOptions,
  disableForm,
  enableForm, // eslint-disable-line
} from './form.js';

// отключение форм по-умолчанию
disableForm(noticeForm, noticeFieldSets);
disableForm(mapFiltersForm, mapFiltersOptions);

// включение форм после загрузки карты
// enableForm(noticeForm, noticeFieldSets);
// enableForm(mapFiltersForm, mapFiltersOptions);

