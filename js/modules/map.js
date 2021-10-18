import {renderMarkerPopup} from './popup.js';
import {setAdress} from './form.js';

const STARTING_LATITUDE = 35.68283;
const STARTING_LONGITUDE = 139.75945;
const STARTING_ZOOM = 13;

const MAP = 'map-canvas';
const LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MAIN_MARKER_ICON = './img/main-marker.svg';
const MAIN_MARKER_WIDTH = 52;
const MAIN_MARKER_HEIGHT = 52;

const MARKER_ICON = './img/marker.svg';
const MARKER_WIDTH = 40;
const MARKER_HEIGHT = 40;

const map = L.map(MAP);
const renderedMarkers = [];

const closeOpenedPopup = () => {
  map.closePopup();
};

const removeMarkers = () => {
  renderedMarkers.forEach((marker) => {
    marker.remove();
  });
};

const getMainMarker = () => {
  const mainMarkerIcon = L.icon({
    iconUrl: MAIN_MARKER_ICON,
    iconSize: [MAIN_MARKER_WIDTH, MAIN_MARKER_HEIGHT],
    iconAnchor: [MAIN_MARKER_WIDTH / 2, MAIN_MARKER_HEIGHT],
  });

  const mainMarker = L.marker({
    lat: STARTING_LATITUDE,
    lng: STARTING_LONGITUDE,
  }, {
    icon: mainMarkerIcon,
    draggable: true,
    zIndexOffset: 1000,
  });

  const onMianMarkerMove = (evt) => {
    const lat = evt.target.getLatLng().lat;
    const lng = evt.target.getLatLng().lng;
    setAdress(lat, lng);
  };

  mainMarker.on('move', onMianMarkerMove);

  return mainMarker;
};

const mainMarker = getMainMarker();

const renderMainMarker = () => {
  mainMarker.setLatLng({
    lat: STARTING_LATITUDE,
    lng: STARTING_LONGITUDE,
  });

  mainMarker.addTo(map);
};

const renderMarkers = (offers) => {
  const createMarker = (offer) => {
    const markerIcon = L.icon({
      iconUrl: MARKER_ICON,
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
    renderedMarkers.push(marker);
  });
};

const setMapDefault = () => {
  map.setView({
    lat: STARTING_LATITUDE,
    lng: STARTING_LONGITUDE,
  }, STARTING_ZOOM);
};


const setMap = (onMapLoad) => {
  map.on('load', onMapLoad);
  setMapDefault();

  L.tileLayer(
    LAYER, {
      attribution: ATTRIBUTION,
    },
  ).addTo(map);
};

export {
  setMap,
  STARTING_LATITUDE,
  STARTING_LONGITUDE,
  removeMarkers,
  renderMarkers,
  renderMainMarker,
  setMapDefault,
  closeOpenedPopup
};

