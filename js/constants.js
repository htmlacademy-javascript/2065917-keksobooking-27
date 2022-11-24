// настройки карты
const MAP_DEFAULT_CENTER = {lat: 35.68238, lng: 139.75225,};
const MAP_DEFAULT_SCALE = 13;
const MARKER_SIZE = 40;
const MAIN_MARKER_SIZE = 52;
const POPUP_OPTIONS = {offset: [0.5, -20]};


// настройки валидации формы
const LAT_LNG_DECIMAL_PLACE = 5;
const PRICE_MAX_VALUE = 100000;
const PRICE_MIN_VALUE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

// связи полей "Количество комнат" и "Количество мест"
const ROOMS_TO_GUESTS = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const GUESTS_TO_ROOMS = {
  '0': ['100'],
  '1': ['1', '2', '3'],
  '2': ['2', '3'],
  '3': ['3'],
};

// словарь для отрисовки карточек
const HOUSING_TYPES_DICTIONARY = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

// настройки фильтрации
const CARDS_MAX_QUANTITY = 10;
const PriceRange = {
  LOW: 10000,
  MIDDLE: 50000,
};

// интервал рендеринга меток на карте
const RENEDER_DELAY = 500;

// валидные типы изображений для загрузки
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = './img/muffin-grey.svg';


export {
  MAP_DEFAULT_CENTER,
  MAP_DEFAULT_SCALE,
  MARKER_SIZE,
  MAIN_MARKER_SIZE,
  POPUP_OPTIONS,
  LAT_LNG_DECIMAL_PLACE,
  PRICE_MAX_VALUE,
  PRICE_MIN_VALUE,
  ROOMS_TO_GUESTS,
  GUESTS_TO_ROOMS,
  HOUSING_TYPES_DICTIONARY,
  CARDS_MAX_QUANTITY,
  PriceRange,
  RENEDER_DELAY,
  FILE_TYPES,
  DEFAULT_AVATAR,
};
