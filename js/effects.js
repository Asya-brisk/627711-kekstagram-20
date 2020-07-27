'use strict';

window.effects = (function () {
  var DefaultEffect = {
    LEVEL: 100,
    VALUE: 1
  };

  var imagePreview = document.querySelector('.img-upload__preview img');
  var effectsLevel = document.querySelector('.effect-level');
  var imgEffects = document.querySelector('.effects');
  var effectLevelLine = effectsLevel.querySelector('.effect-level__line');
  var levelPin = effectsLevel.querySelector('.effect-level__pin');
  var depthLine = effectsLevel.querySelector('.effect-level__depth');

  var currentEffect = 'none';

  var effectSettings = {
    chrome: {
      MIN: 0,
      MAX: 1
    },
    sepia: {
      MIN: 0,
      MAX: 1
    },
    marvin: {
      MIN: 0,
      MAX: 100
    },
    phobos: {
      MIN: 0,
      MAX: 3
    },
    heat: {
      MIN: 1,
      MAX: 3
    }
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    var pinMovementLineX = {
      min: effectLevelLine.offsetLeft - levelPin.offsetWidth,
      max: effectLevelLine.offsetWidth
    };

    var startCoordsX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoordsX - moveEvt.clientX;
      var levelPinCoord = levelPin.offsetLeft - shift;

      startCoordsX = moveEvt.clientX;

      if (levelPinCoord >= pinMovementLineX.min && levelPinCoord <= pinMovementLineX.max) {
        levelPin.style.left = levelPinCoord + 'px';
        depthLine.style.width = levelPin.style.left;
      }

      effectsLevel.value = levelPinCoord / (pinMovementLineX.max - pinMovementLineX.min);
      changeEffectName(currentEffect);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var setDefaultSettings = function () {
    imagePreview.style.filter = 'none';
    window.utils.addClass(effectsLevel, 'hidden');
  };

  var getCurrentEffectValue = function (effect) {
    return effect.MIN + (effect.MAX - effect.MIN) * effectsLevel.value;
  };

  var setEffects = function (evt) {
    currentEffect = evt.target.value;
    imagePreview.className = 'effects__preview--' + currentEffect;
    effectsLevel.value = DefaultEffect.VALUE;
    levelPin.style.left = DefaultEffect.LEVEL + '%';
    depthLine.style.width = DefaultEffect.LEVEL + '%';
    window.utils.removeClass(effectsLevel, 'hidden');
    changeEffectName(currentEffect);
  };

  var changeEffectName = function (effectName) {
    var filtersMap = {
      'chrome': 'grayscale(' + getCurrentEffectValue(effectSettings.chrome) + ')',
      'sepia': 'sepia(' + getCurrentEffectValue(effectSettings.sepia) + ')',
      'marvin': 'invert(' + getCurrentEffectValue(effectSettings.marvin) + '%)',
      'phobos': 'blur(' + getCurrentEffectValue(effectSettings.phobos) + 'px)',
      'heat': 'brightness(' + getCurrentEffectValue(effectSettings.heat) + ')'
    };

    if (effectName !== 'none') {
      imagePreview.style.filter = filtersMap[effectName];
    } else {
      setDefaultSettings();
    }
  };

  return {
    applyEffects: function () {
      imgEffects.addEventListener('change', setEffects);
      levelPin.addEventListener('mousedown', onMouseDown);
    },
    removeEffects: function () {
      imgEffects.removeEventListener('change', setEffects);
      levelPin.removeEventListener('mousedown', onMouseDown);
    }
  };
})();
