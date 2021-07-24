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

const isArrEmpty = (arr) => {
  return (arr.length === 0) ? true : false;
}

const changeUrl = (element, url) => {
  element.src = url;
}

const changeClassName = (element, feature) => {
  element.className = `popup__feature popup__feature--${feature}`;
}

const renderElementsToList = (parentElement, callback, arr) => {
  if (isArrEmpty(arr)) {
    parentElement.remove();
  }

  const childElement = parentElement.firstElementChild;
  const fragment = document.createDocumentFragment();

  parentElement.innerHTML = '';

  arr.forEach((item) => {
    const cloneChildElement = childElement.cloneNode(true);
    callback(cloneChildElement, item);
    fragment.appendChild(cloneChildElement);
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
  renderElementsToList(featureList, changeClassName, offer.features);
  description.textContent = offer.description;
  renderElementsToList(photoList, changeUrl, offer.photos);

  return popup;
}

export {renderMarkerPopup};
