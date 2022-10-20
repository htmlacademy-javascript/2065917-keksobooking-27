import {getFewAdvt} from './data.js';

// const hideEmpty = (node, source) => {
//   if (
//     source === null ||
//     source === undefined ||
//     source === '' ||
//     source === 0 ||
//     Number.isNaN(source) ||
//     !Number.isFinite(source)
//   ) {
//     node.remove();
//   }
// };

// словарь для отрисовки карточек
const HOUSING_TYPE_VALUES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

// подготовка шаблона
const cardTemplate = document.querySelector('#card').content.querySelector('.popup'); // шаблон объявления

// количество генерируемых объектов объявлений
const ADVT_QUANTITY = 10;
const cardArray = getFewAdvt(ADVT_QUANTITY);

const cardArrayFragment = document.createDocumentFragment();

cardArray.forEach(({author, offer}) => {
  const cardNew = cardTemplate.cloneNode(true);

  // текстовые данные
  cardNew.querySelector('.popup__avatar').src = author.avatar;
  cardNew.querySelector('.popup__title').textContent = offer.title;
  cardNew.querySelector('.popup__text--address').textContent = offer.address;
  cardNew.querySelector('.popup__text--price').textContent = `${offer.price} `;
  cardNew.querySelector('.popup__text--price').innerHTML += '<span>₽/ночь</span>';
  cardNew.querySelector('.popup__type').textContent = HOUSING_TYPE_VALUES[offer.type];
  cardNew.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardNew.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const cardDescription = cardNew.querySelector('.popup__description');
  cardDescription.textContent = offer.description;
  // hideEmpty(cardDescription, offer.description);

  // массив фич
  const featureList = cardNew.querySelectorAll('.popup__feature');
  const featureArray = offer.features.map((featureItem) => `popup__feature--${featureItem}`);

  featureList.forEach((listItem) => {
    const feature = listItem.classList[1];

    if (!featureArray.includes(feature)) {
      listItem.remove();
    }
  });

  // массив фотографий
  const photosBlock = cardNew.querySelector('.popup__photos');
  const photoTemplate = cardNew.querySelector('.popup__photo');

  photosBlock.removeChild(photosBlock.lastElementChild);

  offer.photos.forEach((photoSource) => {
    const newPhoto = photoTemplate.cloneNode(false);
    newPhoto.src = photoSource;
    photosBlock.appendChild(newPhoto);
  });

  cardArrayFragment.appendChild(cardNew);
});

export {cardArrayFragment};
