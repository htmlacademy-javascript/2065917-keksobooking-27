// ОТКЛЮЧЕНИЕ ФОРМ НА ВРЕМЯ ЗАГРУЗКИ КАРТЫ

const noticeForm = document.querySelector('.ad-form'); // форма подачи объявления
const noticeFieldSets = noticeForm.querySelectorAll('fieldset'); // филдсеты формы подачи объявления
const mapFiltersForm = document.querySelector('.map__filters'); // форма фильтров
const mapFiltersOptions = mapFiltersForm.querySelectorAll('fieldset, select'); // фильтры для карты
// Слайдер также должен быть заблокирован

// функция для отключения форм
const disableForm = (formNode, nodeList) => {
  formNode.classList.add(`${formNode.classList[0]}--disabled`);

  nodeList.forEach((nodeItem) => {
    nodeItem.disabled = true;
  });
};

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
  disableForm,
  enableForm, // вызвать после загрузки карты
};

