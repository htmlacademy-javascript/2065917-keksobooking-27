import {renderMarker, resetMap} from './map.js';
import {toggleAdForm, setNoticeFormSubmit, resetAdForm} from './form.js';
import {getCards} from './data-load.js';
import {showErrorMessage} from './message.js';
import {toggleFilterForm, filterCards, setFilters, resetFilterForm} from './filter.js';
import {RENEDER_DELAY} from './constants.js';
import {applyDebounce} from './utils.js';

toggleAdForm();
toggleFilterForm();

// функция фильтрации и отрисовки объявлений
const getCardsArray = (cards, cb = '') => filterCards(cards, cb).forEach(renderMarker);

// ЗАГРУЗКА СОСЕДНИХ ОБЪЯВЛЕНИЙ С СЕРВЕРА
getCards(
  (cards) => {
    toggleAdForm();
    getCardsArray(cards);
    setFilters(applyDebounce(
      () => {
        resetMap();
        getCardsArray(cards, () => showErrorMessage('Нет объявлений, удовлетворяющих условию поиска'));
      }, RENEDER_DELAY)
    );
    // setMapDefault(() => getCardsArray(cards));
    setNoticeFormSubmit(() => resetMap({type: 'full'}), resetAdForm, resetFilterForm, () => getCardsArray(cards));
  },
  (er) => showErrorMessage(er.message)
);
