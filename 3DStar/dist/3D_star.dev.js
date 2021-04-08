"use strict";

$(document).ready(function () {
  body = document.querySelector('body');
  body.style.width = window.innerWidth + 'px';
  body.style.height = window.innerHeight + 'px';
  section = document.querySelector('.section');
  div = document.querySelector('.clicked');
  var currentX;
  var currentY;
  console.log(div);
  div.addEventListener('drag', function (e) {
    if (e.offsetX <= 0 || e.offsetY <= 0) {
      console.log('hi');
    } else {
      var divideX = currentX - e.offsetX;
      var divideY = currentY - e.offsetY;
      currentX = e.offsetX;
      currentY = e.offsetY;
      var gotoX;
      var gotoY;
      gotoX = Math.floor(40 - 0.4 * Math.floor(Math.floor(currentX) / Math.floor(window.innerWidth / 2) * 100));
      gotoY = Math.floor(40 - 0.4 * Math.floor(Math.floor(currentY) / Math.floor(window.innerHeight / 2) * 100));
      moveLocation(gotoX, gotoY);
    }

    e.preventDefault();
  });

  function moveLocation(gotoX, gotoY) {
    console.log(gotoX, gotoY);
    section.animate([{
      transform: 'rotateY(' + -gotoX + 'deg)'
    }], 300);
    section.animate([{
      transform: 'rotateX(' + -gotoY + 'deg)'
    }], 300);
  }
});