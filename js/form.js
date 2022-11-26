import {sendNotice} from './data-load.js';
import {showModalMessage} from './message.js';
import {
  LAT_LNG_DECIMAL_PLACE,
  PRICE_MAX_VALUE,
  PRICE_MIN_VALUE,
  ROOMS_TO_GUESTS,
  GUESTS_TO_ROOMS,
  DEFAULT_AVATAR,
} from './constants.js';
import {showUploadedImage} from './images.js';

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const avatarChooser = adForm.querySelector('#avatar');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');
const photoChooser = adForm.querySelector('#images');
const photoPreviewContainer = adForm.querySelector('.ad-form__photo');
const photoPreview = document.createElement('img');
const address = adForm.querySelector('#address');
const housingType = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const slider = adForm.querySelector('.ad-form__slider');
const timeFieldset = adForm.querySelector('.ad-form__element--time');
const timeInOut = timeFieldset.querySelectorAll('select');
const roomsField = adForm.querySelector('#room_number');
const guestsFiled = adForm.querySelector('#capacity');
const submitButton = adForm.querySelector('.ad-form__submit');

avatarPreview.style.objectFit = 'cover';
avatarPreview.style.border = '1px solid transparent';
avatarPreview.style.borderRadius = '5px';

photoPreview.style.objectFit = 'cover';
photoPreview.style.width = '100%';
photoPreview.style.height = '100%';
photoPreview.style.border = '1px solid transparent';
photoPreview.style.borderRadius = '5px';

photoPreviewContainer.appendChild(photoPreview);

avatarChooser.addEventListener('change', () => {
  showUploadedImage(avatarChooser, avatarPreview);
});

photoChooser.addEventListener('change', () => {
  showUploadedImage(photoChooser, photoPreview);
});

// функция переключения состояния форм
const toggleFormMode = (formNode, ...otherNodes) => () => {
  formNode.classList.toggle(`${formNode.classList[0]}--disabled`);
  Array.from(formNode.children).forEach((field) => {
    field.disabled = !field.disabled;
  });
  otherNodes.forEach((node) => {
    if (node.hasAttribute('disabled')) {
      node.removeAttribute('disabled');
    } else {
      node.setAttribute('disabled', true);
    }
  });
};

const toggleAdForm = toggleFormMode(adForm, slider);
const toggleFilterForm = toggleFormMode(filterForm);

// валидация формы
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help'
}, true);

Pristine.setLocale('ru');
Pristine.addMessages('ru', {
  required: 'Обязательное поле',
  minlength: 'От 30 до 100 символов',
  maxlength: 'От 30 до 100 символов',
});

//заполнение адреса
address.setAttribute('readonly', 'readonly');

const fillAddress = ({lat, lng}) => {
  address.value = `${lat.toFixed(LAT_LNG_DECIMAL_PLACE)}, ${lng.toFixed(LAT_LNG_DECIMAL_PLACE)}`;
  pristine.validate(address);
};

// валидация цены
price.min = PRICE_MIN_VALUE[housingType.value];
price.max = PRICE_MAX_VALUE;

const validatePrice = () => {
  if (
    price.value !== ''
    && parseInt(price.value, 10) <= price.max
    && parseInt(price.value, 10) >= price.min
  ) {
    return true;
  }
  return false;
};

const getPriceErrorText = () => {
  if (price.value === '') {
    return 'Обязательное поле';
  } else if (parseInt(price.value, 10) > price.max) {
    return `Не более ${PRICE_MAX_VALUE} руб.`;
  } else if (parseInt(price.value, 10) < price.min) {
    return `Не менее ${PRICE_MIN_VALUE[housingType.value]} руб.`;
  }
  return 'Неизвестная ошибка!';
};

//слайдер цены
noUiSlider.create(
  slider,
  {
    range: {
      min: 0,
      '12%': PRICE_MAX_VALUE * 0.01,
      '75%': PRICE_MAX_VALUE * 0.125,
      max: PRICE_MAX_VALUE,
    },
    start: 0,
    step: 1,
    connect: 'lower',
    animate: false,
    format: {
      to: (value) => value.toFixed(0),
      from: (value) => parseFloat(value),
    }
  }
);

slider.noUiSlider.on('change', () => {
  price.value = slider.noUiSlider.get();
});

price.addEventListener('change', () => {
  slider.noUiSlider.set(price.value);
  if (price.value === '') {
    slider.noUiSlider.set(0);
  }
});

//синхронизация времени заезда-выезда
timeFieldset.addEventListener('change', (evt) => {
  timeInOut.forEach((select) => {
    select.value = evt.target.value;
  });
});

// валидация количества комнат и количетсва гостей
const validateRooms = () => ROOMS_TO_GUESTS[roomsField.value].includes(guestsFiled.value);

const validateGuests = () => GUESTS_TO_ROOMS[guestsFiled.value].includes(roomsField.value);

const getRoomsErrorText = () => {
  switch (roomsField.value) {
    case '1': return 'Для 1 гостя';
    case '2': return 'От 1 до 2 гостей';
    case '3': return 'От 1 до 3 гостей';
    case '100': return 'Не для гостей';
    default: return 'Неизвестная ошибка!';
  }
};

const getGuestsErrorText = () => (guestsFiled.value === '0') ? 'Слишком мало комнат' : 'Слишком много гостей';

// валидация формы
pristine.addValidator(price, validatePrice, getPriceErrorText);
pristine.addValidator(roomsField, validateGuests, getRoomsErrorText);
pristine.addValidator(guestsFiled, validateRooms, getGuestsErrorText);

slider.noUiSlider.on('change', () => {
  pristine.validate(price);
});

[housingType].forEach((item) => {
  item.addEventListener('change', () => {
    price.min = PRICE_MIN_VALUE[housingType.value];
    price.placeholder = PRICE_MIN_VALUE[housingType.value];
    if (price.value !== '') {
      pristine.validate(price);
    }
  });
});

[roomsField, guestsFiled].forEach((select) => {
  select.addEventListener('change', () => {
    pristine.validate([roomsField, guestsFiled]);
  });
});

const resetAdForm = () => {
  avatarPreview.src = DEFAULT_AVATAR;
  photoPreview.src = '';
  adForm.reset();
  slider.noUiSlider.reset();
  pristine.reset();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.style.opacity = '0.6';
  submitButton.style.cursor = 'not-allowed';
  submitButton.style.pointerEvents = 'none';
  submitButton.textContent = 'Загрузка...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.style.opacity = '1';
  submitButton.style.cursor = 'pointer';
  submitButton.style.pointerEvents = 'auto';
  submitButton.textContent = 'Опубликовать';
};

const setNoticeFormSubmit = (...resets) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      blockSubmitButton();
      sendNotice(
        () => {
          resets.forEach((reset) => reset());
          unblockSubmitButton();
          showModalMessage('success');
        },
        () => {
          showModalMessage('error');
          unblockSubmitButton();
        },
        new FormData(adForm));
    }
  });
};

export {toggleFilterForm, toggleAdForm, fillAddress, setNoticeFormSubmit, resetAdForm};
