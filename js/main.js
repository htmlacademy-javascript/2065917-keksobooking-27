import {
  getCards,
  // sendNotice,
} from './data-load.js';

import {getNewCard} from './card.js';

import {
  toggleFormMode,
  fillAddress,
  pristine,
} from './form.js';

// ОТКЛЮЧЕНИЕ ФОРМ НА ВРЕМЯ ЗАГРУЗКИ КАРТЫ
const forms = document.querySelectorAll('form');
const slider = document.querySelector('.ad-form__slider');

slider.setAttribute('disabled', true);
forms.forEach((form) => toggleFormMode(form));

// ПОДКЛЮЧЕНИЕ КАРТЫ
const MAP_DEFAULT_CENTER = {lat: 35.68238, lng: 139.75225,};
const MAP_DEFAULT_SCALE = 13;
const MARKER_SIZE = 40;
const MAIN_MARKER_SIZE = 52;

//карта
const map = L.map('map-canvas')
  .on('load', () => {
    forms.forEach((form) => toggleFormMode(form));
    slider.removeAttribute('disabled');
  })
  .setView(MAP_DEFAULT_CENTER, MAP_DEFAULT_SCALE);

L.tileLayer(
  'https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}@2x.jpg?key=oJPXf6zaBAZnjnBlkWnf',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// маркер
const mainMarkerIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_MARKER_SIZE, MAIN_MARKER_SIZE],
  iconAnchor: [MAIN_MARKER_SIZE / 2, MAIN_MARKER_SIZE],
});

const markerIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [MARKER_SIZE, MARKER_SIZE],
  iconAnchor: [MARKER_SIZE / 2, MARKER_SIZE],
});

const mainMarker = L.marker(
  MAP_DEFAULT_CENTER,
  {
    draggable: true,
    icon: mainMarkerIcon,
    zIndexOffset: 1000,
  }
);

mainMarker.addTo(map);
fillAddress(mainMarker.getLatLng());

//заполнение адреса координатами маркера
map.on('click', (evt) => {
  mainMarker.setLatLng(evt.latlng);
  fillAddress(mainMarker.getLatLng());
});

mainMarker.on('moveend', () => {
  fillAddress(mainMarker.getLatLng());
});

// ДОБАВЛЕНИЕ МЕТОК НА КАРТУ

const markerLayer = L.layerGroup().addTo(map);

const renderMarker = (card) => {
  const {lat, lng} = card.location;
  const marker = L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      icon: markerIcon,
    }
  );

  const popupOptions = {
    offset: [0.5, -20],
  };

  marker
    .addTo(markerLayer)
    .bindPopup(getNewCard(card), popupOptions);
};

// загрузка соседних объявлений с сервера
getCards((cards) => {
  cards.forEach(renderMarker);
});

// сброс карты и маркера
const clearFormButton = document.querySelector('.ad-form__reset');
// ================================================================== добавить также сброс при успешной отправки формы !!!
clearFormButton.addEventListener('click', () => {
  map.setView(MAP_DEFAULT_CENTER, MAP_DEFAULT_SCALE);
  map.closePopup();
  slider.noUiSlider.reset();
  pristine.reset();
  mainMarker.setLatLng(MAP_DEFAULT_CENTER);
});
