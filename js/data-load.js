const SERVER = 'https://27.javascript.pages.academy/keksobooking';

const getCards = (onSuccess, onFail) => {
  fetch(`${SERVER}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Ошибка загрузки данных с сервера');
    })
    .then((cards) => onSuccess(cards))
    .catch((er) => {
      er.message = 'Ошибка загрузки данных с сервера';
      onFail(er);
    });
};

const sendNotice = (onSuccess, onFail, body) => {
  fetch(SERVER,
    {
      method: 'POST',
      body: body,
    }
  )
    .then((response) => response.ok ? onSuccess() : onFail())
    .catch(() => {
      onFail();
    });
};

export {
  getCards,
  sendNotice,
};
