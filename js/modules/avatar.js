const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const fileChooser = document.querySelector('.ad-form__field input[type=file]');
const perview = document.querySelector('.ad-form-header__preview img');

const deleteAvatarPerview = () => {
  perview.src = DEFAULT_AVATAR;
}

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      perview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

export {deleteAvatarPerview};
