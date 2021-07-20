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

function debounce(callback, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  }
}

export {getRandomPositiveFloat, getRandomPositiveNumber, debounce};
