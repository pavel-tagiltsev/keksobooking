const MODAL_ZINDEX = '10000';
const CLASS_HIDDEN = 'hidden';

// Templates
const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');

// SuccessPostModal
const successPostModal = successModalTemplate.cloneNode(true);

// ErrorPostModal
const errorPostModal = errorModalTemplate.cloneNode(true);
const closeButton = errorPostModal.querySelector('.error__button');

// ErrorGetModal
const errorGetModal = errorModalTemplate.cloneNode(true);
const errorGetModalMessage = errorGetModal.querySelector('.error__message');
const erroeGetModalButton = errorGetModal.querySelector('.error__button');
errorGetModalMessage.textContent = 'Ошибка при загрузке данных';
erroeGetModalButton.remove();

// Make hidden and add to the body all modals
const setUpModal = (modal) => {
  modal.classList.add(CLASS_HIDDEN);
  modal.style.zIndex = MODAL_ZINDEX;
  document.body.append(modal);
}

setUpModal(successPostModal);
setUpModal(errorPostModal);
setUpModal(errorGetModal);

// Logic
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const isEnterEvent = (evt) => evt.key === 'Enter';

const showModal = (modal) => {

  const onCloseButtonClick = (evt) => {
    evt.preventDefault();
    closeModal();
  }

  const onWindowKeydown = (evt) => {
    if (isEscEvent(evt) || isEnterEvent(evt)) {
      closeModal();
    }
  }

  const onModalClick = (evt) => {
    if (evt.currentTarget === modal) {
      closeModal();
    }
  }

  const closeModal = () => {
    if (modal === errorPostModal) {
      closeButton.removeEventListener('click', onCloseButtonClick);
    }

    modal.classList.add(CLASS_HIDDEN);
    document.body.style.overflow = '';
    window.removeEventListener('keydown', onWindowKeydown);
    modal.removeEventListener('click', onModalClick);
  }

  const openModal = () => {
    if (modal === errorPostModal) {
      closeButton.addEventListener('click', onCloseButtonClick);
    }

    modal.classList.remove(CLASS_HIDDEN);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onWindowKeydown);
    modal.addEventListener('click', onModalClick);
  }

  openModal();
}

const showSuccessPostModal = () => {
  showModal(successPostModal);
}

const showErrorPostModal = () => {
  showModal(errorPostModal);
}

const showErrorGetModal = () => {
  showModal(errorGetModal);
}

export {showSuccessPostModal, showErrorPostModal, showErrorGetModal};
