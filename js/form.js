'use strict';

window.form = (function () {
  var imageUploadForm = document.querySelector('.img-upload__form');
  var imageOverlay = imageUploadForm.querySelector('.img-upload__overlay');
  var formCancelButton = imageOverlay.querySelector('.img-upload__cancel');
  var hashtagInput = imageUploadForm.querySelector('.text__hashtags');
  var imgDescription = imageUploadForm.querySelector('.text__description');
  var submitFormBtn = imageUploadForm.querySelector('.img-upload__submit');
  var zoomLevel = imageOverlay.querySelector('.scale__control--value');
  var effectLevelLine = document.querySelector('.effect-level');

  var clearForm = function () {
    imageUploadForm.reset();
  };

  var onSubmit = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(imageUploadForm), onSuccess, onError);
  };

  var hideEditForm = function () {
    clearForm();
    window.utils.addClass(imageOverlay, 'hidden');
    window.utils.removeModalOpenClass();

    window.zoom.removeImageZoom();
    window.effects.removeEffects();
    window.validation.deactivateValidityCheck();

    formCancelButton.removeEventListener('click', hideEditForm);
    submitFormBtn.removeEventListener('submit', hideEditForm);
    imageUploadForm.removeEventListener('submit', onSubmit);
    document.removeEventListener('keydown', onEditFormEscPress);
  };

  var onSuccess = function () {
    hideEditForm();
    window.messages.showSuccessPopup();
  };

  var onError = function (message) {
    hideEditForm();
    window.messages.showErrorPopup(message);
  };

  var onEditFormEscPress = function (evt) {
    if (document.activeElement !== hashtagInput && document.activeElement !== imgDescription) {
      window.utils.isEscEvent(evt, hideEditForm);
    }
  };

  var showEditForm = function () {
    window.utils.removeClass(imageOverlay, 'hidden');
    zoomLevel.value = '100%';
    window.effects.removeEffects();
    window.utils.addClass(effectLevelLine, 'hidden');

    window.utils.addModalOpenClass();

    window.validation.activateValidityCheck();
    window.effects.applyEffects();
    window.zoom.addImageZoom();

    formCancelButton.addEventListener('click', hideEditForm);
    submitFormBtn.addEventListener('submit', hideEditForm);
    imageUploadForm.addEventListener('submit', onSubmit);
    document.addEventListener('keydown', onEditFormEscPress);
  };

  return {
    showEditForm: showEditForm
  };
})();
