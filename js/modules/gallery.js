const MAP_SELECTOR = '.map';
const POPUP_CLASS = 'leaflet-popup';
const GALLERY_SELECTOR = '.popup__photos';
const OBSERVER_SETTINGS = {
  childList: true,
  subtree: true,
};

const setGallery = (mutations) =>  {
  for (let mutation of mutations) {
    for (let node of mutation.addedNodes) {
      if (!(node instanceof HTMLElement)) continue;
      if (node.classList.contains(POPUP_CLASS)) {
        baguetteBox.run(GALLERY_SELECTOR);
      }
    }
  }
};

const observer = new MutationObserver(setGallery);
const map = document.querySelector(MAP_SELECTOR);

observer.observe(map, OBSERVER_SETTINGS);
