import {
  RANDOM_TITLES,
  RANDOM_DESCRIPTIONS,
  PRICE_RANGE,
  HOUSING_TYPES,
  ROOMS_RANGE,
  GUESTS_RANGE,
  CHECK_TIMINGS,
  FEATURES,
  PHOTOS,
  LAT_RANGE,
  LNG_RANGE
} from './constants.js';

import {
  getRandomInt,
  getRandomFloat,
  generateRandomIndex,
  getRandomArrayFromArray
} from './utils.js';

// ГЕНЕРАЦИЯ СЛУЧАЙНЫХ ОБЪЯВЛЕНИЙ

// функция создает рандомный объект объявления
const getAdvertisment = (number = 1) => {
  const lat = getRandomFloat(...Object.values(LAT_RANGE));
  const lng = getRandomFloat(...Object.values(LNG_RANGE));

  return {
    author: {avatar: `img/avatars/user${number.toString().padStart(2, '0')}.png`},
    offer: {
      title: RANDOM_TITLES[getRandomInt(0, RANDOM_TITLES.length - 1)],
      address: `${lat}, ${lng}`,
      price: getRandomInt(...Object.values(PRICE_RANGE)) * PRICE_RANGE.factor,
      type: HOUSING_TYPES[getRandomInt(0, HOUSING_TYPES.length - 1)],
      rooms: getRandomInt(...Object.values(ROOMS_RANGE)),
      guests: getRandomInt(...Object.values(GUESTS_RANGE)),
      checkin: CHECK_TIMINGS[getRandomInt(0, CHECK_TIMINGS.length - 1)],
      checkout: CHECK_TIMINGS[getRandomInt(0, CHECK_TIMINGS.length - 1)],
      features: getRandomArrayFromArray(FEATURES),
      description: RANDOM_DESCRIPTIONS[getRandomInt(0, RANDOM_DESCRIPTIONS.length - 1)],
      photos: getRandomArrayFromArray(PHOTOS),
    },
    location: {lat: lat, lng: lng}
  };
};

// функция создает массив заданной длины рандомных объектов объявлений
const getAdvertismentArray = (quantity = 1) => {
  const userCounter = generateRandomIndex();
  if (quantity === 1) {
    return Array.from({length: quantity}, () => getAdvertisment(quantity));
  }
  return Array.from({length: quantity}, () => getAdvertisment(userCounter(1, quantity)));
};

export {getAdvertismentArray};
