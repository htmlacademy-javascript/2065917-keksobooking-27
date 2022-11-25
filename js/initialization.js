import {filterCards, setFilters, resetFilterForm} from './filter.js';
import {toggleAdForm, setNoticeFormSubmit, resetAdForm} from './form.js';
import {renderMarker, resetMap} from './map.js';
import {RENEDER_DELAY} from './constants.js';
import {applyDebounce} from './utils.js';
import {setMapDefault} from './reset-button.js';
import {showErrorMessage} from './message.js';

const getCardsArray = (cards, cb = '') => filterCards(cards, cb).forEach(renderMarker);

const initDataExchange = (cards) => {
  toggleAdForm();
  getCardsArray(cards);
  setFilters(applyDebounce(
    () => {
      resetMap();
      getCardsArray(cards, () => showErrorMessage('Нет объявлений, удовлетворяющих условию поиска'));
    }, RENEDER_DELAY)
  );
  setMapDefault(() => getCardsArray(cards));
  setNoticeFormSubmit(() => resetMap({type: 'full'}), resetAdForm, resetFilterForm, () => getCardsArray(cards));
};

export {initDataExchange};
