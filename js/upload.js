'use strict';

window.upload = (function () {
  var imagePreview = document.querySelector('.img-upload__preview img');
  var uploadInput = document.querySelector('.img-upload__input');
  var effectsPreview = document.querySelectorAll('.effects__preview');

  return {
    previewFile: function () {
      var file = uploadInput.files[0];

      if (file) {
        var reader = new FileReader();

        var onReaderLoad = function () {
          imagePreview.src = reader.result;
          effectsPreview.forEach(function (preview) {
            preview.style.backgroundImage = 'url(' + reader.result + ')';
          });
        };
        reader.addEventListener('load', onReaderLoad);

        reader.readAsDataURL(file);
      }
    }
  };
})();
