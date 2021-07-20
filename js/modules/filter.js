const filterPins = (response) => {
  const filter = document.querySelector('.map__filters');
  const typeFilter = filter.querySelector('#housing-type');
  const priceFilter = filter.querySelector('#housing-price');
  const roomsFilter = filter.querySelector('#housing-rooms');
  const guestsFilter = filter.querySelector('#housing-guests');

  const type = typeFilter.value;
  const price = priceFilter.value;
  const rooms = roomsFilter.value;
  const guests = guestsFilter.value;
  const featurs = [...filter.querySelectorAll('#housing-features input:checked')].map(checkbox => checkbox.value);


  const getRightPrice = (a) => {
    if (price === 'middle') {
      return a.offer.price > 10000 && a.offer.price < 50000;
    }
    if (price === 'low') {
      return a.offer.price <= 10000;
    }
    if (price === 'high') {
      return a.offer.price >= 50000;
    }
  }

  const getRightFeatures = (arr, arr2) => {
    let arrCheck = arr.map(item => {
      return arr2.includes(item);
    })

    return (arrCheck.includes(false)) ? false : true;
  }

  let filteredOffers;

  filteredOffers = response.filter(offer => (
    (type === 'any' || offer.offer.type === type) &&
    (rooms === 'any' || offer.offer.rooms === +rooms) &&
    (price === 'any' || getRightPrice(offer)) &&
    (guests === 'any' || offer.offer.guests === +guests) &&
    (featurs === 'any' || getRightFeatures(featurs, offer.offer.features))
  ));

  return filteredOffers;
}

export {filterPins};
