'use strict';

window.backend = (function () {
  var Url = {
    GET: 'https://javascript.pages.academy/kekstagram/data',
    POST: 'https://javascript.pages.academy/kekstagram'
  };

  var StatusCode = {
    OK: 200
  };

  var TIMEOUT = 10000;

  var setup = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.OK:
          onSuccess(xhr.response);
          break;
        default:
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT;
    return xhr;
  };

  return {
    load: function (onSuccess, onError) {
      var xhr = setup(onSuccess, onError);
      xhr.open('GET', Url.GET);
      xhr.send();
    },
    upload: function (data, onSuccess, onError) {
      var xhr = setup(onSuccess, onError);
      xhr.open('POST', Url.POST);
      xhr.send(data);
    }
  };
})();
