import {
  renderPopups
} from './modules/render-popups.js';

const getData = (url, onSuccess, onFail) => {
  fetch(url)
    .then((response => {
      if (response.ok) {
        return response.json();
      }
      onFail(`Не удалось загрузить данные об объектах: ${response.text}`);
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

const map = L.map('map-canvas');


map.on('load', () => {

  const myIcon = L.icon({
    iconUrl: '../leaflet/images/main.png',
    iconSize: [38, 60],
    iconAnchor: [19, 60],
  });
  const main = L.marker([LAT_START, LNG_START], {
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
    filter.addEventListener('input', () => {
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
      renderPins(filteredOffers)
    });
  }, (err) => {
    alert(err);
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

type.addEventListener('change', evt => {
  if (evt.target.value === 'bungalow') {
    price.placeholder = '0';
    price.min = '0';
    return;
  }
  if (evt.target.value === 'flat') {
    price.placeholder = '1 000';
    price.min = '1000';
    return;
  }
  if (evt.target.value === 'house') {
    price.placeholder = '5 000';
    price.min = '5000';
    return;
  }
  if (evt.target.value === 'palace') {
    price.placeholder = '10 000';
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

rooms.addEventListener('change', evt => {
  if (evt.target.value === '1') {
    capacities.forEach(item => {
      if (item.value !== evt.target.value) {
        item.style.display = 'none';
      } else {
        item.style.display = 'block';
      }
    });
  }

  if (evt.target.value === '100') {
    capacities.forEach(item => {
      if (item.value !== '0') {
        item.style.display = 'none';
      } else {
        item.style.display = 'block';
      }
    });
  }

  if (evt.target.value === '3') {
    capacities.forEach(item => {
      if (item.value === '0') {
        item.style.display = 'none';
      } else {
        item.style.display = 'block';
      }
    });
  }

  if (evt.target.value === '2') {
    capacities.forEach(item => {
      if (item.value === '0' || item.value === '3') {
        item.style.display = 'none';
      } else {
        item.style.display = 'block';
      }
    });
  }
});

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
