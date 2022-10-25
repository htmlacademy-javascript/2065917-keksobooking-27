// ОТКЛЮЧЕНИЕ ФОРМ НА ВРЕМЯ ЗАГРУЗКИ КАРТЫ

const noticeForm = document.querySelector('.ad-form'); // форма подачи объявления
const noticeFieldSets = noticeForm.querySelectorAll('fieldset'); // филдсеты формы подачи объявления
const mapFiltersForm = document.querySelector('.map__filters'); // форма фильтров
const mapFiltersOptions = mapFiltersForm.querySelectorAll('fieldset, select'); // фильтры для карты
// Слайдер также должен быть заблокирован

// функция для отключения форм
const disableForm = () => {
  // отключение формы подачи объявления
  noticeForm.classList.add('ad-form--disabled');
  noticeFieldSets.forEach((node) => {
    node.disabled = true;
  });

  // отключение фильтров карты
  mapFiltersForm.classList.add('map__filters--disabled');
  mapFiltersOptions.forEach((node) => {
    node.disabled = true;
  });
};

// функции для включения форм
const enableForm = () => { // eslint-disable-line
  // отключение формы подачи объявления
  noticeForm.classList.remove('ad-form--disabled');
  noticeFieldSets.forEach((node) => {
    node.disabled = false;
  });

  // отключение фильтров карты
  mapFiltersForm.classList.remove('map__filters--disabled');
  mapFiltersOptions.forEach((node) => {
    node.disabled = false;
  });
};

export {
  noticeForm,
  noticeFieldSets,
  mapFiltersForm,
  mapFiltersOptions,
  disableForm,
  enableForm, // вызвать после загрузки карты
};

