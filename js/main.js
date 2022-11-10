import {getAdvertismentArray} from './data.js';
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
const MAP_DEFAULT_CENTER = {lat: 35.67500, lng: 139.75000,};
const MAP_DEFAULT_SCALE = 13;

//карта
const map = L.map('map-canvas')
  .on('load', () => {
    forms.forEach((form) => toggleFormMode(form));
  })
  .setView(MAP_DEFAULT_CENTER, MAP_DEFAULT_SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// маркер
const mainMarkerIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [44, 44],
  iconAnchor: [22, 44],
});

const markerIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [44, 44],
  iconAnchor: [22, 44],
});

const mainMarker = L.marker(
  MAP_DEFAULT_CENTER,
  {
    draggable: true,
    icon: mainMarkerIcon,
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

cardArray.forEach(({location}) => {
  const marker = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: markerIcon,
    }
  );

  marker.addTo(map);
});
