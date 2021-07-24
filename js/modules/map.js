import {debounce} from '../util/util.js';
import {renderMarkerPopup} from './render-marker-popup.js';
import {getData} from './api.js';
import {filterPins} from './filter.js';
import {showModal} from './show-modal.js';

const STARTING_LATITUDE = 35.68283;
const STARTING_LONGITUDE = 139.75945;
const STARTING_ZOOM = 9;
const MAIN_MARKER_WIDTH = 52;
const MAIN_MARKER_HEIGHT = 52;
const MARKER_WIDTH = 40;
const MARKER_HEIGHT = 40;
const GET_URL = 'https://22.javascript.pages.academy/keksobooking/data';

const map = L.map('map-canvas');
const layer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);
const markers = [];

const mapFilter = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');

const setAdress = (lat, lng) => {
  const adress = document.querySelector('#address');
  adress.value = `${lat.toFixed(5)} : ${lng.toFixed(5)}`;
}

setAdress(STARTING_LATITUDE, STARTING_LONGITUDE);

const removeMarkers = () => {
  markers.forEach((marker) => {
    marker.remove();
  })
}

const getFormActive = (form) => {
  const classes = form.classList;
  const lastFormClass = classes[classes.length - 1];
  classes.remove(lastFormClass);

  Array.from(form.children).forEach((fieldset) => {
    fieldset.disabled = false;
  });
}

const setMainMarkerOnMap = () => {
  const mainMarkerIcon = L.icon({
    iconUrl: '../img/main-marker.svg',
    iconSize: [MAIN_MARKER_WIDTH, MAIN_MARKER_HEIGHT],
    iconAnchor: [MAIN_MARKER_WIDTH / 2, MAIN_MARKER_HEIGHT],
  });

  const mainMarker = L.marker({
    lat: STARTING_LATITUDE,
    lng: STARTING_LONGITUDE,
  }, {
    icon: mainMarkerIcon,
    draggable: true,
  });

  const onMianMarkerMove = (evt) => {
    const lat = evt.target.getLatLng().lat;
    const lng = evt.target.getLatLng().lng;
    setAdress(lat, lng);
  }

  mainMarker.on('move', onMianMarkerMove);
  mainMarker.addTo(map);
}

const addMarkersOnMap = (offers) => {
  const createMarker = (offer) => {
    const markerIcon = L.icon({
      iconUrl: '../img/marker.svg',
      iconSize: [MARKER_WIDTH, MARKER_HEIGHT],
      iconAnchor: [MARKER_WIDTH / 2, MARKER_HEIGHT],
    });

    const marker = L.marker({
      lat: offer.location.lat,
      lng: offer.location.lng,
    }, {
      icon: markerIcon,
    });

    marker
      .addTo(map)
      .bindPopup(renderMarkerPopup(offer));

    return marker;
  };

  offers.forEach((offer) => {
    const marker = createMarker(offer);
    markers.push(marker);
  });
};

const onMapFilterChange = (offers) => {
  const filteredOffers = filterPins(offers);
  map.closePopup();
  removeMarkers();
  addMarkersOnMap(filteredOffers);
}

const onSuccessMapLoad = (offers) => {
  addMarkersOnMap(offers);
  getFormActive(mapFilter);
  mapFilter.addEventListener('change', debounce(() => onMapFilterChange(offers), 500));
}

const onFailMapLoad = () => {
  showModal('#load-error', '.error');
}

const onMapLoad = () => {
  getFormActive(adForm);
  setMainMarkerOnMap();
  getData(
    GET_URL,
    onSuccessMapLoad,
    onFailMapLoad,
  );
}

const setMap = () => {
  map
    .on('load', onMapLoad)
    .setView({
      lat: STARTING_LATITUDE,
      lng: STARTING_LONGITUDE,
    }, STARTING_ZOOM);

  layer.addTo(map);
};

setMap();

