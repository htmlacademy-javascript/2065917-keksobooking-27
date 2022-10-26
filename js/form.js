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
  disableForm,
  enableForm, // вызвать после загрузки карты
};

