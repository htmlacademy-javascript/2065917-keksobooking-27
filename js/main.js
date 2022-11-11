import {getAdvertismentArray} from './data.js';
import {getNewCard} from './card.js';
import {
  toggleFormMode,
  fillAddress
} from './form.js';

// ОТКЛЮЧЕНИЕ ФОРМ НА ВРЕМЯ ЗАГРУЗКИ КАРТЫ
const forms = document.querySelectorAll('form');
// =========================================================== Слайдер также должен быть заблокирован!!!

// отключение форм по-умолчанию
forms.forEach((form) => toggleFormMode(form));

// ПОДКЛЮЧЕНИЕ КАРТЫ
// const MAP_DEFAULT_CENTER = {lat: 35.67500, lng: 139.75000,};
const MAP_DEFAULT_CENTER = {lat: 35.68238, lng: 139.75225,};
const MAP_DEFAULT_SCALE = 13;
const MARKER_SIZE = 44;

//карта
const map = L.map('map-canvas')
  .on('load', () => {
    forms.forEach((form) => toggleFormMode(form));
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
  iconSize: [MARKER_SIZE, MARKER_SIZE],
  iconAnchor: [MARKER_SIZE / 2, MARKER_SIZE],
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

//заполнение адреса координатами маркера
mainMarker.on('moveend', (evt) => {
  fillAddress(evt.target.getLatLng());
});

// сброс карты и маркера
const clearFormButton = document.querySelector('.ad-form__reset');
// ================================================================== добавить также сброс при успешной отправки формы !!!
clearFormButton.addEventListener('click', () => {
  mainMarker.setLatLng(MAP_DEFAULT_CENTER);
  map.setView(MAP_DEFAULT_CENTER, MAP_DEFAULT_SCALE);
});


// ДОБАВЛЕНИЕ МЕТОК НА КАРТУ
const ADVERTISMENT_QUANTITY = 10;
const cardArray = getAdvertismentArray(ADVERTISMENT_QUANTITY);

const markerLayer = L.layerGroup().addTo(map);

cardArray.forEach((card) => {
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
});
