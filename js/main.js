import {renderMarker, resetMap} from './map.js';
import {toggleFormMode, setNoticeFormSubmit, resetAdForm} from './form.js';
import {getCards} from './data-load.js';
import {showErrorMessage} from './message.js';
import {filterCards, setFilters, resetFilterForm} from './filter.js';
import {RENEDER_DELAY} from './constants.js';
import {debounce} from './utils.js';

// блокировка форм по-умолчанию
const adForm = document.querySelector('.ad-form');
const slider = document.querySelector('.ad-form__slider');
const filterForm = document.querySelector('.map__filters');

[adForm, filterForm].forEach((form) => toggleFormMode(form));
slider.setAttribute('disabled', 'true');

const resetButton = document.querySelector('.ad-form__reset');

// функция фильтрации и отрисовки объявлений
const getCardsArray = (cards, cb = '') => filterCards(cards, cb).forEach(renderMarker);

// СБРОС КАРТЫ И ФОРМЫ
const setMapDefault = (cb) => {
  resetButton.addEventListener('click', () => {
    resetAdForm();
    resetFilterForm();
    resetMap({type: 'full'});
    cb();
  });
};

// ЗАГРУЗКА СОСЕДНИХ ОБЪЯВЛЕНИЙ С СЕРВЕРА
getCards(
  (cards) => {
    toggleFormMode(filterForm);
    getCardsArray(cards);
    setFilters(debounce(
      () => {
        resetMap();
        getCardsArray(cards, () => showErrorMessage('Нет объявлений, удовлетворяющих условию поиска'));
      }, RENEDER_DELAY)
    );
    setMapDefault(() => getCardsArray(cards));
    setNoticeFormSubmit(() => resetMap({type: 'full'}), resetAdForm, resetFilterForm, () => getCardsArray(cards));
  },
  (er) => showErrorMessage(er.message)
);
