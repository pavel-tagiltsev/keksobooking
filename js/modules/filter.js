const DEFAULT_VALUE = 'any';
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

const mapFilter = document.querySelector('.map__filters');
const typeFilter = mapFilter.querySelector('#housing-type');
const priceFilter = mapFilter.querySelector('#housing-price');
const roomsFilter = mapFilter.querySelector('#housing-rooms');
const guestsFilter = mapFilter.querySelector('#housing-guests');
const featursFilter = mapFilter.querySelector('#housing-features');

const checkType = (offer) => {
  const chosenTypeOption = typeFilter.value;
  const offerType = offer.offer.type;

  return chosenTypeOption === DEFAULT_VALUE || chosenTypeOption === offerType;
}

const checkPrice = (offer) => {
  const chosenPriceRangeOption = priceFilter.value;
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
  const chosenRoomOption = roomsFilter.value;
  const availableRoomOptions = offer.offer.rooms;

  return chosenRoomOption === DEFAULT_VALUE || +chosenRoomOption === availableRoomOptions;
}

const checkGuests = (offer) => {
  const choosenCapacityOption = guestsFilter.value;
  const availableCapacityOptions = offer.offer.guests;

  return choosenCapacityOption === DEFAULT_VALUE || +choosenCapacityOption === availableCapacityOptions;
}

const checkFeatures = (offer) => {
  const chosenFeatures = featursFilter.querySelectorAll('.map__checkbox:checked');
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
