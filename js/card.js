import {HOUSING_TYPES_DICTIONARY} from './constants.js';

// подготовка шаблона карточки
const cardTemplate = document.querySelector('#card').content.querySelector('.popup'); // шаблон объявления

// функция отрисовки карточки по шаблону и данным из объекта
const getNewCard = ({author, offer}) => {
  const cardNode = cardTemplate.cloneNode(true);

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
    photos: offer.photos
  };

  // методы для заполнения необязательных полей
  const fillOptionalFields = {
    fillAvatar() {
      cardNode.querySelector('.popup__avatar').src = optionalValues.avatar;
    },

    fillFeatures() {
      const featureList = cardNode.querySelectorAll('.popup__feature');
      const features = optionalValues.features.map((featureItem) => `popup__feature--${featureItem}`);
      featureList.forEach((listItem) => {
        const feature = listItem.classList[1];
        if (!features.includes(feature)) {
          listItem.remove();
        }
      });
    },

    fillDescription() {
      cardNode.querySelector('.popup__description').textContent = optionalValues.description;
    },

    fillPhotos() {
      const photoTemplate = cardNode.querySelector('.popup__photo');
      const photoNode = cardNode.querySelector('.popup__photos');
      photoNode.removeChild(photoNode.lastElementChild);
      optionalValues.photos.forEach((photoSource) => {
        const newPhoto = photoTemplate.cloneNode(false);
        newPhoto.src = photoSource;
        photoNode.appendChild(newPhoto);
      });
    },
  };

  // обязательные поля
  cardNode.querySelector('.popup__title').textContent = offer.title;
  cardNode.querySelector('.popup__text--address').textContent = offer.address;
  cardNode.querySelector('.popup__text--price').textContent = `${offer.price}`;
  cardNode.querySelector('.popup__text--price').innerHTML += ' <span>₽/ночь</span>';
  cardNode.querySelector('.popup__type').textContent = HOUSING_TYPES_DICTIONARY[offer.type];
  cardNode.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardNode.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;


  // заполение необязательных данных с проверкой на отсутсвие
  Object.keys(optionalValues).forEach((item) => {
    if (
      ['', 0, null, undefined, Infinity].some((v) => v === optionalValues[item]) || Number.isNaN(optionalValues[item])
    ) {
      optionalNodes[item].remove();
    } else {
      switch(item) {
        case 'avatar':
          fillOptionalFields.fillAvatar();
          break;
        case 'features':
          fillOptionalFields.fillFeatures();
          break;
        case 'description':
          fillOptionalFields.fillDescription();
          break;
        case 'photos':
          fillOptionalFields.fillPhotos();
          break;
        default: optionalNodes[item].remove();
      }
    }
  });

  return cardNode;
};

export {getNewCard};
