import {
  postData
} from './api.js';

import {
  activateForm
} from '../util/util.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

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

const getRightSymbol = (number) => {
  const lastNumber = +number.toString().slice(-1);
  const lastTwoNumbers = +number.toString().slice(-2);

  return (lastNumber === 1 && lastTwoNumbers !== 11) ? `${number} символа` : `${number} символов`;
}

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
  const tooShort = length < MIN_TITLE_LENGTH;
  const tooLong = length > MAX_TITLE_LENGTH;
  const valueMissing = length === 0;

  if (valueMissing){
    showError(titleInput, 'Это обязательное поле.');
    return true;
  }

  if (tooShort) {
    showError(titleInput, `Минимальная длина - ${getRightSymbol(MIN_TITLE_LENGTH)}.
    Не хватает ${getRightSymbol(MIN_TITLE_LENGTH - length)}.`);
    return true;
  }

  if (tooLong) {
    showError(titleInput, `Максимальная длина - ${getRightSymbol(MAX_TITLE_LENGTH)}.
    Необходимо удалить ${getRightSymbol(length - MAX_TITLE_LENGTH)}`);
    return true;
  }

  showError(titleInput, '');
  return false;
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

  const valueMissing = price.value === '';
  const rangeUnderflow = +price.value < price.min;
  const rangeOverflow = +price.value > price.max;

  if (rangeUnderflow && !valueMissing) {
    showError(price, `Минимальная цена ${price.min}.`);
    return;
  }

  if (rangeOverflow && !valueMissing) {
    showError(price, `Максимальная цена ${price.max}`);
    return;
  }

  showError(price, '');
};

const onPriceInput = () => {
  const valueMissing = price.value === '';
  const rangeUnderflow = +price.value < price.min;
  const rangeOverflow = +price.value > price.max;

  if (valueMissing){
    showError(price, 'Это обязательное поле.');
    return true;
  }

  if (rangeUnderflow) {
    showError(price, `Минимальная цена ${price.min}.`);
    return true;
  }

  if (rangeOverflow) {
    showError(price, `Максимальная цена ${price.max}`);
    return true;
  }

  showError(price, '');
  return false;
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

const isInvalid = (validity) => {
  return validity;
}

const onAdFormButtonClick = (evt) => {
  const titleInputValidity = onTitleInputInput();
  const priceInputValidity = onPriceInput();

  if ( isInvalid(titleInputValidity) || isInvalid(priceInputValidity)) {
    evt.preventDefault();
  }

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
