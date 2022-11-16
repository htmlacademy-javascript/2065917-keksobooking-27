import {renderMarker, resetMap} from './map.js';
import {setNoticeFormSubmit, resetForm} from './form.js';
import {getCards} from './data-load.js';

// ЗАГРУЗКА СОСЕДНИХ ОБЪЯВЛЕНИЙ С СЕРВЕРА
getCards((cards) => {
  cards.forEach(renderMarker);
});

// ОТПРАВКА ФОРМЫ ОБЪЯВЛЕНИЯ
setNoticeFormSubmit(resetMap, resetForm);

// СБРОС КАРТЫ И ФОРМЫ
const resetButton = document.querySelector('.ad-form__reset');

resetButton.addEventListener('click', () => {
  resetForm();
  resetMap();
});
