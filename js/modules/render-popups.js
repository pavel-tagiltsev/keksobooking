const translateType = (type) => {
  switch(type) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    default:
      return type;
  }
}

const renderPopups = (data) => {
  const popupTemplate = document.querySelector('#card').content;
  const popup = popupTemplate.querySelector('.popup');
  const clonePopup = popup.cloneNode(true);

  const avatar = clonePopup.querySelector('.popup__avatar');
  const title = clonePopup.querySelector('.popup__title');
  const adress = clonePopup.querySelector('.popup__text--address');
  const price = clonePopup.querySelector('.popup__text--price');
  const type = clonePopup.querySelector('.popup__type');
  const capacity = clonePopup.querySelector('.popup__text--capacity');
  const time = clonePopup.querySelector('.popup__text--time');
  const description = clonePopup.querySelector('.popup__description');

  const offer = data.offer;
  const author = data.author;

  avatar.src = author.avatar;

  (offer.title) ?
    title.textContent = offer.title :
    title.remove();

  (offer.adress) ?
    adress.textContent = offer.adress :
    adress.remove();

  (offer.price) ?
    price.textContent = offer.price + ' ₽/ночь' :
    price.remove();

  (offer.type) ?
    type.textContent = translateType(offer.type) :
    type.remove();

  (offer.rooms && offer.guests) ?
    capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей` :
    capacity.remove();

  (offer.checkin && offer.checkout) ?
    time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}` :
    time.remove();

  (offer.description) ?
    description.textContent = offer.description :
    description.remove();

  const featureList = clonePopup.querySelector('.popup__features');
  const featureItem = clonePopup.querySelector('.popup__feature');

  const addFeatures = (availableFeatures) => {
    const fragment = document.createDocumentFragment();
    featureList.innerHTML = '';

    availableFeatures.forEach(availableFeature => {
      const featureItemClone = featureItem.cloneNode(true);
      featureItemClone.className = `popup__feature popup__feature--${availableFeature}`;
      fragment.appendChild(featureItemClone);
    });

    featureList.appendChild(fragment);
  }

  (offer.features) ?
    addFeatures(offer.features) :
    featureList.remove();

  const photoList = clonePopup.querySelector('.popup__photos');
  const photoItem = clonePopup.querySelector('.popup__photo');

  const addPhotos = (photoUrls) => {
    const fragment = document.createDocumentFragment();
    photoList.innerHTML = '';

    photoUrls.forEach(photoUrl => {
      const photoItemClone = photoItem.cloneNode(true);
      photoItemClone.src = photoUrl;
      fragment.appendChild(photoItemClone);
    });

    photoList.appendChild(fragment);
  }

  (offer.photos) ?
    addPhotos(offer.photos) :
    photoList.remove();

  return clonePopup;
}

export {renderPopups};
