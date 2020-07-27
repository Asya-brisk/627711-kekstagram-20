'use strict';

window.preview = (function () {
  var bigPicture = document.querySelector('.big-picture');
  var commentsList = bigPicture.querySelector('.social__comments');
  var cancelButton = bigPicture.querySelector('.big-picture__cancel');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  var renderBigPhoto = function (picture) {
    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.social__caption').textContent = picture.description;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    window.utils.removeChilds(commentsList);
    commentsList.appendChild(window.comments.initComments(picture.comments));
  };

  var onBigPicEscPress = function (evt) {
    if (evt.key === 'Escape') {
      closeBigPicture();
    }
  };

  var closeBigPicture = function () {
    window.utils.addClass(bigPicture, 'hidden');
    window.utils.removeModalOpenClass();
    window.comments.resetCounter();
    window.utils.removeClass(commentsLoader, 'hidden');
    document.removeEventListener('keydown', onBigPicEscPress);
    cancelButton.removeEventListener('click', onBigPicCancelBtnClick);
  };

  var onBigPicCancelBtnClick = function () {
    closeBigPicture();
  };

  return {
    openBigPicture: function (picture) {
      renderBigPhoto(picture);
      window.utils.addModalOpenClass();
      window.utils.removeClass(bigPicture, 'hidden');

      commentsLoader.addEventListener('click', window.comments.onLoadMoreClick);
      document.addEventListener('keydown', onBigPicEscPress);
      cancelButton.addEventListener('click', onBigPicCancelBtnClick);
    }
  };
})();
