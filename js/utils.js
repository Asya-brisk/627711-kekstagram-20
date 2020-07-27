'use strict';

window.utils = (function () {
  return {
    addClass: function (element, className) {
      element.classList.add(className);
    },
    removeClass: function (element, className) {
      element.classList.remove(className);
    },
    removeChilds: function (element) {
      element.innerHTML = '';
    },
    addModalOpenClass: function () {
      document.body.classList.add('modal-open');
    },
    removeModalOpenClass: function () {
      document.body.classList.remove('modal-open');
    },
    isEscEvent: function (evt, action) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.key === 'Enter') {
        action();
      }
    }
  };
})();
