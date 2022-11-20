import {sendNotice} from './data-load.js';
import {showModalMessage} from './message.js';
import {
  PRICE_MAX_VALUE,
  PRICE_MIN_VALUE,
  ROOMS_TO_GUESTS,
  GUESTS_TO_ROOMS,
} from './constants.js';

// ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ СОСТОЯНИЯ ФОРМ

const toggleFormMode = (formNode) => {
  formNode.classList.toggle(`${formNode.classList[0]}--disabled`);
  Array.from(formNode.children).forEach((field) => {
    field.disabled = !field.disabled;
  });
};

// валидация формы
const adForm = document.querySelector('.ad-form');
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
const address = adForm.querySelector('#address');
address.setAttribute('readonly', 'readonly');

const fillAddress = ({lat, lng}) => {
  address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  pristine.validate(address);
};

export {fillAddress};

// валидация цены
const housingType = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
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
  } else {
    return 'Неизвестная ошибка!';
  }
};

//слайдер цены
const slider = adForm.querySelector('.ad-form__slider');

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
const timeFieldset = adForm.querySelector('.ad-form__element--time');
const timeInOut = timeFieldset.querySelectorAll('select');

timeFieldset.addEventListener('change', (evt) => {
  timeInOut.forEach((select) => {
    select.value = evt.target.value;
  });
});

// валидация количества комнат и количетсва гостей
const rooms = adForm.querySelector('#room_number');
const guests = adForm.querySelector('#capacity');

const validRooms = () => ROOMS_TO_GUESTS[rooms.value].includes(guests.value);
const validGuests = () => GUESTS_TO_ROOMS[guests.value].includes(rooms.value);

const getRoomsErrorText = () => {
  switch (rooms.value) {
    case '1': return 'Для 1 гостя';
    case '2': return 'От 1 до 2 гостей';
    case '3': return 'От 1 до 3 гостей';
    case '100': return 'Не для гостей';
    default: return 'Неизвестная ошибка!';
  }
};

const getGuestsErrorText = () => (guests.value === '0') ? 'Слишком мало комнат' : 'Слишком много гостей';

// валидация формы
pristine.addValidator(price, validatePrice, getPriceErrorText);
pristine.addValidator(rooms, validGuests, getRoomsErrorText);
pristine.addValidator(guests, validRooms, getGuestsErrorText);

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

[rooms, guests].forEach((select) => {
  select.addEventListener('change', () => {
    pristine.validate([rooms, guests]);
  });
});

const resetAdForm = () => {
  adForm.reset();
  slider.noUiSlider.reset();
  pristine.reset();
};

const submitButton = adForm.querySelector('.ad-form__submit');

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

export {toggleFormMode, setNoticeFormSubmit, resetAdForm};

