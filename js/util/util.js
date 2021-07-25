const debounce = (callback, delay) => {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  }
}

const activateForm = (form) => {
  const classes = form.classList;
  const lastFormClass = classes[classes.length - 1];
  classes.remove(lastFormClass);

  Array.from(form.children).forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

const isArrEmpty = (arr) => {
  return (arr.length === 0) ? true : false;
}

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const isEnterEvent = (evt) => evt.key === 'Enter';

export {debounce, isEscEvent, isEnterEvent, activateForm, isArrEmpty};
