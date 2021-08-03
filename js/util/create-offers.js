const TITLES = [
  'Квартира студия в престижном районе',
  'Тихая квартирка недалеко от метро',
  'Императорский дворец в центре Токио',
  'Небольшая бюджетная комната для студентов',
  'Уютное гнездышко для молодоженов',
  'Стандартная квартира в центре',
  'Милое гнездышко для фанатов Анимэ',
  'Хостел «Для друзей»',
  'Загородный дом для спокойного отдыха',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const CHECKIN_SLOTS = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT_SLOTS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Комната в трёхкомнатной квартире, подойдёт молодым путешественникам.',
  'У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!',
  'Хейтеров просьба не беспокоить.',
  'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
  'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.',
  'Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.',
  'Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.',
  'Великолепная квартира-студия в центре Токио. Подходит как туристам, там и бизнесменам. Квартира полностью укомплектована и имеет свежий ремонт.',
]

const PHOTOS = [
  'img/apartaments/duonguyen.jpg',
  'img/apartaments/brandon-hoogenboom.jpg',
  'img/apartaments/claire-rendall.jpg',
];

const MIN_X = 35.65000;
const MAX_X = 35.70000;

const MIN_Y = 139.70000;
const MAX_Y = 139.80000;

const MIN_PRICE = 1000;
const MAX_PRICE = 100000;

const MIN_ROOMS = 1;
const MAX_ROOMS = 3;

const MIN_GUESTS = 0;
const MAX_GUESTS = 2;

const NUMBER_OF_OFFERS = 8;

const getRandomPositiveFloat = (min, max, rounding = 0) => {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));

  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(rounding);
};

function getRandomPositiveNumber (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const roundNumber = (number) => {
  const remains = number % 1000;

  return number - remains;
}

const getRundomLocation = () => {
  const numbersAfterPoint = 5;
  const randomX = getRandomPositiveFloat(MIN_X, MAX_X, numbersAfterPoint);
  const randomY = getRandomPositiveFloat(MIN_Y, MAX_Y, numbersAfterPoint);

  return {
    x: randomX,
    y: randomY,
  }
}

const addZeroToNumbersLessThanTen = (number) => {
  return number < 10 ? '0' + number : number;
}

const getRandomArrayElement = (arr) => {
  return arr[getRandomPositiveNumber(0, arr.length - 1)];
}

const getArrayRandomLength = (arr) => {
  return arr.slice(0, getRandomPositiveNumber(1, arr.length));
}

const createOffer = function(index) {
  const rundomLocation = getRundomLocation();

  return {
    author: {
      avatar: `img/avatars/user${addZeroToNumbersLessThanTen(index + 1)}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${rundomLocation.x} : ${rundomLocation.y}`,
      price: roundNumber(getRandomPositiveNumber(MIN_PRICE, MAX_PRICE)),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomPositiveNumber(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomArrayElement(CHECKIN_SLOTS),
      checkout: getRandomArrayElement(CHECKOUT_SLOTS),
      features: getArrayRandomLength(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getArrayRandomLength(PHOTOS),
      location: rundomLocation,
    },
    location: {
      lat: rundomLocation.x,
      lng: rundomLocation.y,
    },
  };
}

const createOffers = () => new Array(NUMBER_OF_OFFERS).fill(null).map((item, index) => createOffer(index));

export {createOffers};
