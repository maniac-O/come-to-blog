'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

$(document).ready(function () {
  var conMake =
  /*#__PURE__*/
  function () {
    function conMake(cloth, color, gender, size) {
      _classCallCheck(this, conMake);

      this.cloth = cloth;
      this.color = color;
      this.gender = gender;
      this.size = size;
    }

    _createClass(conMake, [{
      key: "makeFactor",
      value: function makeFactor() {
        var clothArray = ['<i class="fas fa-bread-slice"></i>', '<i class="fas fa-drumstick-bite"></i>', '<i class="fas fa-stroopwafel"></i>'];
        var colorArray = ['blue', 'yellow', 'pink'];
        var genderArray = ['male', 'female'];
        var sizeArray = ['small size', 'medium size', 'large size'];
        return {
          cloth: clothArray[Math.floor(Math.random() * 3)],
          color: colorArray[Math.floor(Math.random() * 3)],
          gender: genderArray[Math.floor(Math.random() * 2)],
          size: sizeArray[Math.floor(Math.random() * 3)]
        };
      }
    }, {
      key: "makeConObject",
      value: function makeConObject(info) {
        return new conMake(info.cloth, info.color, info.gender, info.size);
      }
    }, {
      key: "makeContent",
      value: function makeContent(i) {
        // contents div 만들기
        contents.innerHTML += "<div class=\"con\">".concat(contentsArray[i].cloth, "  ").concat(contentsArray[i].gender, ", ").concat(contentsArray[i].size, "</div>"); // 금방 만든 contents div icon 받기

        var current = document.querySelector(".contents div:nth-of-type(".concat(i + 1, ") i")); // 해당 contents div icon 색상변경

        current.style.color = contentsArray[i].color;
      }
    }]);

    return conMake;
  }();

  var sortIt =
  /*#__PURE__*/
  function () {
    function sortIt() {
      _classCallCheck(this, sortIt);
    }

    _createClass(sortIt, [{
      key: "sortBy",
      value: function sortBy(who, contentsArray, cons) {
        var cnt = 0;
        contentsArray.filter(function (contentsArray) {
          // 1번 버튼 작동
          if (contentsArray.cloth == '<i class="fas fa-bread-slice"></i>' && who == 'button1') {
            cons[cnt].style.display = 'block';
          } // 2번 버튼 작동
          else if (contentsArray.cloth == '<i class="fas fa-drumstick-bite"></i>' && who == 'button2') {
              cons[cnt].style.display = 'block';
            } // 3번버튼 작동
            else if (contentsArray.cloth == '<i class="fas fa-stroopwafel"></i>' && who == 'button3') {
                cons[cnt].style.display = 'block';
              } // 4번 버튼 작동
              else if (contentsArray.color == 'blue' && who == 'button4') {
                  cons[cnt].style.display = 'block';
                } // 5번 버튼 작동
                else if (contentsArray.color == 'yellow' && who == 'button5') {
                    cons[cnt].style.display = 'block';
                  } // 6번 버튼 작동
                  else if (contentsArray.color == 'pink' && who == 'button6') {
                      cons[cnt].style.display = 'block';
                    } // 나머지는 보이지않게 처리
                    else {
                        cons[cnt].style.display = 'none';
                      }

          cnt++;
        });
      }
    }]);

    return sortIt;
  }();

  var conmake = new conMake();
  var sortit = new sortIt();
  var buttons = document.querySelectorAll('.nav ul li');
  var contentsArray = [];
  var contents = document.querySelector('.contents');

  for (var i = 0; i < 20; i++) {
    contentsArray[i] = conmake.makeConObject(conmake.makeFactor());
    conmake.makeContent(i);
  }

  Array.prototype.forEach.call(buttons, function (e) {
    e.addEventListener('click', function () {
      sortit.sortBy(e.id, contentsArray, document.querySelectorAll('.con'));
    });
  });
});