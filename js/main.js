import {debounce} from './util/util.js';
import {renderPopups} from './modules/render-popups.js';
import {getData, sendData} from './modules/api.js';
import {filterPins} from './modules/filter.js';
import setFormValidation from './modules/set-form-validation.js';

const filter = document.querySelector('.map__filters');

const deleteActivePinas = () => {
  const activePins = document.querySelectorAll('.leaflet-marker-icon');
  const shadows = document.querySelectorAll('.leaflet-marker-shadow');

  shadows.forEach(shadow => {
    shadow.remove();
  });

  activePins.forEach(pin => {
    if (!pin.classList.contains('leaflet-marker-draggable')) {
      pin.remove();
    }
  });
}

//Инициализация карты
const LAT_START = 35.68283;
const LNG_START = 139.75945;

const renderPins = (arr) => {
  arr.forEach(offer => {
    L.marker([offer.location.lat, offer.location.lng]).addTo(map)
      .bindPopup(renderPopups(offer));
  });
}

const getFilterActive = () => {
  const mainFilter = document.querySelector('.map__filters');
  mainFilter.classList.remove('map__filters--disabled');

  const disabledFieldsets = document.querySelectorAll('.map__filters fieldset:disabled');
  const disabledSelects = document.querySelectorAll('.map__filters select:disabled');

  disabledSelects.forEach(element => element.removeAttribute('disabled'));
  disabledFieldsets.forEach(element => element.removeAttribute('disabled'));
}

const getFormActive = () => {
  const disabledFieldsets = document.querySelectorAll('.ad-form fieldset:disabled');
  const disabledSelects = document.querySelectorAll('.ad-form select:disabled');

  disabledSelects.forEach(element => element.removeAttribute('disabled'));
  disabledFieldsets.forEach(element => element.removeAttribute('disabled'));

  const mainForm = document.querySelector('.ad-form');
  mainForm.classList.remove('ad-form--disabled');
}

const setMainPin = (lat, lng) => {
  const myIcon = L.icon({
    iconUrl: '../leaflet/images/main.png',
    iconSize: [38, 60],
    iconAnchor: [19, 60],
  });

  const main = L.marker([lat, lng], {
    icon: myIcon,
    draggable: true,
  });

  const adress = document.querySelector('#address');

  main.on('move', function (evt) {
    adress.value = `${evt.latlng.lat.toFixed(5)} : ${evt.latlng.lng.toFixed(5)}`;
  });

  adress.value = `${main._latlng.lat.toFixed(5)} : ${main._latlng.lng.toFixed(5)}`;

  return main;
}


const map = L.map('map-canvas');
const main = setMainPin(LAT_START, LNG_START);

map.on('load', () => {
  getFormActive();
  main.addTo(map);

  getData('https://22.javascript.pages.academy/keksobooking/data', (response) => {
    renderPins(response);
    getFilterActive();

    filter.addEventListener('input', debounce(() => {
      const filteredOffers = filterPins(response);
      map.closePopup();
      deleteActivePinas();
      renderPins(filteredOffers);
    }, 500));
  }, () => {
    showErrorModal('#load-error');
  });
});

map.setView([LAT_START, LNG_START], 9);

const layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

layer.addTo(map);


// Работа с ограничениями на форме
setFormValidation();

//Отправка формы

const form = document.querySelector('.ad-form');

const showModal = (templateSelector, modalSelector) => {
  const template = document.querySelector(templateSelector);
  const modalClone = template.content.cloneNode(true);
  const main = document.querySelector('main');

  main.appendChild(modalClone);

  const modal = document.querySelector(modalSelector);

  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      modal.remove();
      window.removeEventListener('keydown', onEscPress);
      document.body.style.overflow = '';
    }
  }

  const onModalClick = (evt) => {
    if (evt.currentTarget === modal) {
      modal.remove();
      modal.removeEventListener('click', onModalClick);
      document.body.style.overflow = '';
    }
  }

  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', onEscPress);
  modal.addEventListener('click', onModalClick);
  onReset();
}

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
const reset = document.querySelector('.ad-form__reset');

function onReset() {
  // price.placeholder = 'мин. 1 000';
  // price.min = '1000';

  filter.reset();
  form.reset();
  // copacityReset();
  map.closePopup();
  deleteActivePinas();
  getData('https://22.javascript.pages.academy/keksobooking/data', (response) => {
    renderPins(response);
  });
  main.setLatLng([LAT_START, LNG_START]);
}


reset.addEventListener('click', (evt) => {
  evt.preventDefault();
  onReset();
});
