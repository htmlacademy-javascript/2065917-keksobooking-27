import './card.js';
import './form.js';

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

