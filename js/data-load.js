import {showErrorMessage} from './error-message.js';

const SERVER = 'https://27.javascript.pages.academy/keksobooking';

const getCards = (onSuccess) => {
  fetch(`${SERVER}/data`)
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

const sendNotice = (onSuccess, onFail, body) => {
  fetch(SERVER,
    {
      method: 'POST',
      body: body,
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {
  getCards,
  sendNotice,
};
