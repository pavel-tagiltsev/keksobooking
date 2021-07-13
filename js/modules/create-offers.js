import {getRandomPositiveFloat, getRandomPositiveNumber} from '../util/util.js';

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

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
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
      title: 'Загаловок',
      address: `${rundomLocation.x}, ${rundomLocation.y}`,
      price: getRandomPositiveNumber(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomPositiveNumber(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomArrayElement(CHECKIN_SLOTS),
      checkout: getRandomArrayElement(CHECKOUT_SLOTS),
      features: getArrayRandomLength(FEATURES),
      description: 'Описание',
      photos: getArrayRandomLength(PHOTOS),
      location: rundomLocation,
    },
  };
}

const createOffers = () => new Array(NUMBER_OF_OFFERS).fill(null).map((item, index) => createOffer(index));

export {createOffers};
