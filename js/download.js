'use strict';

window.download = (function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var form = document.querySelector('.img-upload__form');
  var uploadInput = form.querySelector('input[type="file"]');
  var imagePreview = document.querySelector('.img-upload__preview img');
  var effectsPreview = document.querySelectorAll('.effects__preview');

  var previewFile = function () {
    var file = uploadInput.files[0];

    if (!file) {
      return;
    }
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (!matches) {
      var pictureUpload = document.querySelector('#upload-file');
      window.messages.showErrorPopup('Неподходящий тип файла.');
      pictureUpload.value = '';
    }
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        imagePreview.src = reader.result;
        effectsPreview.forEach(function (item) {
          item.style.backgroundImage = 'url(' + reader.result + ')';
        });
        window.form.showEditForm();
      });
      reader.readAsDataURL(file);
    }
  };

  form.addEventListener('change', function (evt) {
    var target = evt.target;
    if (target === uploadInput) {
      previewFile();
    }
  });
})();
