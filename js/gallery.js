'use strict';

window.gallery = (function () {
  var picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content;

  var userPictures;

  var renderPicture = function (data, index) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').dataset.id = index;
    pictureElement.querySelector('.picture__img').src = data.url;
    pictureElement.querySelector('.picture__likes').textContent = data.likes;
    pictureElement.querySelector('.picture__comments').textContent = data.comments.length;
    pictureElement.querySelector('.picture__img').setAttribute('data-id', index);
    pictureElement.querySelector('.picture').setAttribute('data-id', index);

    return pictureElement;
  };

  var buildFragment = function (array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (item, index) {
      fragment.appendChild(renderPicture(item, index));
    });
    return fragment;
  };

  var onThumbnailsClick = function (evt) {
    var picIndex = evt.target.dataset.id;
    if (picIndex) {
      evt.preventDefault();
      window.preview.openBigPicture(userPictures[picIndex]);
    }
  };

  var onThumbnailsEnterPress = function (evt) {
    window.utils.isEnterEvent(evt, onThumbnailsClick);
  };

  var showPictures = function (arr) {
    userPictures = arr;
    picturesList.appendChild(buildFragment(arr));
  };

  var addListeners = function () {
    picturesList.addEventListener('click', onThumbnailsClick);
    picturesList.addEventListener('keydown', onThumbnailsEnterPress);
  };

  var onLoadSuccessHandle = function (data) {
    showPictures(data);
    addListeners();
    window.filters.showFilterMenu(data);
  };

  var onLoadErrorHandle = function (errorMessage) {
    window.messages.showErrorPopup(errorMessage);
  };

  window.backend.load(onLoadSuccessHandle, onLoadErrorHandle);

  return {
    showPictures: showPictures
  };
})();
