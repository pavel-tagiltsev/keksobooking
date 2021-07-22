const type = document.querySelector('#type');
const price = document.querySelector('#price');
const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');
const rooms = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const capacities = document.querySelectorAll('#capacity option');


const MinPrices = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
}

const onTypeChange = () => {
  const minPrice = MinPrices[type.value];
  const setTextHint = (minPrice) => `мин. ${minPrice}`;

  price.placeholder = setTextHint(minPrice);
  price.min = minPrice;
};

const onTimeinChange = () => {
  timeout.value = timein.value;
};

const onTimeoutChange = () => {
  timein.value = timeout.value;
};

const roomCapacities = {
  1: [1],
  2: [1,2],
  3: [1,2,3],
  100: [0],
}

const onRoomsChange = () => {
  const possibleCapacities = roomCapacities[+rooms.value];

  capacities.forEach((option) => {
    option.disabled = true;
  })

  possibleCapacities.forEach((possibleCapacity) => {
    capacities.forEach((capacity) => {
      if (+capacity.value === possibleCapacity) {
        capacity.disabled = false;
      }
    });
  });

  capacity.value = Math.max(...possibleCapacities);
}

onTypeChange();
onRoomsChange();

type.addEventListener('change', onTypeChange);
timein.addEventListener('change', onTimeinChange);
timeout.addEventListener('change', onTimeoutChange);
rooms.addEventListener('change', onRoomsChange);
