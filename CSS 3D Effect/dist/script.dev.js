"use strict";

(function () {
  var houseElem = document.querySelector('.house');
  var barElem = document.querySelector('.progress__bar');
  var stageElem = document.querySelector('.stage');
  var maxScrollValue = document.body.offsetHeight - window.innerHeight;

  function scrollHandler() {
    var scrollPer = this.pageYOffset / maxScrollValue;
    var zMove = scrollPer * 950 - 500;
    houseElem.style.transform = "translateZ( ".concat(zMove, "vw)");
    barElem.style.width = scrollPer * 100 + '%';
  }

  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - this.window.innerHeight;
  }

  function mousemoveHandler(e) {
    var mousePos = {
      x: 0,
      y: 0
    };
    mousePos.x = -1 + e.clientX / window.innerWidth * 2;
    mousePos.y = 1 - e.clientY / window.innerHeight * 2;
    stageElem.style.transform = "rotateY( ".concat(mousePos.x * 5, "deg) \n        rotateX( ").concat(mousePos.y * 5, "deg)");
  }

  function Character(info) {
    this.mainElem = document.createElement('div');
    this.mainElem.classList.add('char');
    this.mainElem.innerHTML = "\n        <div class=\"char running\">\n            <div class=\"char__con char__head\" data-direction=\"backward\">\n                <div class=\"char__face char__head-face face-front\"></div>\n                <div class=\"char__face char__head-face face-back\"></div>\n            </div>\n            <div class=\"char__con char__torso \"data-direction=\"backward\">\n                <div class=\"char__face char__torso-face face-front\"></div>\n                <div class=\"char__face char__torso-face face-back\"></div>\n            </div>\n            <div class=\"char__con char__arm char__armRight\">\n                <div class=\"char__face char__arm-face face-front\"></div>\n                <div class=\"char__face char__arm-face face-back\"></div>\n            </div>\n            <div class=\"char__con char__arm char__armLeft\">\n                <div class=\"char__face char__arm-face face-front\"></div>\n                <div class=\"char__face char__arm-face face-back\"></div>\n            </div>\n            <div class=\"char__con char__leg char__legRight\">\n                <div class=\"char__face char__leg-face face-front\"></div>\n                <div class=\"char__face char__leg-face face-back\"></div>\n            </div>\n            <div class=\"char__con char__leg char__legLeft\">\n                <div class=\"char__face char__leg-face face-front\"></div>\n                <div class=\"char__face char__leg-face face-back\"></div>\n            </div>\n        </div>";
    this.mainElem.style.left = info.xPos + '%';
    document.querySelector('.stage').appendChild(this.mainElem);
  }

  stageElem.addEventListener('click', function (e) {
    new Character({
      xPos: e.clientX / window.innerWidth * 100
    });
  });
  window.addEventListener('scroll', scrollHandler);
  window.addEventListener('resize', resizeHandler);
  window.addEventListener('mousemove', mousemoveHandler);
})();