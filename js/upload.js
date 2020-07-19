'use strict';

window.upload = (function () {
  var imagePreview = document.querySelector('.img-upload__preview img');
  var uploadInput = document.querySelector('.img-upload__input');

  return {
    previewFile: function () {
      var file = uploadInput.files[0];
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imagePreview.src = reader.result;
      });

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };
})();
