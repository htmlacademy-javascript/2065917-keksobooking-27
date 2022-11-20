import {CARDS_MAX_QUANTITY, PriceRange} from './constants.js';

const filterForm = document.querySelector('.map__filters');

// фильтрация по чекбоксам
const compareFeatureList = (offer) => {
  const featuresCheckboxes = filterForm.querySelectorAll('input:checked');

  let featuresCounter = 0;

  if (!offer.features) {
    return {shown: false, rank: 0};
  }

  if (featuresCheckboxes.length === 0) {
    return {shown: true, rank: offer.features.length};
  }

  featuresCheckboxes.forEach((checkbox) => {
    if (offer.features.includes(checkbox.value)) {
      featuresCounter++;
    }
  });

  if (featuresCounter === featuresCheckboxes.length) {
    return {shown: true, rank: offer.features.length};
  }

  return {shown: false, rank: 0};
};

// ФИЛЬТРАЦИЯ ПОХОЖИХ ОБЪЯВЛЕНИЙ
const filterCards = (cards, cb = '') => {

  // функции филтрации по выпадающим спискам
  const typeFilter = filterForm.querySelector('#housing-type');
  const priceFilter = filterForm.querySelector('#housing-price');
  const roomsFilter = filterForm.querySelector('#housing-rooms');
  const guestsFilter = filterForm.querySelector('#housing-guests');

  const compareType = (offer) => {
    if (typeFilter.value === 'any') {
      return true;
    } else {
      return offer.type === typeFilter.value;
    }
  };

  const comparePrice = (offer) => {
    if (priceFilter.value === 'any') {
      return true;
    } else {
      switch(priceFilter.value) {
        case 'low' : return offer.price < PriceRange.LOW;
        case 'middle' : return offer.price < PriceRange.MIDDLE && offer.price >= PriceRange.LOW;
        case 'high' : return offer.price >= PriceRange.MIDDLE;
        default: return false;
      }
    }
  };

  const compareRooms = (offer) => {
    if (roomsFilter.value === 'any') {
      return true;
    } else {
      return offer.rooms === +roomsFilter.value;
    }
  };

  const compareGuests = (offer) => {
    if (guestsFilter.value === 'any') {
      return true;
    } else {
      return offer.guests === +guestsFilter.value;
    }
  };

  // фильтрация по выпадающим спискам
  const filteredCards = cards
    .slice()
    .filter((card) => compareType(card.offer) && compareRooms(card.offer) && compareGuests(card.offer) && comparePrice(card.offer));

  // фильтрация по чекбоксам и сортировка по убыванию удобств
  filteredCards.forEach((card) => {
    card.shown = compareFeatureList(card.offer).shown;
    card.rank = compareFeatureList(card.offer).rank;
  });

  const sortedCards = filteredCards
    .filter((card) => card.shown === true)
    .sort((a, b) => b.rank - a.rank);

  // проверка на отсутствие объявлений в выборке и обрезка массива до заданной длины
  if (sortedCards.length === 0) {
    cb();
  } else {
    return sortedCards.slice(0, CARDS_MAX_QUANTITY);
  }
};

const setFilters = (cb) => {
  filterForm.addEventListener('change', () => cb());
};

const resetFilterForm = () => {
  filterForm.reset();
};

export {filterCards, setFilters, resetFilterForm};
