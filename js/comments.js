'use strict';
window.comments = (function () {
  var COMMENTS_COUNT_STEP = 5;
  var COUNTER = 0;
  var commentsList = document.querySelector('.social__comments');
  var commentTemplate = commentsList.querySelector('.social__comment');
  var commentsLoader = document.querySelector('.comments-loader');
  var commentCountBlock = document.querySelector('.social__comment-count');
  var comments;

  var countComments = function () {
    COUNTER += COMMENTS_COUNT_STEP;
  };

  var resetCounter = function () {
    COUNTER = 0;
    window.utils.addClass(commentsLoader, 'hidden');
    commentsLoader.removeEventListener('click', onLoadMoreClick);
  };

  var onLoadMoreClick = function () {
    commentsList.appendChild(renderComments(getNextComments(comments)));
  };

  var renderComments = function (array) {
    var fragment = document.createDocumentFragment();

    array.forEach(function (item) {
      var commentElement = commentTemplate.cloneNode(true);
      commentElement.querySelector('.social__picture').src = item.avatar;
      commentElement.querySelector('.social__picture').alt = item.name;
      commentElement.querySelector('.social__text').textContent = item.message;
      fragment.appendChild(commentElement);
    });
    return fragment;
  };

  var renderCommentsCount = function (result, array) {
    var commentsCount = document.createElement('span');
    window.utils.addClass(commentsCount, 'comments-count');
    commentsCount.textContent = result + ' из ' + array.length + ' комментариев';
    commentCountBlock.textContent = '';
    commentCountBlock.appendChild(commentsCount);
  };

  var getNextComments = function (array) {
    var result;
    countComments();
    renderCommentsCount(COUNTER, array);
    result = array.slice((COUNTER - COMMENTS_COUNT_STEP), COUNTER);
    if (COUNTER >= array.length) {
      renderCommentsCount(array.length, array);
      resetCounter();
    }
    return result;
  };

  var getInitialComments = function (array) {
    var result;
    comments = array;
    if (array.length <= COMMENTS_COUNT_STEP) {
      result = array;
      renderCommentsCount(result, array);
      commentsLoader.classList.add('hidden');
    }
    result = getNextComments(array);
    return result;
  };

  return {
    resetCounter: resetCounter,
    onLoadMoreClick: onLoadMoreClick,
    initComments: function (array) {
      return renderComments(getInitialComments(array));
    }
  };
})();
