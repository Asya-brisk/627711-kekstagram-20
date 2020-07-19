'use strict';

window.zoom = (function () {
  var Scale = {
    MAX_VALUE: 1,
    MIN_VALUE: 0.25,
    STEP: 0.25,
    DEFAULT_PERCENTS: 100
  };

  var currentScaleValue = 1;

  var imagePreview = document.querySelector('.img-upload__preview img');
  var imageScale = document.querySelector('.scale');
  var enlargeImageBtn = imageScale.querySelector('.scale__control--bigger');
  var reduceImageBtn = imageScale.querySelector('.scale__control--smaller');
  var scaleControlValue = imageScale.querySelector('.scale__control--value');

  var changeImageSize = function (ScaleValue) {
    if (currentScaleValue < ScaleValue) {
      currentScaleValue += Scale.STEP;
    }
    if (currentScaleValue > ScaleValue) {
      currentScaleValue -= Scale.STEP;
    }
    return currentScaleValue;
  };

  var onScaleBtnClick = function (evt) {
    var zoomValue;
    if (evt.target === reduceImageBtn) {
      zoomValue = changeImageSize(Scale.MIN_VALUE);
    }

    if (evt.target === enlargeImageBtn) {
      zoomValue = changeImageSize(Scale.MAX_VALUE);
    }

    scaleControlValue.value = zoomValue * Scale.DEFAULT_PERCENTS + '%';
    imagePreview.style.transform = 'scale(' + zoomValue + ')';
  };

  return {
    addImageZoom: function () {
      enlargeImageBtn.addEventListener('click', onScaleBtnClick);
      reduceImageBtn.addEventListener('click', onScaleBtnClick);
    },
    removeImageZoom: function () {
      enlargeImageBtn.removeEventListener('click', onScaleBtnClick);
      reduceImageBtn.removeEventListener('click', onScaleBtnClick);
    }
  };
})();
