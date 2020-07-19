'use strict';

window.gallery = (function () {
  var PHOTOS_NUMBER = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MIN_AVATAR_NUM = 1;
  var MAX_AVATAR_NUM = 6;
  var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var USER_NAMES = ['Ольга', 'Иван', 'Антон', 'Полина', 'Мария', 'Виктор'];

  var picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  // Функция, возвращающая случайное число
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var getRandomIndex = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  // Функция, возвращающаая массив комментариев
  var generateMessages = function () {
    var messages = [];
    var commentNum = getRandomNumber(MIN_AVATAR_NUM, MAX_AVATAR_NUM + 9);

    for (var j = 0; j < commentNum; j++) {
      messages.push({
        avatar: 'img/avatar-' + [getRandomNumber(MIN_AVATAR_NUM, MAX_AVATAR_NUM)] + '.svg',
        message: MESSAGES[getRandomIndex(MESSAGES)],
        name: USER_NAMES[getRandomIndex(USER_NAMES)]
      });
    }
    return messages;
  };

  // Функция, возвращающаая массив объектов со свойствами фотографий
  var getPhotoInfo = function () {
    var photos = [];
    for (var i = 1; i <= PHOTOS_NUMBER; i++) {
      photos.push({
        url: 'photos/' + i + '.jpg',
        description: 'Здесь должно быть ваше описание фотографии',
        likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
        comments: generateMessages()
      });
    }
    return photos;
  };

  var pictures = getPhotoInfo();

  // Создаем DOM-элементы, соответствующие фотографиям
  var renderPicture = function (picture, index) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.querySelector('.picture__img').setAttribute('data-id', index);

    return pictureElement;
  };

  return {
    makePictureList: function (userPictures) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < userPictures.length; i++) {
        fragment.appendChild(renderPicture(userPictures[i], i));
      }
      window.preview.showPicture(photos);
      picturesList.appendChild(fragment);
    }
  };
})();
