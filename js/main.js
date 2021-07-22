import './modules/map.js';
import './modules/form.js';

import {sendData} from './modules/api.js';
import {showModal} from './modules/show-modal.js';


//Отправка формы

const form = document.querySelector('.ad-form');

form.addEventListener('submit', evt => {
  evt.preventDefault();

  sendData('https://22.javascript.pages.academy/keksobookin',
    () => {
      showModal('#success', '.success');
    },
    () => {
      showModal('#error', '.error');
    },
    new FormData(form));
});



// reset
// const reset = document.querySelector('.ad-form__reset');

// function onReset() {
//   price.placeholder = 'мин. 1 000';
//   price.min = '1000';

//   filter.reset();
//   form.reset();
//   // copacityReset();
//   map.closePopup();
//   deleteActivePinas();
//   getData('https://22.javascript.pages.academy/keksobooking/data', (response) => {
//     renderPins(response);
//   });
//   main.setLatLng([LAT_START, LNG_START]);
// }


// reset.addEventListener('click', (evt) => {
//   evt.preventDefault();
//   onReset();
// });
