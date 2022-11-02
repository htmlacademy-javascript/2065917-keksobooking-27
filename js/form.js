// функция переключения состояния форм

const toggleFormMode = (formNode) => {
  formNode.classList.toggle(`${formNode.classList[0]}--disabled`);
  Array.from(formNode.children).forEach((field) => {
    field.disabled = !field.disabled;
  });
};

export {toggleFormMode};
