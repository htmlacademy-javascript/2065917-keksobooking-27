import {getAdvertismentArray} from './data.js';

// массив генерируемых объектов
const ADVERTISMENT_QUANTITY = 1;
const cardArray = getAdvertismentArray(ADVERTISMENT_QUANTITY);

// словарь для отрисовки карточек
const HOUSING_TYPES_DICTIONARY = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

// подготовка шаблона карточки
const mapCanvas = document.querySelector('#map-canvas'); // временный блок с картой
const cardTemplate = document.querySelector('#card').content.querySelector('.popup'); // шаблон объявления
const cardArrayFragment = document.createDocumentFragment(); // фрагмент для рендеринга

// функция отрисовки карточки по шаблону и данным из объекта
const getNewCard = ({author, offer}) => {
  const cardNode = cardTemplate.cloneNode(true);

  // обязательные поля
  cardNode.querySelector('.popup__title').textContent = offer.title;
  cardNode.querySelector('.popup__text--address').textContent = offer.address;
  cardNode.querySelector('.popup__text--price').textContent = `${offer.price}`;
  cardNode.querySelector('.popup__text--price').innerHTML += ' <span>₽/ночь</span>';
  cardNode.querySelector('.popup__type').textContent = HOUSING_TYPES_DICTIONARY[offer.type];
  cardNode.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardNode.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  // необязательные поля
  const optionalNodes = {
    avatar: cardNode.querySelector('.popup__avatar'),
    features: cardNode.querySelector('.popup__features'),
    description: cardNode.querySelector('.popup__description'),
    photos: cardNode.querySelector('.popup__photos'),
  };

  // данные необязятаельных полей
  const optionalValues = {
    avatar: author.avatar,
    features: offer.features,
    description: offer.description,
    photos:offer.photos
  };

  // методы для заполнения необязательных полей
  const nodeCallback = {
    avatar: () => {
      cardNode.querySelector('.popup__avatar').src = optionalValues.avatar;
    },

    features: () => {
      const featureList = cardNode.querySelectorAll('.popup__feature');
      const featureArray = optionalValues.features.map((featureItem) => `popup__feature--${featureItem}`);
      featureList.forEach((listItem) => {
        const feature = listItem.classList[1];
        if (!featureArray.includes(feature)) {
          listItem.remove();
        }
      });
    },

    description: () => {
      cardNode.querySelector('.popup__description').textContent = optionalValues.description;
    },

    photos: () => {
      const photoTemplate = cardNode.querySelector('.popup__photo');
      const photosNode = cardNode.querySelector('.popup__photos');
      photosNode.removeChild(photosNode.lastElementChild);
      optionalValues.photos.forEach((photoSource) => {
        const newPhoto = photoTemplate.cloneNode(false);
        newPhoto.src = photoSource;
        photosNode.appendChild(newPhoto);
      });
    },
  };

  // заполение необязательных данных с проверкой на отсутсвие
  Object.keys(optionalValues).forEach((item) => {
    if (
      ['', 0, null, undefined, Infinity].some((v) => v === optionalValues[item]) || Number.isNaN(optionalValues[item])
    ) {
      optionalNodes[item].remove();
    } else {
      nodeCallback[item]();
    }
  });

  return cardNode;
};

// заполнение фрагмента карточками из массива объектов
cardArray.forEach((item) => cardArrayFragment.appendChild(getNewCard(item)));

// добавление объявлений на карту
mapCanvas.appendChild(cardArrayFragment);
