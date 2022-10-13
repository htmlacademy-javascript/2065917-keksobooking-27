import {
  RANDOM_TITLES,
  RANDOM_DESCRIPTION,
  PRICE_RANGE,
  HOUSING_TYPE,
  ROOMS_RANGE,
  GUESTS_RANGE,
  CHECK_TIMING,
  FEATURES,
  PHOTOS,
  LAT_RANGE,
  LNG_RANGE
} from './data-set.js';

import {
  getRandomInt,
  getRandomFloat,
  generateRandomIndex,
  getRandomArrayFromArray
} from './utils.js';

// ГЕНЕРАЦИЯ СЛУЧАЙНЫХ ОБЪЯВЛЕНИЙ

// функция создает рандомный объект объявления
const getAdvt = (number = 1) => {
  const lat = getRandomFloat(...Object.values(LAT_RANGE));
  const lng = getRandomFloat(...Object.values(LNG_RANGE));

  return {
    author: {avatar: `img/avatars/user${number.toString().padStart(2, '0')}.png`},
    offer: {
      title: RANDOM_TITLES[getRandomInt(0, RANDOM_TITLES.length - 1)],
      address: `${lat}, ${lng}`,
      price: getRandomInt(...Object.values(PRICE_RANGE)) * PRICE_RANGE.factor,
      type: HOUSING_TYPE[getRandomInt(1, HOUSING_TYPE.length - 1)],
      rooms: getRandomInt(...Object.values(ROOMS_RANGE)),
      guests: getRandomInt(...Object.values(GUESTS_RANGE)),
      checkin: CHECK_TIMING[getRandomInt(1, CHECK_TIMING.length - 1)],
      checkout: CHECK_TIMING[getRandomInt(1, CHECK_TIMING.length - 1)],
      features: getRandomArrayFromArray(FEATURES),
      description: RANDOM_DESCRIPTION[getRandomInt(0, RANDOM_DESCRIPTION.length - 1)],
      photos: getRandomArrayFromArray(PHOTOS),
    },
    location: {lat: lat, lng: lng}
  };
};

// функция создает массив заданной длины рандомных объектов объявлений
const getFewAdvt = (quantity = 1) => {
  const userCounter = generateRandomIndex(); // генератор индексов аватаров пользователей
  return Array.from({length: quantity}, () => getAdvt(userCounter(1, quantity)));
};

export {
  getAdvt,
  getFewAdvt
};
