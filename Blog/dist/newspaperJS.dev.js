"use strict";

$(document).ready(function () {
  var contents = document.querySelector('.contents');
  var data_index = document.querySelectorAll('[data-index]');
  var buttons = document.querySelectorAll('wrapnav > ul > li');
  var jqIndex = $('[data-index]');
  var jqI_len = jqIndex.length;
  var contents_div;
  var p_tag = '<p>&nbsp&nbspLorem ipsum dolor sit amet consectetur adipisicing elit. Ex possimus ipsum, beatae unde doloribus repellat odio tempora omnis earum quo? Doloribus incidunt labore at commodi veritatis. Accusamus nihil eaque modi?</p>';
  var oldArray = [];
  var newArray = [];
  var nowIndex;
  var cloned;
  var navColorIndex = 0;
  var moveNavBar = 0;
  var isHeader = false;
  var isScroll = false;
  var contentscnt = createContents();
  insertContents();
  insertOrder();
  statbar();
  sortDataIndex();
  insertDivBottom();
  clicked_contents(); // 스크롤 이동 시 네비게이션 바 색깔 변경

  $(window).scroll(function (e) {
    if (isScroll) {
      isScroll = false; // 스크롤 위치 감지 함수

      navbarPosition();
    }

    setInterval(function () {
      isScroll = true;
    }, 100);
  }); // 네비게이션 색깔 실제 변경 함수

  function navbarColor(location) {
    location = Math.floor(location) + 1;
    if (location == 0) isHeader = true;

    if (location >= 0) {
      // li값을 변경해 준 이유는 이미 ul에 색상이 적용되어있기 때문에 
      // li에 색상 변경 줬다가 가장 위로 올라가면 지워버리면 편하기 때문에 
      fixedbar = document.querySelectorAll('.wrapnav ul li');

      for (var i = 0; i < 5; i++) {
        // 가장 상위에 있을땐 모든 백그라운드 색 제거
        if (isHeader) {
          fixedbar[i].style.background = '';
          continue;
        } // 현재 위치에 있는 영역만 색깔 변경, 나머지는 색상 제거


        if (i == location - 1) {
          navColorIndex = location - 1;
          fixedbar[location - 1].style.background = '#00171d';
        } else if (i != location - 1) {
          fixedbar[i].style.background = '';
        }
      }

      isHeader = false;
    }
  } // 스크롤 인식 후 navbar에 fixed 속성 부여


  function navbarPosition() {
    navbar = document.querySelector('.wrapnav');

    if ($(window).scrollTop() >= 270) {
      navbar.classList.add('fixed-bar');
      moveNavBar = Math.floor(($(window).scrollTop() - 300) / 700);
      navbarColor(moveNavBar);
    } else if ($(window).scrollTop() < 270) {
      navbarColor(-1);
      navbar.classList.remove('fixed-bar');
    } else {
      navbar.classList.remove('fixed-bar');
    }
  } // contents 내의 .bottom-div의 내용 추가 함수


  function insertDivBottom() {
    for (var i = 1; i < contentscnt + 1; i++) {
      contents_bottom_div = document.querySelectorAll('.bottom-div');
      contents_bottom_div[i - 1].innerHTML = 'NEWS ' + '<cnt>' + i + '</cnt>';
    }
  }

  function clicked_contents() {
    Array.prototype.forEach.call(contents_div, function (e) {
      e.addEventListener('click', function () {
        console.log(e);
        $('.cloned').remove();
        cloned = $(e).clone().appendTo('.contents');
        cloned.addClass('cloned');
        var tmpBottom = document.querySelector('.cloned .bottom-div');
        tmpBottom.innerText = '>> Click To Close <<'; // 클릭된 원본 하이라이트 색 넣기

        e.style.borderColor = 'red';
        $(cloned).css({
          'position': 'absolute',
          "top": $(window).scrollTop() - 300 + "px",
          "left": ($(window).width() - $(".cloned").outerWidth()) / 4 + $(window).scrollLeft() + "px",
          'width': '40%',
          'overflow': 'hidden',
          'background': '#d1cb8e'
        });
        $(tmpBottom).css({
          'color': '#dad75b',
          'font-size': '2.5rem',
          'background': 'linear-gradient(to bottom right, #474747 40%, #2b2b2b)'
        });
        addRemove(e, document.querySelector('.cloned'), tmpBottom);
      });
    });
  }

  function addRemove(original, clonedDiv, bottomDiv) {
    bottomDiv.addEventListener('click', function () {
      original.style.borderColor = '#02343F';
      clonedDiv.classList.toggle('deleted'); // NOTE: animation 동작중에 클릭하면 settimeout때문에 이상해지는데 어차피 확대시키고 이럴꺼라서 중간에 클릭못하게 만들것임.

      setTimeout(function () {
        clonedDiv.classList.toggle('cloned');
        clonedDiv.classList.toggle('deleted');
        clonedDiv.remove();
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
      contents_div[i].innerHTML += '<div class="bottom-div"></div>';

      for (var j = 0; j < 4; j++) {
        if (i == 1 && j == 1) {
          contents_div[i].innerHTML += '<p>RESTORANCE IS EVERYWHERE.. MAYBE IN YOUR COMPUTER</p><div><img src="./pic/HEOS01BW.png" alt=""></img></div>';
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


    for (var _i2 = 0; _i2 < contentscnt; _i2++) {
      //console.log(i+1,newArray[cnt]);
      if (_i2 + 1 == newArray[cnt]) {
        // 이 부분에 'nowIndex[jqI_len+cnt]'이런 모양대신 >> '$(nowIndex[jqI_len+cnt])'이런 모양으로 써야하는 이유는 유사배열이기 때문이다.
        //console.log('inside i =',i,$(nowIndex[jqI_len+cnt]).data(), newArray[cnt]);
        $(nowIndex[jqI_len + cnt]).css('order', newArray[cnt]);
        cnt++;
      } // 한 행마다 3번째 gird는 폰트스타일 변경


      if (Math.floor($(nowIndex[_i2]).data('index') % 5) == 0) {
        //console.log(i+1);
        $(nowIndex[_i2]).css({
          'font-family': 'Yatra One, cursive',
          'font-size': '1.2rem'
        });
      }

      if (Math.floor($(nowIndex[_i2]).data('index') % 7) == 0) {
        //console.log(i+1);
        $(nowIndex[_i2]).css({
          'font-family': 'Anton, sans-serif',
          'font-size': '1rem'
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