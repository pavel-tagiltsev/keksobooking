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
const titleInput = adForm.querySelector('#title');
const typeSelect = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const timeInSelect = adForm.querySelector('#timein');
const timeOutSelect = adForm.querySelector('#timeout');
const numberOfRoomsSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');
const resetButton = document.querySelector('.ad-form__reset');
const adFormButton = adForm.querySelector('.ad-form__submit');

const addMessage = (input, message) => {
  const span = document.createElement('span');
  span.classList.add('validation-error');
  span.textContent = message;
  input.after(span);
};

const removeMessage = (input) => {
  const message = input.parentElement.querySelector('.validation-error');
  if (message) {
    message.remove();
  }
};

const showError = (input, message) => {
  removeMessage(input);

  if (message) {
    input.classList.add('input-invalid');
    addMessage(input, message);
    return;
  }

  input.classList.remove('input-invalid');
  removeMessage(input);
};

const onTitleInputInput = () => {
  const length = titleInput.value.length;
  const tooShort = titleInput.validity.tooShort;
  const tooLong = titleInput.validity.tooLong;
  const valueMissing = titleInput.validity.valueMissing;

  if (valueMissing){
    titleInput.setCustomValidity(' ');
    showError(titleInput, 'Это обязательное поле.');
  } else if (tooShort) {
    titleInput.setCustomValidity(' ');
    showError(titleInput, `Минимальная длина - 30 симв. Не хватает ${30 - length} симв.`);
  } else if (tooLong) {
    titleInput.setCustomValidity(' ');
    showError(titleInput, `Максимальная длина 60 симв. Необходимо удалить ${100 - length} симв.`);
  } else {
    showError(titleInput, '');
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
};

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

const onPriceInput = () => {
  const valueMissing = price.validity.valueMissing;
  const rangeUnderflow = price.validity.rangeUnderflow;
  const rangeOverflow = price.validity.rangeOverflow;

  if (valueMissing){
    price.setCustomValidity(' ');
    showError(price, 'Это обязательное поле.');
  } else if (rangeUnderflow) {
    price.setCustomValidity(' ');
    showError(price, `Минимальная цена ${price.min}.`);
  } else if (rangeOverflow) {
    price.setCustomValidity(' ');
    showError(price, `Максимальная цена ${price.max}`);
  } else {
    price.setCustomValidity('');
    showError(price, '');
  }

  price.reportValidity();
}

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

const onAdFormButtonClick = () => {
  onTitleInputInput();
  onPriceInput();
}

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

  titleInput.addEventListener('input', onTitleInputInput);
  typeSelect.addEventListener('change', onTypeSelectChange);
  price.addEventListener('input', onPriceInput);
  timeInSelect.addEventListener('change', onTimeInSelectChange);
  timeOutSelect.addEventListener('change', onTimeOutSelectChange);
  numberOfRoomsSelect.addEventListener('change', onNumberOfRoomsSelectChange);
  adFormButton.addEventListener('click', onAdFormButtonClick)

  adForm.addEventListener('submit', onAdFormSubmint(postUrl, onSuccess, onFail));
  resetButton.addEventListener('click', callback());
};

export {
  setAdress,
  activateAdForm,
  resetAdForm
};
