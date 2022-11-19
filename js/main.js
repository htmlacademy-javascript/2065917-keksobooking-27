import {renderMarker, resetMap} from './map.js';
import {setNoticeFormSubmit, resetAdForm} from './form.js';
import {getCards} from './data-load.js';
import {showErrorMessage} from './message.js';
import {filterCards, setFilters, resetFilterForm} from './filter.js';

// СБРОС КАРТЫ И ФОРМЫ
const resetButton = document.querySelector('.ad-form__reset');

const setMapDefault = (cb) => {
  resetButton.addEventListener('click', () => {
    resetAdForm();
    resetFilterForm();
    resetMap({type: 'full'});
    cb();
  });
};

// функция фильтрации и отрисовки объявлений
const getCardsArray = (cards, cb = '') => filterCards(cards, cb).forEach(renderMarker);

// ЗАГРУЗКА СОСЕДНИХ ОБЪЯВЛЕНИЙ С СЕРВЕРА
getCards(
  (cards) => {
    getCardsArray(cards);
    setFilters(() => {
      resetMap();
      getCardsArray(cards, () => showErrorMessage('Нет объявлений, удовлетворяющих условию поиска'));
    });
    setMapDefault(() => getCardsArray(cards));
    setNoticeFormSubmit(() => resetMap({type: 'full'}), resetAdForm, resetFilterForm, () => getCardsArray(cards));
  },
  (er) => showErrorMessage(er.message)
);

