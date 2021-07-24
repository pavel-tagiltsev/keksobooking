const DEFAULT_VALUE = 'any';
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

const mapFilter = document.querySelector('.map__filters');
const typeSelect = mapFilter.querySelector('#housing-type');
const priceSelect = mapFilter.querySelector('#housing-price');
const roomsSelect = mapFilter.querySelector('#housing-rooms');
const guestsSelect = mapFilter.querySelector('#housing-guests');
const featursFieldset = mapFilter.querySelector('#housing-features');

const checkType = (offer) => {
  const chosenTypeOption = typeSelect.value;
  const offerType = offer.offer.type;

  return chosenTypeOption === DEFAULT_VALUE || chosenTypeOption === offerType;
}

const checkPrice = (offer) => {
  const chosenPriceRangeOption = priceSelect.value;
  const offerPrice = offer.offer.price;

  switch (chosenPriceRangeOption) {
    case DEFAULT_VALUE:
      return true;
    case 'middle':
      return offerPrice >= LOW_PRICE && offerPrice <= HIGH_PRICE;
    case 'low':
      return offerPrice < LOW_PRICE;
    case 'high':
      return offerPrice > HIGH_PRICE;
    default:
      return false;
  }
}

const checkRooms = (offer) => {
  const chosenRoomOption = roomsSelect.value;
  const availableRoomOptions = offer.offer.rooms;

  return chosenRoomOption === DEFAULT_VALUE || +chosenRoomOption === availableRoomOptions;
}

const checkGuests = (offer) => {
  const choosenCapacityOption = guestsSelect.value;
  const availableCapacityOptions = offer.offer.guests;

  return choosenCapacityOption === DEFAULT_VALUE || +choosenCapacityOption === availableCapacityOptions;
}

const checkFeatures = (offer) => {
  const chosenFeatures = featursFieldset.querySelectorAll('.map__checkbox:checked');
  const offerAvailableFeatures = offer.offer.features;
  let total = 0;

  chosenFeatures.forEach((checkedFeature) => {
    if (offerAvailableFeatures.includes(checkedFeature.value)) {
      total++;
    }
  })

  return total === chosenFeatures.length;
}

const filterMarkers = (offers) => {
  const filteredOffers = offers.filter((offer) => (
    checkType(offer) &&
    checkPrice(offer) &&
    checkRooms(offer) &&
    checkGuests(offer) &&
    checkFeatures(offer)
  ));

  return filteredOffers;
}

export {filterMarkers};
