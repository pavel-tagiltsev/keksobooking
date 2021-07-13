import {createOffers} from './modules/create-offers.js';
import {renderPopups} from './modules/render-popups.js';

const offers = createOffers();

const LAT_START = 35.68283;
const LNG_START = 139.75945;

const map = L.map('map-canvas').setView([LAT_START, LNG_START], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const renderPins = (arr) => {
  arr.forEach(offer => {
    L.marker([offer.offer.location.x, offer.offer.location.y]).addTo(map)
      .bindPopup(renderPopups(offer));
  });
}
renderPins(offers);


const myIcon = L.icon({
  iconUrl: '../leaflet/images/main.png',
  iconSize: [38, 60],
  iconAnchor: [19, 60],
});

const main = L.marker([LAT_START, LNG_START], {
  icon: myIcon,
  draggable: true,
}).addTo(map);

const adress = document.querySelector('#address');
main.on('move', function(evt) {
  adress.value = `${evt.latlng.lat.toFixed(5)} : ${evt.latlng.lng.toFixed(5)}`;
});

adress.value = `${main._latlng.lat.toFixed(5)} : ${main._latlng.lng.toFixed(5)}`;


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

  filteredOffers = offers.filter(offer => (
    (type === 'any' || offer.offer.type === type) &&
    (rooms === 'any' || offer.offer.rooms === +rooms) &&
    (price === 'any' || getRightPrice(offer)) &&
    (guests === 'any' || offer.offer.guests === +guests) &&
    (featurs === 'any' || getRightFeatures(featurs, offer.offer.features))
  ));

  deleteActivePinas();
  renderPins(filteredOffers)
});


