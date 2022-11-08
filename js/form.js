// ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ СОСТОЯНИЯ ФОРМ

const toggleFormMode = (formNode) => {
  formNode.classList.toggle(`${formNode.classList[0]}--disabled`);
  Array.from(formNode.children).forEach((field) => {
    field.disabled = !field.disabled;
  });
};

export {toggleFormMode};

// ВАЛИДАЦИЯ ФОРМЫ

const TITLE_LENGTH = {minLength: 30, maxLength: 100};
const PRICE_MAX_VALUE = 100000;

// связи полей "Количество комнат" и "Количество мест"
const ROOMS_TO_GUESTS = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const GUESTS_TO_ROOMS = {
  '0': ['100'],
  '1': ['1', '2', '3'],
  '2': ['2', '3'],
  '3': ['3'],
};

const adForm = document.querySelector('.ad-form');
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help'
}, true);

// валидация заголовка
const title = adForm.querySelector('#title');

const validateTitle = () => {
  if (title.value.length !== 0 &&
    title.value.length >= TITLE_LENGTH.minLength &&
    title.value.length <= TITLE_LENGTH.maxLength) {
    return true;
  }
  return false;
};

const getTitleErrorText = () => {
  if (title.value.length === 0) {
    return 'Обязательное поле';
  } else if (title.value.length < TITLE_LENGTH.minLength || title.value.length > TITLE_LENGTH.maxLength) {
    return `От ${TITLE_LENGTH.minLength} до ${TITLE_LENGTH.maxLength} символов`;
  } else {
    return 'Неизвестная ошибка!';
  }
};

// валидация цены
const price = adForm.querySelector('#price');

const validatePrice = () => {
  if (price.value !== '' &&
  parseInt(price.value, 10) >= 0 &&
  parseInt(price.value, 10) <= PRICE_MAX_VALUE) {
    return true;
  }
  return false;
};

const getPriceErrorText = () => {
  if (price.value === '') {
    return 'Обязательное поле';
  } else if (parseInt(price.value, 10) > PRICE_MAX_VALUE) {
    return `Не более ${PRICE_MAX_VALUE} руб.`;
  } else {
    return 'Неизвестная ошибка!';
  }
};

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

// валидаация формы
pristine.addValidator(title, validateTitle, getTitleErrorText);
pristine.addValidator(price, validatePrice, getPriceErrorText);
pristine.addValidator(rooms, validGuests, getRoomsErrorText);
pristine.addValidator(guests, validRooms, getGuestsErrorText);

[rooms, guests].forEach((select) => {
  select.addEventListener('change', () => {
    pristine.validate([rooms, guests]);
  });
});

adForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
