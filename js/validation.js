'use strict';

window.validation = (function () {
  var HASHTAG_RE = /^#[A-Za-zА-Яа-я0-9]+$/;
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAGS_MAX_NUMBER = 5;
  var INVALID_INPUT_STYLE = 'red';
  var hashtagInput = document.querySelector('.text__hashtags');

  var getHashtagValidityMessage = function (hashtag, hashtagsArr) {
    if (hashtag.length === 1 && hashtag.charAt(0) === '#') {
      return 'Хеш-тег не может состоять только из символа #';
    }
    if (hashtag.length > HASHTAG_MAX_LENGTH) {
      return 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
    }
    if (hashtagsArr.length > HASHTAGS_MAX_NUMBER) {
      return 'Можно указать не более 5 хэш-тегов';
    }
    if (hashtagsArr.indexOf(hashtag) !== hashtagsArr.lastIndexOf(hashtag)) {
      return 'Не должно быть двух одинаковых хэш-тегов';
    }
    if (!HASHTAG_RE.test(hashtag)) {
      return 'Хэш-тег должен начинаться с символа # (решётка). После # хэш-тег может состоять из букв и чисел и не может содержать спецсимволы ($, #, @ и т. п.), символы пунктуации, эмодзи. Хэш-теги между собой разделяются пробелами, внутри хэш-тега пробела быть не может';
    }
    return '';
  };

  var getHashtagsArray = function () {
    var hashtagsString = hashtagInput.value;
    return hashtagsString.split(' ');
  };

  var checkHashtags = function () {
    if (hashtagInput.value !== '') {
      var hashtags = getHashtagsArray();
      var errorMessage;
      for (var i = 0; i < hashtags.length; i++) {
        errorMessage = getHashtagValidityMessage(hashtags[i], hashtags);
        if (errorMessage) {
          hashtagInput.style.borderColor = INVALID_INPUT_STYLE;
          hashtagInput.style.outline = INVALID_INPUT_STYLE;
          break;
        } else {
          hashtagInput.style.borderColor = '';
          hashtagInput.style.outline = '';
        }
      }
      hashtagInput.setCustomValidity(errorMessage);
    } else {
      hashtagInput.setCustomValidity('');
    }
  };

  return {
    activateValidityCheck: function () {
      hashtagInput.addEventListener('input', checkHashtags);
    },
    deactivateValidityCheck: function () {
      hashtagInput.removeEventListener('input', checkHashtags);
    }
  };
})();
