// функция переключения состояния форм

// const toggleFormMode = (formNode, fieldsetList) => {
//   formNode.classList.toggle(`${formNode.classList[0]}--disabled`);

//   fieldsetList.forEach((nodeItem) => {
//     nodeItem.disabled = !nodeItem.disabled;
//   });
// };

// export {toggleFormMode};


const toggleFormMode = (formNode) => {
  formNode.classList.toggle(`${formNode.classList[0]}--disabled`);
};

const toggleFieldsetMode = (fieldsetItem) => {
  fieldsetItem.disabled = !fieldsetItem.disabled;
};

export {toggleFormMode, toggleFieldsetMode};
