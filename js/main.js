import {
  activateMapFilter,
  resetMapFilter
} from './modules/filter.js';

import {
  getData
} from './modules/api.js';

import {
  setMap,
  STARTING_LATITUDE,
  STARTING_LONGITUDE,
  removeMarkers,
  renderMarkers,
  renderMainMarker,
  setMapDefault,
  closeOpenedPopup
} from './modules/map.js';

import {
  setAdress,
  activateAdForm,
  resetAdForm
} from './modules/form.js';

import {
  showErrorGetModal,
  showSuccessPostModal,
  showErrorPostModal
} from './modules/modal.js';

const GET_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const POST_URL = 'https://22.javascript.pages.academy/keksobooking';
const MIN_NUMBER_OFFERS = 0;
const MAX_NUMBER_OFFERS = 10;

let loadedOffers = [];

const setDefault = () => {
  resetAdForm();
  resetMapFilter();
  setMapDefault();
  closeOpenedPopup();
  removeMarkers();
  renderMarkers(loadedOffers);
  renderMainMarker();
  setAdress(STARTING_LATITUDE, STARTING_LONGITUDE);
}

const onResetButtonClick = () => {
  return (evt) => {
    evt.preventDefault();
    setDefault();
  };
};

const onSuccessPost = () => {
  showSuccessPostModal();
  setDefault();
};

const onFailPost = () => {
  showErrorPostModal();
};

const onSuccessMapLoad = (response) => {
  loadedOffers = response.slice(MIN_NUMBER_OFFERS, MAX_NUMBER_OFFERS);
  activateMapFilter(loadedOffers);
  renderMarkers(loadedOffers);
}

const onFailMapLoad = () => {
  showErrorGetModal();
}

const onMapLoad = () => {
  activateAdForm({
    PostSettings: {
      postUrl: POST_URL,
      onSuccess: onSuccessPost,
      onFail: onFailPost,
    },
    onReset: {
      callback: onResetButtonClick,
    },
  });
  renderMainMarker();
  setAdress(STARTING_LATITUDE, STARTING_LONGITUDE);
  getData(
    GET_URL,
    onSuccessMapLoad,
    onFailMapLoad,
  );
}

setMap(onMapLoad);
