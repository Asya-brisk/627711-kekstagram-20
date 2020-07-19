'use strict';

window.preview = (function () {
  var body = document.querySelector('body');
  var bigPicture = document.querySelector('.big-picture');
  var commentsList = document.querySelector('.social__comments');
  var socialComment = commentsList.querySelector('.social__comment');

  var renderBigPhoto = function (picture) {
    var fragment = document.createDocumentFragment();
    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.social__caption').textContent = picture.description;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    window.utils.removeChilds(commentsList);
    picture.comments.forEach(function (comment) {
      var commentElement = socialComment.cloneNode(true);

      commentElement.querySelector('.social__picture').src = comment.avatar;
      commentElement.querySelector('.social__picture').alt = comment.name;
      commentElement.querySelector('.social__text').textContent = comment.message;
      fragment.appendChild(commentElement);
    });
    commentsList.appendChild(fragment);
  };

  var hideElements = function () {
    var commentsCounter = document.querySelector('.social__comment-count');
    var commentsLoader = document.querySelector('.comments-loader');
    window.utils.addClass(commentsCounter, 'hidden');
    window.utils.addClass(commentsLoader, 'hidden');
  };

  var cancelButton = bigPicture.querySelector('.big-picture__cancel');

  var onBigPicEscPress = function (evt) {
    if (evt.key === 'Escape') {
      closeBigPicture();
    }
  };

  var openBigPicture = function (index) {
    var currentPicture = pictures[index];
    renderBigPhoto(currentPicture);
    hideElements();
    window.utils.addClass(body, 'modal-open');
    window.utils.removeClass(bigPicture, 'hidden');

    document.addEventListener('keydown', onBigPicEscPress);
  };

  var closeBigPicture = function () {
    window.utils.addClass(bigPicture, 'hidden');
    window.utils.removeClass(body, 'modal-open');
    document.removeEventListener('keydown', onBigPicEscPress);
  };

  cancelButton.addEventListener('click', function () {
    closeBigPicture();
  });

  return {
    showPicture: function () {
      picturesList.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('picture__img')) {
          var pictureIndex = evt.target.dataset.id;
          openBigPicture(pictureIndex);
        }
      });

      picturesList.addEventListener('keydown', function (evt) {
        if (evt.target.classList.contains('picture')) {
          var pictureIndex = evt.target.querySelector('img').dataset.id;
          window.utils.isEnterEvent(evt, openBigPicture, pictureIndex);
        }
      });
    }
  };
})();
