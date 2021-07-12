import {createOffers} from './modules/create-offers.js';
import {renderPopups} from './modules/render-popups.js';

const offers = createOffers();

const LAT_START = 35.68283;
const LNG_START = 139.75945;

const map = L.map('map-canvas').setView([LAT_START, LNG_START], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

offers.forEach(offer => {
  L.marker([offer.offer.location.x, offer.offer.location.y]).addTo(map)
    .bindPopup(renderPopups(offer));
});

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

