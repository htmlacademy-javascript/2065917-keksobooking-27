import './card.js';
import './form.js';

import {toggleFormMode} from './form.js';

// ОТКЛЮЧЕНИЕ ФОРМ НА ВРЕМЯ ЗАГРУЗКИ КАРТЫ

const forms = document.querySelectorAll('form');
// Слайдер также должен быть заблокирован

// отключение форм по-умолчанию
forms.forEach((form) => toggleFormMode(form));

// включение форм после загрузки карты
forms.forEach((form) => toggleFormMode(form));

