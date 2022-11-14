import {showErrorMessage} from './error-message.js';

const getCards = (onSuccess) => {
  fetch('https://27.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Ошибка загрузки данных с сервера');
    })
    .then((cards) => onSuccess(cards))
    .catch((err) => {
      showErrorMessage(err.message);
    });
};

// const sendNotice = () => {

// };

export {
  getCards,
  // sendNotice,
};
