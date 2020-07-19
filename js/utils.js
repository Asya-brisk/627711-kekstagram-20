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
    isEscEvent: function (evt, action) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        action();
      }
    },
    isEnterEvent: function (evt, action, element) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        action(element);
      }
    }
  };
})();
