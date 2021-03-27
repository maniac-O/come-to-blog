"use strict";

$(document).ready(function () {
  var contents = document.querySelector('.contents');
  var data_index = document.querySelectorAll('[data-index]');
  var buttons = document.querySelectorAll('wrapnav > ul > li');
  var jqIndex = $('[data-index]');
  var jqI_len = jqIndex.length;
  var p_tag = '<span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex possimus ipsum, beatae unde doloribus repellat odio tempora omnis earum quo? Doloribus incidunt labore at commodi veritatis. Accusamus nihil eaque modi?</span>';
  var oldArray = [];
  var newArray = [];
  var contentscnt = createContents();
  insertContents();
  insertOrder();
  statbar();

  function insertOrder() {
    var nowIndex = $('[data-index]');
    var cnt = 0;

    for (var i = 0; i < jqI_len; i++) {
      oldArray[i] = oldArray[i].index;
      $(nowIndex[i]).css('order', oldArray[i]);
    } //이거 진짜 노력의 산물인데 개멍청했네 시발;


    for (var _i = 0; _i < nowIndex.length; _i++) {
      //console.log(i+1,newArray[cnt]);
      if (_i + 1 == newArray[cnt]) {
        //console.log('inside i =',i,$(nowIndex[jqI_len+cnt]).data(), newArray[cnt]);
        $(nowIndex[jqI_len + cnt]).css('order', newArray[cnt]);
        cnt++;
      } // 한 행마다 3번째 gird는 폰트스타일 변경


      if (Math.floor($(nowIndex[_i]).data('index') % 5) == 3) {
        //console.log(i+1);
        $(nowIndex[_i]).css('font-family', "'Syne Mono', 'monospace'", 'font-weight', 'bold', 'font-size', '2rem');
      }
    }
  }

  function createContents() {
    var div_length = data_index.length;
    var oldCnt = 0;
    var newCnt = 0;
    var cnt = 0;

    for (var i = 0; i < jqI_len; i++) {
      oldArray[i] = jqIndex.eq(i).data();
    }

    for (var _i2 = 1; _i2 < div_length + 11; _i2++) {
      // 아직 생성되지 않은 곳에 order속성 추가시키기
      // 이미 생성된 data-index는 넘김
      var alreadyMade = data_index[oldCnt].dataset.index;

      if (alreadyMade == _i2) {
        oldCnt++;
        newCnt++;
        if (oldCnt == div_length) oldCnt--;
        continue;
      } // 생성되지 않은 data-index는 div를 생성


      contents.innerHTML += '<div data-index="' + _i2 + '"></div>';
      newCnt++;
      newArray[cnt] = newCnt;
      cnt++;
    }

    return div_length + 10;
  }

  function insertContents() {
    contents_div = document.querySelectorAll('[data-index]');

    for (var i = 0; i < contentscnt; i++) {
      // 본문채우기
      for (var j = 0; j < 4; j++) {
        if (i == 1 && j == 2) {
          contents_div[i].innerHTML += '<span>RESTORANCE IS EVERYWHERE.. MAYBE IN YOUR COMPUTER</span><div><img src="./pic/HEOS01BW.png" alt=""></img></div>';
          contents_div[i].innerHTML += '<div>' + p_tag + '</div>';
          continue;
        }

        contents_div[i].innerHTML += p_tag;
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