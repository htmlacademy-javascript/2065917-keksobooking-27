import {resetAdForm} from './form.js';
import {resetFilterForm} from './filter.js';
import {resetMap} from './map.js';

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

