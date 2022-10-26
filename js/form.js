// функция для отключения форм
const disableForm = (formNode, fieldsetList) => {
  formNode.classList.add(`${formNode.classList[0]}--disabled`);

  fieldsetList.forEach((nodeItem) => {
    nodeItem.disabled = true;
  });
};

// функции для включения форм
const enableForm = (formNode, fieldsetList) => {
  formNode.classList.remove(`${formNode.classList[0]}--disabled`);

  fieldsetList.forEach((nodeItem) => {
    nodeItem.disabled = false;
  });
};

export {
  disableForm,
  enableForm, // вызвать после загрузки карты
};

