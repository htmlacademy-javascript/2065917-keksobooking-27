import './card.js';
import './form.js';

import {
  disableForm,
  enableForm, // eslint-disable-line
} from './form.js';

// ОТКЛЮЧЕНИЕ ФОРМ НА ВРЕМЯ ЗАГРУЗКИ КАРТЫ

const noticeForm = document.querySelector('.ad-form'); // форма подачи объявления
const noticeFieldSets = noticeForm.querySelectorAll('fieldset'); // филдсеты формы подачи объявления
const mapFiltersForm = document.querySelector('.map__filters'); // форма фильтров
const mapFiltersOptions = mapFiltersForm.querySelectorAll('fieldset, select'); // фильтры для карты
// Слайдер также должен быть заблокирован

// отключение форм по-умолчанию
disableForm(noticeForm, noticeFieldSets);
disableForm(mapFiltersForm, mapFiltersOptions);

// включение форм после загрузки карты
// enableForm(noticeForm, noticeFieldSets);
// enableForm(mapFiltersForm, mapFiltersOptions);

