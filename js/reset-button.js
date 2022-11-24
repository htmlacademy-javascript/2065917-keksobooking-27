const resetButton = document.querySelector('.ad-form__reset');

const setMapDefault = (cb) => {
  resetButton.addEventListener('click', () => {
    resetAdForm();
    resetFilterForm();
    resetMap({type: 'full'});
    cb();
  });
};

export {setMapDefault};

