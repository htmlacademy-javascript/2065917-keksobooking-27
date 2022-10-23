// ОТКЛЮЧЕНИЕ ФОРМ НА ВРЕМЯ ЗАГРУЗКИ КАРТЫ

const noticeForm = document.querySelector('.ad-form'); // форма подачи объявления
const noticeFieldSets = noticeForm.querySelectorAll('fieldset'); // филдсеты формы подачи объявления
const mapFiltersForm = document.querySelector('.map__filters'); // форма фильтров
const mapFiltersOptions = mapFiltersForm.querySelectorAll('fieldset, select'); // фильтры для карты
// СЛАЙДЕР !!! СЛАЙДЕР !!! СЛАЙДЕР !!! СЛАЙДЕР !!! СЛАЙДЕР !!! СЛАЙДЕР !!! СЛАЙДЕР !!! СЛАЙДЕР !!!
// функция для отключения форм
const disableForm = (formNode, nodeList) => {
  formNode.classList.add(`${formNode.classList[0]}--disabled`);

  nodeList.forEach((nodeItem) => {
    nodeItem.disabled = true;
  });
};

// отключение формы подачи объявления
disableForm(noticeForm, noticeFieldSets);
// отключение фильтров карты
disableForm(mapFiltersForm, mapFiltersOptions);


// функции для включения форм
const enableForm = (formNode, nodeList) => {
  formNode.classList.remove(`${formNode.classList[0]}--disabled`);

  nodeList.forEach((nodeItem) => {
    nodeItem.disabled = false;
  });
};

export {
  noticeForm,
  noticeFieldSets,
  mapFiltersForm,
  mapFiltersOptions,
  enableForm, // вызвать после загрузки карты
};

