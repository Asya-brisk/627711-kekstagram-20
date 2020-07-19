'use strict';

window.effects = (function () {
  var DEFAULT_EFFECT_LEVEL = 100;
  var DEFAULT_EFFECT_VALUE = 1;

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

    var startCoordsX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoordsX - moveEvt.clientX;
      var levelPinCoord = levelPin.offsetLeft - shift;
      var pinMovementLineX = {
        min: effectLevelLine.offsetLeft - levelPin.offsetWidth,
        max: effectLevelLine.offsetWidth
      };

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
    effectsLevel.value = DEFAULT_EFFECT_VALUE;
    levelPin.style.left = DEFAULT_EFFECT_LEVEL + '%';
    depthLine.style.width = DEFAULT_EFFECT_LEVEL + '%';
    window.utils.removeClass(effectsLevel, 'hidden');
    changeEffectName(currentEffect);
  };

  var previewImage = function (eff) {
    imagePreview.style.filter = eff;
  };

  var changeEffectName = function (effectName) {
    switch (effectName) {
      case 'chrome':
        return previewImage('grayscale(' + getCurrentEffectValue(effectSettings.chrome) + ')');
      case 'sepia':
        return previewImage('sepia(' + getCurrentEffectValue(effectSettings.sepia) + ')');
      case 'marvin':
        return previewImage('invert(' + getCurrentEffectValue(effectSettings.marvin) + '%)');
      case 'phobos':
        return previewImage('blur(' + getCurrentEffectValue(effectSettings.phobos) + 'px)');
      case 'heat':
        return previewImage('brightness(' + getCurrentEffectValue(effectSettings.heat) + ')');
      default:
        return setDefaultSettings();
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
