'use strict';

window.messages = (function () {
  var main = document.querySelector('main');
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  var popup;

  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, removePopup);
  };

  var onPopupClick = function (evt) {
    if (evt.target.type === 'button' || evt.target === popup) {
      removePopup();
    }
  };

  var showPopup = function (template) {
    popup = template;
    main.appendChild(template);
    document.addEventListener('keydown', onPopupEscPress);
    template.addEventListener('click', onPopupClick);
  };

  var removePopup = function () {
    popup.remove();
    document.removeEventListener('keydown', onPopupClick);
    popup.removeEventListener('click', onPopupEscPress);
  };

  return {
    showSuccessPopup: function () {
      var successPopup = successMessage.cloneNode(true);
      showPopup(successPopup);
    },
    showErrorPopup: function (message) {
      var errorPopup = errorMessage.cloneNode(true);
      errorPopup.querySelector('.error__title').textContent = message;
      showPopup(errorPopup);
    }
  };
})();
