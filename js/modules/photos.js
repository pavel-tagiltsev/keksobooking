const ALLOWED_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const ALLOWED_AMOUNT_OF_FILES = 10;

const fileChooser = document.querySelector('.ad-form__upload input[type=file]');
const perviews = document.querySelectorAll('.ad-form__photo');

const deletePerviews = () => {
  perviews.forEach((perview) => {
    if (perview.firstElementChild) {
      perview.firstElementChild.remove();
    }
  });
};

const isAllowedAmountOfFiles = (files) => {
  return (files.length > ALLOWED_AMOUNT_OF_FILES) ? true : false;
};

const isAllowedFileTypes = (files) => {
  const results = [];

  Object.values(files).forEach((file) => {
    const fileName = file.name.toLowerCase();

    const result = ALLOWED_FILE_TYPES.some((type) => {
      return fileName.endsWith(type);
    });

    results.push(result);
  });

  return results.includes(false);
};

const onReaderLoad = (parentElement, reader) => {
  return () => {
    const img = document.createElement('img');

    img.classList.add('ad-form__img');
    img.alt = 'Фотография жилья';
    img.src = reader.result;

    parentElement.appendChild(img);
  }
};

const showPerviews = (files) => {
  Object.values(files).forEach((file, index) => {
    const reader = new FileReader();
    const container = perviews[index];

    reader.addEventListener('load', onReaderLoad(container, reader));
    reader.readAsDataURL(file);
  });
};

const showError = (text) => {
  alert(text);
  fileChooser.value = '';
};

const onFileChooserChange = (evt) => {
  const files = fileChooser.files;
  const tooManyFiles = isAllowedAmountOfFiles(files);
  const restrictedTypes =  isAllowedFileTypes(files);

  deletePerviews();

  if (tooManyFiles) {
    showError('You are only allowed to upload a maximum of 10 files');
    evt.preventDefault();
    return;
  }

  if (restrictedTypes) {
    showError('You are only allowed to upload jepg and png types');
    evt.preventDefault();
    return;
  }

  showPerviews(files);
}

fileChooser.addEventListener('change', onFileChooserChange);
