// НАСТРОЙКИ ФИЛЬТРАЦИИ
const CARDS_MAX_QUANTITY = 10;
const PriceRange = {
  LOW: 10000,
  MIDDLE: 50000,
};

const filterForm = document.querySelector('.map__filters');

// ФИЛЬТРАЦИЯ ПОХОЖИХ ОБЪЯВЛЕНИЙ
const filterCards = (cards, cb = '') => {
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

  const filteredCards = cards.slice().filter((card) => compareType(card.offer) && compareRooms(card.offer) && compareGuests(card.offer) && comparePrice(card.offer));

  // проверка на отсутствие объявлений в выборке
  if (filteredCards.length === 0) {
    cb();
  } else {
    return filteredCards.slice(0, CARDS_MAX_QUANTITY);
  }
};

const setFilters = (cb) => {
  filterForm.addEventListener('change', () => cb());
};

const resetFilterForm = () => {
  filterForm.reset();
};

export {filterCards, setFilters, resetFilterForm};
