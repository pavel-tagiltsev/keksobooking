import {postData} from './api.js';
import {showModal} from './show-modal.js';

const POST_URL = 'https://22.javascript.pages.academy/keksobooking';

const CapacityOptions = {
  1: [1],
  2: [1,2],
  3: [1,2,3],
  100: [0],
}

const MinPrices = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
}

const adForm = document.querySelector('.ad-form');
const typeSelect = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const timeInSelect = adForm.querySelector('#timein');
const timeOutSelect = adForm.querySelector('#timeout');
const numberOfRoomsSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');

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
}

const onSuccessPost = () => {
  showModal('#success', '.success');
}

const onFailPost = () => {
  showModal('#error', '.error');
}

const onAdFormSubmint = (evt) => {
  evt.preventDefault();

  postData(
    POST_URL,
    onSuccessPost,
    onFailPost,
    new FormData(adForm),
  );
}

typeSelect.addEventListener('change', onTypeSelectChange);
timeInSelect.addEventListener('change', onTimeInSelectChange);
timeOutSelect.addEventListener('change', onTimeOutSelectChange);
numberOfRoomsSelect.addEventListener('change', onNumberOfRoomsSelectChange);
adForm.addEventListener('submit', onAdFormSubmint);


export {POST_URL};
