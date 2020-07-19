'use strict';

window.form = (function () {
  var body = document.querySelector('body');
  var imageUploadForm = document.querySelector('.img-upload__form');
  var imgUploadButton = imageUploadForm.querySelector('.img-upload__input');
  var imageOverlay = imageUploadForm.querySelector('.img-upload__overlay');
  var formCancelButton = imageOverlay.querySelector('.img-upload__cancel');
  var hashtagInput = imageUploadForm.querySelector('.text__hashtags');
  var imgDescription = imageUploadForm.querySelector('.text__description');
  var submitFormBtn = imageUploadForm.querySelector('.img-upload__submit');

  var clearForm = function () {
    imageUploadForm.reset();
  };

  var hideEditForm = function () {
    clearForm();
    window.utils.addClass(imageOverlay, 'hidden');
    window.utils.removeClass(body, 'modal-open');
    window.zoom.removeImageZoom();
    window.effects.removeEffects();
    window.validation.deactivateValidityCheck();

    formCancelButton.removeEventListener('click', hideEditForm);
    submitFormBtn.removeEventListener('submit', hideEditForm);
    document.removeEventListener('keydown', onEditFormEscPress);
  };

  var onEditFormEscPress = function (evt) {
    if (document.activeElement !== hashtagInput && document.activeElement !== imgDescription) {
      window.utils.isEscEvent(evt, hideEditForm);
    }
  };

  var showEditForm = function () {
    window.effects.applyEffects();
    window.zoom.addImageZoom();
    window.utils.removeClass(imageOverlay, 'hidden');
    window.utils.addClass(body, 'modal-open');
    window.validation.activateValidityCheck();

    formCancelButton.addEventListener('click', hideEditForm);
    submitFormBtn.addEventListener('submit', hideEditForm);
    document.addEventListener('keydown', onEditFormEscPress);
  };

  return {
    uploadImage: function () {
      imgUploadButton.addEventListener('change', showEditForm);
    }
  };
})();
