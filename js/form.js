// функция переключения состояния форм

const toggleFormMode = (formNode) => {
  formNode.classList.toggle(`${formNode.classList[0]}--disabled`);
  Array.from(formNode.children).forEach((field) => {
    field.disabled = !field.disabled;
  });
};

export {toggleFormMode};

// ВАЛИДАЦИЯ ФОРМЫ
const adForm = document.querySelector('.ad-form');

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

const pristine = new Pristine(adForm);
const rooms = adForm.querySelector('#room_number');
const guests = adForm.querySelector('#capacity');

// валидаация формы
adForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

// функции проверки соотношения полей комнат и гостей
const checkGuests = () => {
  pristine.addValidator(guests, () => {
    const validate = ROOMS_TO_GUESTS[rooms.value].includes(guests.value);
    return validate;
  },
  'error!!!',
  2,
  true);
};
checkGuests();

const checkRooms = () => {
  pristine.addValidator(rooms, () => {
    const validate = GUESTS_TO_ROOMS[guests.value].includes(rooms.value);
    return validate;
  },
  'error!!!',
  2,
  true);
};
checkRooms();

rooms.addEventListener('change', () => {
  checkGuests();
});

guests.addEventListener('change', () => {
  checkRooms();
});

