const setFormValidation = () => {
  const type = document.querySelector('#type');
  const price = document.querySelector('#price');

  price.placeholder = 'мин. 1 000';
  price.min = '1000';

  type.addEventListener('change', evt => {
    if (evt.target.value === 'bungalow') {
      price.placeholder = 'мин. 0';
      price.min = '0';
      return;
    }
    if (evt.target.value === 'flat') {
      price.placeholder = 'мин. 1 000';
      price.min = '1000';
      return;
    }
    if (evt.target.value === 'house') {
      price.placeholder = 'мин. 5 000';
      price.min = '5000';
      return;
    }
    if (evt.target.value === 'palace') {
      price.placeholder = 'мин. 10 000';
      price.min = '10000';
      return;
    }

  });


  const timein = document.querySelector('#timein');
  const timeins = document.querySelectorAll('#timein option');
  const timeout = document.querySelector('#timeout');
  const timeouts = document.querySelectorAll('#timeout option');

  timein.addEventListener('change', evt => {
    timeouts.forEach(item => {
      if (evt.target.value === item.value) {
        item.selected = true;
      }
    });
  });

  timeout.addEventListener('change', evt => {
    timeins.forEach(item => {
      if (evt.target.value === item.value) {
        item.selected = true;
      }
    });
  });

  const rooms = document.querySelector('#room_number');
  const capacities = document.querySelectorAll('#capacity option');

  const copacityReset = () => {
    capacities.forEach(item => {
      if (item.value !== '1') {
        item.disabled = true;
      } else {
        item.selected = true;
        item.disabled = false;
      }
    });
  }

  copacityReset();

  const rightFilter = (evt) => {
    if (evt.target.value === '1') {
      capacities.forEach(item => {
        if (item.value !== evt.target.value) {
          item.disabled = true;
        } else {
          item.selected = true;
          item.disabled = false;
        }
      });
    }

    if (evt.target.value === '100') {
      capacities.forEach(item => {
        if (item.value !== '0') {
          item.disabled = true;
        } else {
          item.selected = true;
          item.disabled = false;
        }
      });
    }

    if (evt.target.value === '3') {
      capacities.forEach(item => {
        if (item.value === '0') {
          item.disabled = true;
        } else {
          item.selected = true;
          item.disabled = false;
        }
      });
    }

    if (evt.target.value === '2') {
      capacities.forEach(item => {
        if (item.value === '0' || item.value === '3') {
          item.disabled = true;
        } else {
          item.selected = true;
          item.disabled = false;
        }
      });
    }
  }

  rooms.addEventListener('change', evt => {
    rightFilter(evt);
  });
}

export default setFormValidation;

