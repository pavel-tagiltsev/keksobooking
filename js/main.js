import {
  renderPopups
} from './modules/render-popups.js';

const getData = (url, onSuccess, onFail) => {
  fetch(url)
    .then((response => {
      if (response.ok) {
        return response.json();
      }
      // onFail(`Не удалось загрузить данные об объектах: ${response.text}`);
    }))
    .then(onSuccess)
    .catch(onFail);
};

// Фильтрация меток на карте
const filter = document.querySelector('.map__filters');
const typeFilter = filter.querySelector('#housing-type');
const priceFilter = filter.querySelector('#housing-price');
const roomsFilter = filter.querySelector('#housing-rooms');
const guestsFilter = filter.querySelector('#housing-guests');

let filteredOffers;

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

function debounce(callback, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  }
}

const map = L.map('map-canvas');
let main;

map.on('load', () => {

  const myIcon = L.icon({
    iconUrl: '../leaflet/images/main.png',
    iconSize: [38, 60],
    iconAnchor: [19, 60],
  });
  main = L.marker([LAT_START, LNG_START], {
    icon: myIcon,
    draggable: true,
  }).addTo(map);

  getData('https://22.javascript.pages.academy/keksobooking/data', (response) => {
    renderPins(response);

    const mainFilter = document.querySelector('.map__filters');
    mainFilter.classList.remove('map__filters--disabled');

    const disabledFieldsets = document.querySelectorAll('.map__filters fieldset:disabled');
    const disabledSelects = document.querySelectorAll('.map__filters select:disabled');

    disabledSelects.forEach(element => element.removeAttribute('disabled'));
    disabledFieldsets.forEach(element => element.removeAttribute('disabled'));

    //Продолжение фильтрации
    filter.addEventListener('input', debounce(() => {
      const type = typeFilter.value;
      const price = priceFilter.value;
      const rooms = roomsFilter.value;
      const guests = guestsFilter.value;
      const featurs = [...filter.querySelectorAll('#housing-features input:checked')].map(checkbox => checkbox.value);

      const getRightPrice = (a) => {
        if (price === 'middle') {
          return a.offer.price > 10000 && a.offer.price < 50000;
        }
        if (price === 'low') {
          return a.offer.price <= 10000;
        }
        if (price === 'high') {
          return a.offer.price >= 50000;
        }
      }

      const getRightFeatures = (arr, arr2) => {
        let arrCheck = arr.map(item => {
          return arr2.includes(item);
        })

        return (arrCheck.includes(false)) ? false : true;
      }

      filteredOffers = response.filter(offer => (
        (type === 'any' || offer.offer.type === type) &&
        (rooms === 'any' || offer.offer.rooms === +rooms) &&
        (price === 'any' || getRightPrice(offer)) &&
        (guests === 'any' || offer.offer.guests === +guests) &&
        (featurs === 'any' || getRightFeatures(featurs, offer.offer.features))
      ));

      map.closePopup();
      deleteActivePinas();
      renderPins(filteredOffers);
    }, 500));
  }, () => {
    const errorTemplate = document.querySelector('#error');
    const errorModal = errorTemplate.content;
    const errorModalClone = errorModal.cloneNode(true);
    const text = errorModalClone.querySelector('p');
    text.textContent = 'Ошибка при загрузке данных';
    const button = errorModalClone.querySelector('button');
    button.textContent = 'Повторите попытку позже';
    const main = document.querySelector('main');

    main.appendChild(errorModalClone);

    const error = document.querySelector('.error');

    const onEscPress = (evt) => {
      if (evt.key === 'Escape') {
        error.remove();
        window.removeEventListener('keydown', onEscPress);
        document.body.style.overflow = '';
      }
    }

    const oErrorClick = (evt) => {
      if (evt.currentTarget === error) {
        error.remove();
        error.removeEventListener('click', oErrorClick);
        document.body.style.overflow = '';
      }
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onEscPress);
    error.addEventListener('click', oErrorClick);
  })

  const adress = document.querySelector('#address');
  main.on('move', function (evt) {
    adress.value = `${evt.latlng.lat.toFixed(5)} : ${evt.latlng.lng.toFixed(5)}`;
  });

  adress.value = `${main._latlng.lat.toFixed(5)} : ${main._latlng.lng.toFixed(5)}`;

  const disabledFieldsets = document.querySelectorAll('.ad-form fieldset:disabled');
  const disabledSelects = document.querySelectorAll('.ad-form select:disabled');

  disabledSelects.forEach(element => element.removeAttribute('disabled'));
  disabledFieldsets.forEach(element => element.removeAttribute('disabled'));

  const mainForm = document.querySelector('.ad-form');
  mainForm.classList.remove('ad-form--disabled');
});

map.setView([LAT_START, LNG_START], 9);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);


// Работа с ограничениями на форме
const type = document.querySelector('#type');
const price = document.querySelector('#price');

price.placeholder = 'мин. 1 000';
price.min = '1000';

type.addEventListener('change', evt => {
  if (evt.target.value === 'bungalow') {
    price.placeholder = 'мин. 0';
    price.min = '0';
    return;
  }
  if (evt.target.value === 'flat') {
    price.placeholder = 'мин. 1 000';
    price.min = '1000';
    return;
  }
  if (evt.target.value === 'house') {
    price.placeholder = 'мин. 5 000';
    price.min = '5000';
    return;
  }
  if (evt.target.value === 'palace') {
    price.placeholder = 'мин. 10 000';
    price.min = '10000';
    return;
  }

});


const timein = document.querySelector('#timein');
const timeins = document.querySelectorAll('#timein option');
const timeout = document.querySelector('#timeout');
const timeouts = document.querySelectorAll('#timeout option');

timein.addEventListener('change', evt => {
  timeouts.forEach(item => {
    if (evt.target.value === item.value) {
      item.selected = true;
    }
  });
});

timeout.addEventListener('change', evt => {
  timeins.forEach(item => {
    if (evt.target.value === item.value) {
      item.selected = true;
    }
  });
});

const rooms = document.querySelector('#room_number');
const capacities = document.querySelectorAll('#capacity option');

const copacityReset = () => {
  capacities.forEach(item => {
    if (item.value !== '1') {
      item.disabled = true;
    } else {
      item.selected = true;
      item.disabled = false;
    }
  });
}

copacityReset();

const rightFilter = (evt) => {
  if (evt.target.value === '1') {
    capacities.forEach(item => {
      if (item.value !== evt.target.value) {
        item.disabled = true;
      } else {
        item.selected = true;
        item.disabled = false;
      }
    });
  }

  if (evt.target.value === '100') {
    capacities.forEach(item => {
      if (item.value !== '0') {
        item.disabled = true;
      } else {
        item.selected = true;
        item.disabled = false;
      }
    });
  }

  if (evt.target.value === '3') {
    capacities.forEach(item => {
      if (item.value === '0') {
        item.disabled = true;
      } else {
        item.selected = true;
        item.disabled = false;
      }
    });
  }

  if (evt.target.value === '2') {
    capacities.forEach(item => {
      if (item.value === '0' || item.value === '3') {
        item.disabled = true;
      } else {
        item.selected = true;
        item.disabled = false;
      }
    });
  }
}

rooms.addEventListener('change', evt => {
  rightFilter(evt);
});

//Отправка формы
const sendData = (url, onSuccess, onFail, body) => {
  fetch(url, {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }
      onFail();
    })
    .catch(onFail);
};

const form = document.querySelector('.ad-form');

const showSuccessModal = () => {
  const successTemplate = document.querySelector('#success');
  const successModal = successTemplate.content;
  const successModalClone = successModal.cloneNode(true);
  const main = document.querySelector('main');

  main.appendChild(successModalClone);
  const success = document.querySelector('.success');

  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      success.remove();
      window.removeEventListener('keydown', onEscPress);
      document.body.style.overflow = '';
    }
  }

  const onSuccessClick = (evt) => {
    if (evt.currentTarget === success) {
      success.remove();
      success.removeEventListener('click', onSuccessClick);
      document.body.style.overflow = '';
    }
  }

  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', onEscPress);
  success.addEventListener('click', onSuccessClick);
  onReset();
}

function showErrorModal() {
  const errorTemplate = document.querySelector('#error');
  const errorModal = errorTemplate.content;
  const errorModalClone = errorModal.cloneNode(true);
  const main = document.querySelector('main');

  main.appendChild(errorModalClone);

  const error = document.querySelector('.error');

  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      error.remove();
      window.removeEventListener('keydown', onEscPress);
      document.body.style.overflow = '';
    }
  }

  const oErrorClick = (evt) => {
    if (evt.currentTarget === error) {
      error.remove();
      error.removeEventListener('click', oErrorClick);
      document.body.style.overflow = '';
    }
  }

  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', onEscPress);
  error.addEventListener('click', oErrorClick);
}

form.addEventListener('submit', evt => {
  evt.preventDefault();

  sendData('https://22.javascript.pages.academy/keksobooking', showSuccessModal, showErrorModal, new FormData(form));
});


//reset
const reset = document.querySelector('.ad-form__reset');

function onReset() {
  price.placeholder = 'мин. 1 000';
  price.min = '1000';

  filter.reset();
  form.reset();
  copacityReset();
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
