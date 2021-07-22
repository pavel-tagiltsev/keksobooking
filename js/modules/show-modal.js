const showModal = (templateSelector, modalSelector) => {
  const template = document.querySelector(templateSelector);
  const modalClone = template.content.cloneNode(true);
  const main = document.querySelector('main');

  main.appendChild(modalClone);

  const modal = document.querySelector(modalSelector);

  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      modal.remove();
      window.removeEventListener('keydown', onEscPress);
      document.body.style.overflow = '';
    }
  }

  const onModalClick = (evt) => {
    if (evt.currentTarget === modal) {
      modal.remove();
      modal.removeEventListener('click', onModalClick);
      document.body.style.overflow = '';
    }
  }

  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', onEscPress);
  modal.addEventListener('click', onModalClick);
}

export {showModal};
