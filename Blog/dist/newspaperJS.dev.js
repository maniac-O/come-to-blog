"use strict";

$(document).ready(function () {
  var contents = document.querySelector('.contents');
  var data_index = document.querySelectorAll('[data-index]');
  var buttons = document.querySelectorAll('wrapnav > ul > li');
  var p_tag = '<span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex possimus ipsum, beatae unde doloribus repellat odio tempora omnis earum quo? Doloribus incidunt labore at commodi veritatis. Accusamus nihil eaque modi?</span>';
  var contentscnt = createContents();
  insertContents();
  statbar();

  function createContents() {
    var div_length = data_index.length;

    for (var i = div_length + 1; i < div_length + 10; i++) {
      contents.innerHTML += '<div data-index="' + i + '"></div>';
    }

    return div_length + 9;
  }

  function insertContents() {
    var contents_div = document.querySelectorAll('[data-index]');

    for (var i = 0; i < contents_div.length; i++) {
      for (var j = 0; j < 4; j++) {
        if (i == 1 && j == 2) {
          contents_div[i].innerHTML += '<div><img src="./pic/HEOS01BW.png" alt=""></img></div>';
          contents_div[i].innerHTML += '<div>' + p_tag + '</div>';
          continue;
        }

        contents_div[i].innerHTML += p_tag;
      }

      if (Math.floor(i % 5) == 2) {
        contents_div[i].style.fontFamily = 'Syne Mono', 'monospace';
        contents_div[i].style.fontWeight = 'bold';
        contents_div[i].style.fontSize = '2rem';
      }
    }
  }

  function statbar() {
    var tmp = '';
    var statbar = document.querySelector('.statbar');
    tmp += "<p>Here's <highlight class='highlight'>" + contentscnt + '</highlight> news wait for you</p>';
    statbar.innerHTML += tmp;
  } // NOTE: https://heropy.blog/2019/08/17/css-grid/ 여기 order 속성으로 위치 조절 가능하다.
  // nav바를 클릭하면 회전. 예) A=>1번 B=>2번으로 슬라이드

});