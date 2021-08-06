import {
  activateMapFilter,
  resetMapFilter
} from './modules/filter.js';

import './modules/gallery.js';
import './modules/avatar.js';
import './modules/photos.js';

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

import {
  createOffers
} from './util/create-offers.js'

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

const onSuccessMapLoad = (response) => {
  loadedOffers = response.slice(MIN_NUMBER_OFFERS, MAX_NUMBER_OFFERS);
  activateMapFilter(loadedOffers);
  renderMarkers(loadedOffers);
}

const onMapLoad = () => {
  activateAdForm({
    PostSettings: {
      postUrl: POST_URL,
      onSuccess: onSuccessPost,
      onFail: showErrorPostModal,
    },
    onReset: {
      callback: onResetButtonClick,
    },
  });
  renderMainMarker();
  setAdress(STARTING_LATITUDE, STARTING_LONGITUDE);
  /*  Для активации загрузки данных с сервера необходимо
  закоментировать блок temporary и разблокировать блок loading.
  Возможны ошибки из-за отсутствия данных
  или изменившегося формата данных.*/

  /* Блок temporary. Данные для корректной работы демонстрации. */
  const temporaryData = createOffers();
  onSuccessMapLoad(temporaryData);

  /* Блок loading. Из-за отсутствия доступа к серверным данным,
    отключаю загрузку для корректной работы демонстрации.

    getData(
      GET_URL,
      onSuccessMapLoad,
      showErrorGetModal,
    );
  */
}

setMap(onMapLoad);
