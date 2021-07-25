import {
  postData
} from './api.js';

import {
  activateForm
} from '../util/util.js';

const CapacityOptions = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const MinPrices = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};

const adForm = document.querySelector('.ad-form');
const typeSelect = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const timeInSelect = adForm.querySelector('#timein');
const timeOutSelect = adForm.querySelector('#timeout');
const numberOfRoomsSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');
const resetButton = document.querySelector('.ad-form__reset');

const setAdress = (lat, lng) => {
  const adress = document.querySelector('#address');
  adress.value = `${lat.toFixed(5)} : ${lng.toFixed(5)}`;
};

const onTypeSelectChange = () => {
  const minPrice = MinPrices[typeSelect.value];
  const setTextHint = (minPrice) => `мин. ${minPrice}`;

  price.placeholder = setTextHint(minPrice);
  price.min = minPrice;
};

const onTimeInSelectChange = () => {
  timeOutSelect.value = timeInSelect.value;
};

const onTimeOutSelectChange = () => {
  timeInSelect.value = timeOutSelect.value;
};

const onNumberOfRoomsSelectChange = () => {
  const capacityOptions = capacitySelect.querySelectorAll('option');
  const availableCapacityOptions = CapacityOptions[+numberOfRoomsSelect.value];

  capacityOptions.forEach((capacityOption) => {
    capacityOption.disabled = true;
  })

  availableCapacityOptions.forEach((availableCapacityOption) => {
    capacityOptions.forEach((capacityOption) => {
      if (+capacityOption.value === availableCapacityOption) {
        capacityOption.disabled = false;
      }
    });
  });

  capacitySelect.value = Math.max(...availableCapacityOptions);
};

const resetAdForm = () => {
  adForm.reset();
  onTypeSelectChange();
  onTimeInSelectChange();
  onTimeOutSelectChange();
  onNumberOfRoomsSelectChange();
};

const onAdFormSubmint = (PostUrl, onSuccess, onFail) => {
  return (evt) => {
    evt.preventDefault();

    postData(
      PostUrl,
      onSuccess,
      onFail,
      new FormData(adForm),
    );
  };
};

const activateAdForm = ({
  PostSettings: {
    postUrl,
    onSuccess,
    onFail,
  },
  onReset: {
    callback,
  },
}) => {
  activateForm(adForm);

  typeSelect.addEventListener('change', onTypeSelectChange);
  timeInSelect.addEventListener('change', onTimeInSelectChange);
  timeOutSelect.addEventListener('change', onTimeOutSelectChange);
  numberOfRoomsSelect.addEventListener('change', onNumberOfRoomsSelectChange);

  adForm.addEventListener('submit', onAdFormSubmint(postUrl, onSuccess, onFail));
  resetButton.addEventListener('click', callback());
};

export {
  setAdress,
  activateAdForm,
  resetAdForm
};
