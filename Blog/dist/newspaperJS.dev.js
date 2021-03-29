"use strict";

$(document).ready(function () {
  var contents = document.querySelector('.contents');
  var data_index = document.querySelectorAll('[data-index]');
  var buttons = document.querySelectorAll('wrapnav > ul > li');
  var screen_height = document.body.scrollHeight;
  var jqIndex = $('[data-index]');
  var jqI_len = jqIndex.length;
  var contents_div;
  var p_tag = '<span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex possimus ipsum, beatae unde doloribus repellat odio tempora omnis earum quo? Doloribus incidunt labore at commodi veritatis. Accusamus nihil eaque modi?</span>';
  var oldArray = [];
  var newArray = [];
  var nowIndex;
  var cloned;
  var contentscnt = createContents();
  insertContents();
  insertOrder();
  statbar();
  sortDataIndex();
  clicked_contents();

  function clicked_contents() {
    Array.prototype.forEach.call(contents_div, function (e) {
      e.addEventListener('click', function () {
        $('.cloned').remove();
        cloned = $(e).clone().appendTo('.contents');
        cloned.addClass('cloned');
        $(cloned).css({
          'position': 'absolute',
          'left': '30%',
          'top': '5%',
          'width': '40%',
          'overflow': 'hidden',
          'background': '#d1cb8e'
        });
        addRemove(document.querySelector('.cloned'));
      });
    });
  }

  function addRemove(current) {
    console.log(current);
    current.addEventListener('click', function () {
      current.classList.toggle('deleted'); // NOTE: animation 동작중에 클릭하면 settimeout때문에 이상해지는데 어차피 확대시키고 이럴꺼라서 중간에 클릭못하게 만들것임.

      setTimeout(function () {
        current.classList.toggle('cloned');
        current.classList.toggle('deleted');
        current.remove();
      }, 980);
    });
  }

  function createContents() {
    var div_length = data_index.length;
    var oldCnt = 0;
    var newCnt = 0;
    var cnt = 0;

    for (var i = 0; i < jqI_len; i++) {
      oldArray[i] = jqIndex.eq(i).data();
    }

    for (var _i = 1; _i < div_length + 13; _i++) {
      // 아직 생성되지 않은 곳에 order속성 추가시키기
      // 이미 생성된 data-index는 넘김
      var alreadyMade = data_index[oldCnt].dataset.index;

      if (alreadyMade == _i) {
        oldCnt++;
        newCnt++;
        if (oldCnt == div_length) oldCnt--;
        continue;
      } // 생성되지 않은 data-index는 div를 생성


      contents.innerHTML += '<div data-index="' + _i + '"></div>';
      newCnt++;
      newArray[cnt] = newCnt;
      cnt++;
    }

    return div_length + 12;
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

      contents_div[i].classList = 'gridcontent';
    }
  }

  function insertOrder() {
    nowIndex = $('[data-index]');
    var cnt = 0;

    for (var i = 0; i < jqI_len; i++) {
      oldArray[i] = oldArray[i].index;
      $(nowIndex[i]).css('order', oldArray[i]);
    } //이거 진짜 노력의 산물인데 좀 더 집중했으면 좋았을껄


    for (var _i2 = 0; _i2 < nowIndex.length; _i2++) {
      //console.log(i+1,newArray[cnt]);
      if (_i2 + 1 == newArray[cnt]) {
        // 이 부분에 'nowIndex[jqI_len+cnt]'이런 모양대신 >> '$(nowIndex[jqI_len+cnt])'이런 모양으로 써야하는 이유는 유사배열이기 때문이다.
        //console.log('inside i =',i,$(nowIndex[jqI_len+cnt]).data(), newArray[cnt]);
        $(nowIndex[jqI_len + cnt]).css('order', newArray[cnt]);
        cnt++;
      } // 한 행마다 3번째 gird는 폰트스타일 변경


      if (Math.floor($(nowIndex[_i2]).data('index') % 5) == 3) {
        //console.log(i+1);
        $(nowIndex[_i2]).css({
          'font-family': "'Syne Mono', 'monospace'",
          'font-weight': 'bold',
          'font-size': '2rem'
        });
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


  var navbar_index = document.querySelectorAll('.wrapnav ul li');
  var navcnt = 1;

  function sortDataIndex() {
    $('.contents').html($('.gridcontent').sort(function (a, b) {
      return $(a).data('index') - $(b).data('index');
    }));
    nowIndex = $('[data-index]');
  }

  Array.prototype.forEach.call(navbar_index, function (e) {
    e.dataset.chunk = navcnt;
    navcnt++;
    e.addEventListener('click', function () {
      var data_chunk = e.dataset.chunk;
      var clicked_location = (data_chunk - 1) * 5 + 1;
      var tmp = 1;
      var _goto = 0;

      for (var i = 1; i < clicked_location; i++) {
        _goto = contentscnt - clicked_location;
        $(nowIndex[i - 1]).css('order', _goto + tmp + 1);
        tmp++;
      }

      tmp = 1;

      for (var _i3 = clicked_location; _i3 < contentscnt + 1; _i3++) {
        //console.log(tmp);
        $(nowIndex[_i3 - 1]).css('order', tmp);
        tmp++;
      }
    });
  });
});