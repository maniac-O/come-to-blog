"use strict";

$(document).ready(function () {
  'use strict';

  var wrap = document.querySelector('.wrap');
  /*
  wrap.addEventListener('click', (e) => {
      if (e.target.dataset.index == 1) {
          // data-index가 1인 경우 실행
      } else if (e.target.dataset.index == 2) {
          // data-index가 2인 경우 실행
      } else if (e.target.dataset.index == 3) {
          // data-index가 3인 경우 실행
      }
  });*/

  $('.wrap').on('click', '.wrap button', function (e) {
    if (e.target.id == 'a') {// id 값이 'a'인 동작 실행
    } else if (e.target.id == 'b') {// id 값이 'b'인 동작 실행
    } else if (e.target.id == 'c') {// id 값이 'c'인 동작 실행
    }
  });
});