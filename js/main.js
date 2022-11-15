import {renderMarker} from './map.js';

import {
  getCards,
  // sendNotice,
} from './data-load.js';

// ЗАГРУЗКА СОСЕДНИХ ОБЪЯВЛЕНИЙ С СЕРВЕРА
getCards((cards) => {
  cards.forEach(renderMarker);
});
