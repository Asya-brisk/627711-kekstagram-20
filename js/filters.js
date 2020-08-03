'use strict';

window.filters = (function () {
  var RANDOM_PICTURES_AMOUNT = 10;
  var userPictures;

  var updatePictures = function (arr) {
    var picturesList = document.querySelector('.pictures');
    var pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (item) {
      picturesList.removeChild(item);
    });
    window.gallery.showPictures(arr);
  };

  var defaultPictures = function () {
    updatePictures(userPictures);
  };

  var shuffleArray = function (array) {
    var clonedArray = array.slice();
    for (var i = clonedArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = clonedArray[i];
      clonedArray[i] = clonedArray[j];
      clonedArray[j] = temp;
    }
    return clonedArray;
  };

  var randomPictures = function () {
    var randomArray = shuffleArray(userPictures).slice(0, RANDOM_PICTURES_AMOUNT);
    updatePictures(randomArray);
  };

  var discussedPictures = function () {
    var discussedArray = userPictures.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    updatePictures(discussedArray);
  };

  var switchFilter = function (evt) {
    var targetId = evt.target.id;
    switch (targetId) {
      case 'filter-random':
        return randomPictures();
      case 'filter-discussed':
        return discussedPictures();
      default:
        return defaultPictures();
    }
  };

  var toggleActiveClass = function (evt) {
    var filtersActiveButton = document.querySelector('.img-filters__button--active');
    window.utils.removeClass(filtersActiveButton, 'img-filters__button--active');
    window.utils.addClass(evt.target, 'img-filters__button--active');
  };

  var onFilterBtnClick = window.utils.debounce(function (evt) {
    if (evt.target.classList.contains('img-filters__button')) {
      toggleActiveClass(evt);
      switchFilter(evt);
    }
  });

  var showFilterMenu = function (arr) {
    userPictures = arr;
    var filtersBlock = document.querySelector('.img-filters');
    var filtersForm = filtersBlock.querySelector('.img-filters__form');
    window.utils.removeClass(filtersBlock, 'img-filters--inactive');
    filtersForm.addEventListener('click', onFilterBtnClick);
  };

  return {
    showFilterMenu: showFilterMenu
  };
})();
