import {toggleFilterForm, toggleAdForm} from './form.js';
import {getCards} from './data-load.js';
import {showErrorMessage} from './message.js';
import {initDataExchange} from './initialization.js';

toggleAdForm();
toggleFilterForm();

getCards(
  (cards) => initDataExchange(cards),
  (er) => showErrorMessage(er.message)
);
