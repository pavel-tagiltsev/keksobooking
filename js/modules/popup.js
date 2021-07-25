import {
  isArrEmpty
} from '../util/util.js';

const getTranslatedType = (type) => {
  const types = {
    bungalow: 'Бунгало',
    flat: 'Квартрира',
    house: 'Дом',
    palace: 'Дворец',
  }

  return types[type];
};

const getRightNameOfRooms = (number) => {
  const lastNumber = +number.toString().slice(-1);

  if (lastNumber === 1) {
    return `${number} комнатa`;
  }
  if (lastNumber === 2 || lastNumber === 3 || lastNumber === 4) {
    return `${number} комнаты`;
  }

  return `${number} комнат`;
}

const getRightNameOfGuests = (number) => {
  const lastNumber = +number.toString().slice(-1);

  return (lastNumber === 1) ? `${number} гостя` : `${number} гостей`;
}

const renderPhotots = (parentElement, arr) => {
  if (isArrEmpty(arr)) {
    parentElement.remove();
  }

  const linkElement = parentElement.querySelector('a');
  const imgElement = parentElement.querySelector('img');
  const fragment = document.createDocumentFragment();

  parentElement.innerHTML = '';

  arr.forEach((url) => {
    const link = linkElement.cloneNode();
    const img = imgElement.cloneNode();

    link.href = url;
    img.src = url;

    link.appendChild(img);
    fragment.appendChild(link);
  });

  parentElement.appendChild(fragment);
}

const renderFeatures= (parentElement, arr) => {
  if (isArrEmpty(arr)) {
    parentElement.remove();
  }

  const featureElement = parentElement.querySelector('.popup__feature');
  const fragment = document.createDocumentFragment();

  parentElement.innerHTML = '';

  arr.forEach((feature) => {
    const featureItem = featureElement.cloneNode(true);
    featureItem.className = `popup__feature popup__feature--${feature}`;
    fragment.appendChild(featureItem);
  });

  parentElement.appendChild(fragment);
}

const renderMarkerPopup = ({author, offer}) => {
  const template = document.querySelector('#card').content;
  const popup = template.querySelector('.popup').cloneNode(true);

  const avatar = popup.querySelector('.popup__avatar');
  const title = popup.querySelector('.popup__title');
  const address = popup.querySelector('.popup__text--address');
  const price = popup.querySelector('.popup__text--price');
  const type = popup.querySelector('.popup__type');
  const capacity = popup.querySelector('.popup__text--capacity');
  const time = popup.querySelector('.popup__text--time');
  const featureList = popup.querySelector('.popup__features');
  const description = popup.querySelector('.popup__description');
  const photoList = popup.querySelector('.popup__photos');

  avatar.src = author.avatar;
  title.textContent = offer.title;
  address.textContent = offer.address;
  price.textContent = `${offer.price} ₽/ночь`;
  type.textContent = getTranslatedType(offer.type);
  capacity.textContent = `${getRightNameOfRooms(offer.rooms)} для ${getRightNameOfGuests(offer.guests)}`;
  time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  renderFeatures(featureList, offer.features);
  description.textContent = offer.description;
  renderPhotots(photoList, offer.photos);

  return popup;
}


export {renderMarkerPopup};
