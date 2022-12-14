import {MAP_DEFAULT_CENTER, MAP_DEFAULT_SCALE, MARKER_SIZE, MAIN_MARKER_SIZE, POPUP_OPTIONS} from './constants.js';
import {getNewCard} from './card.js';
import {fillAddress, toggleFilterForm} from './form.js';

const map = L.map('map-canvas', {fadeAnimation: false});

map.on('load', () => {
  setTimeout(() => {
    toggleFilterForm();
  }, 0);
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

  marker
    .addTo(markerLayer)
    .bindPopup(getNewCard(card), POPUP_OPTIONS);
};

// сброс карты и маркера
const resetMap = (options = '') => {
  markerLayer.clearLayers();
  map.closePopup();
  if (options.type === 'full') {
    map.setView(MAP_DEFAULT_CENTER, MAP_DEFAULT_SCALE);
    mainMarker.setLatLng(MAP_DEFAULT_CENTER);
  }
};

export {renderMarker, resetMap};

