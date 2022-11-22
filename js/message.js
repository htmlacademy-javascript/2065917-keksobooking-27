// сообщение об ошибке загрузки данных с сервера
const map = document.querySelector('#map-canvas');

const showErrorMessage = (message) => {

  const errorMessage = document.createElement('div');
  errorMessage.textContent = message;
  errorMessage.style.position = 'absolute';
  errorMessage.style.zIndex = '1000';
  errorMessage.style.right = '0';
  errorMessage.style.top = '0';
  errorMessage.style.margin = '14px';
  errorMessage.style.padding = '14px';
  errorMessage.style.fontFamily = '"Roboto", "Arial", sans-serif';
  errorMessage.style.fontSize = '16px';
  errorMessage.style.color = '#ff6547';
  errorMessage.style.border = '1px solid #d9d9d3';
  errorMessage.style.borderRadius = '4px';
  errorMessage.style.boxShadow = '0 0 2px 2px #ff6547';
  errorMessage.style.backgroundColor = '#ffffff';
  errorMessage.style.opacity = '1';
  errorMessage.style.transition = 'opacity 1s';

  map.appendChild(errorMessage);

  setTimeout(() => {
    errorMessage.style.opacity = '0';
  }, 3000);
};

// сообщение об отправке формы
const showModalMessage = (modalType) => {

  const modalTemplate = document.querySelector(`#${modalType}`).content.querySelector(`.${modalType}`);
  const modal = modalTemplate.cloneNode(true);
  const modalButton = modal.querySelector('.error__button');

  const onModalClick = () => {
    hideModal();
  };

  if (modalButton !== null) {
    modalButton.addEventListener('click', onModalClick);
  }

  const onModalEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      hideModal();
    }
  };

  const showModal = () => {
    document.body.appendChild(modal);
    document.addEventListener('click', onModalClick);
    document.addEventListener('keydown', onModalEscKeydown);
  };

  function hideModal() {
    document.body.removeChild(modal);
    document.removeEventListener('click', onModalClick);
    document.removeEventListener('keydown', onModalEscKeydown);
  }

  showModal();
};

export {showErrorMessage, showModalMessage};
