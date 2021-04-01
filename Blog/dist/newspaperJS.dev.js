"use strict";

$(document).ready(function () {
  var contents = document.querySelector('.contents');
  var data_index = document.querySelectorAll('[data-index]');
  var jqIndex = $('[data-index]');
  var jqI_len = jqIndex.length;
  var contents_div;
  var p_tag = '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex possimus ipsum, beatae unde doloribus repellat odio tempora omnis earum quo? Doloribus incidunt labore at commodi veritatis. Accusamus nihil eaque modi?</p>';
  var oldArray = [];
  var newArray = [];
  var nowIndex;
  var cloned;
  var moveNavBar = 0;
  var isHeader = false;
  var isScroll = false;
  var contentscnt = createContents();
  insertContents();
  insertOrder();
  statbar();
  sortDataIndex();
  insertDivBottom();
  clicked_contents();
  cloneToPreview();
  arrowClick();

  function insertPreviewIndex() {
    var clonedIndex = document.querySelectorAll('.clonedContents');

    for (i = 0; i < 10; i++) {
      var clonedIndextmp = document.querySelectorAll('.clonedContents .bottom-div');
      clonedIndextmp[i].innerHTML = "NEWS" + "<cnt>&nbsp" + (i + 11) + "</cnt>";
      console.log(clonedIndextmp[i]);
    }
  } // sidebar내 화살표 클릭 시 preview 이동


  function arrowClick() {
    var clonedmiddle = $('.cloned-middle');
    var clonedwidth = $('.clonedContents').width();
    var waitClick = true;
    var clonedIndex = 1;
    clonedmiddle.css('left', -clonedwidth);
    var buttons = document.querySelectorAll('.sidebar-top-right');
    buttons[1].addEventListener('click', function () {
      if (waitClick) {
        waitClick = false;
        clonedmiddle.css('transition', 'all 0.4s');
        clonedmiddle.css('left', '+=' + clonedwidth);
        clonedIndex--;

        if (!clonedIndex) {
          setTimeout(function () {
            clonedmiddle.css('transition', 'all 0s');
            clonedmiddle.css('left', -(clonedmiddle.width() - clonedwidth * 2));
            clonedIndex = 10;
          }, 400);
        } // 너무빠른 클릭 방지


        setTimeout(function () {
          waitClick = true;
        }, 400);
      }
    });
    buttons[0].addEventListener('click', function () {
      if (waitClick) {
        waitClick = false;
        clonedmiddle.css('transition', 'all 0.4s');
        clonedmiddle.css('left', '-=' + clonedwidth);
        clonedIndex++;

        if (clonedIndex == 11) {
          setTimeout(function () {
            clonedmiddle.css('transition', 'all 0s');
            clonedmiddle.css('left', -clonedwidth);
            clonedIndex = 1;
          }, 400);
        } // 너무빠른 클릭 방지


        setTimeout(function () {
          waitClick = true;
        }, 400);
      }
    });
  } // sidebar의 preview에 본문내용 clone시키기


  function cloneToPreview() {
    var sidebarClone = $('.cloned-middle');

    for (i = 11; i <= contentscnt; i++) {
      var _cloned = $(nowIndex[i - 1]).clone().appendTo(sidebarClone);

      _cloned.addClass('clonedContents');
    } // Preview창 middle부분에 Index번호 띄우기


    insertPreviewIndex();
    var parents = document.querySelector('.cloned-middle');
    var sidebarfisrt = document.querySelectorAll('.clonedContents')[0];
    var sidebarlast = document.querySelectorAll('.clonedContents')[9];
    var cloned_first = sidebarfisrt.cloneNode(true);
    var cloned_last = sidebarlast.cloneNode(true);
    $(cloned_first).appendTo('.cloned-middle');
    parents.insertBefore(cloned_last, sidebarfisrt);
  } // 스크롤 시 Preview 따라오기


  function scrollPreview() {
    $('.sidebar').css({
      'position': 'fixed',
      'top': '60px',
      'width': $('.wrapmiddle').width() / 5 - 8
    });
  } // 스크롤 이동 시 네비게이션 바 색깔 변경


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

      for (var _i = 0; _i < 5; _i++) {
        // 가장 상위에 있을땐 모든 백그라운드 색 제거
        if (isHeader) {
          fixedbar[_i].style.background = '';
          continue;
        } // 현재 위치에 있는 영역만 색깔 변경, 나머지는 색상 제거


        if (_i == location - 1) {
          navColorIndex = location - 1;
          fixedbar[location - 1].style.background = '#180900';
        } else if (_i != location - 1) {
          fixedbar[_i].style.background = '';
        }
      }

      isHeader = false;
    }
  } // 스크롤 인식 후 navbar에 fixed 속성 부여


  function navbarPosition() {
    // scroll시 navbar조작
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
    } // scroll시 sidebar조작


    if ($(window).scrollTop() >= $(document).height() - ($('.footer').height() + 950)) {
      console.log('change');
      $('.sidebar').css({
        'position': 'relative',
        'top': $(document).height() - ($('.footer').height() + 1500) + 'px'
      });
    } else if ($(window).scrollTop() >= 510) {
      scrollPreview();
    } else if ($(window).scrollTop() < 800) {
      $('.sidebar').css({
        'position': 'relative',
        'top': '0'
      });
    }
  } // contents 내의 .bottom-div의 내용 추가 함수


  function insertDivBottom() {
    for (var _i2 = 1; _i2 < contentscnt + 1; _i2++) {
      contents_bottom_div = document.querySelectorAll('.bottom-div');
      contents_bottom_div[_i2 - 1].innerHTML = '<div class="bottom-div-line"></div>';
    }
  }

  function clicked_contents() {
    Array.prototype.forEach.call(contents_div, function (e) {
      e.addEventListener('click', function () {
        $('.cloned').remove();
        cloned = $(e).clone().appendTo('.contents');
        cloned.addClass('cloned');
        var tmpBottom = document.querySelector('.cloned .bottom-div');
        tmpBottom.innerText = 'Click To Close'; // 클릭된 원본 하이라이트 색 넣기

        e.style.borderColor = 'red';
        $(cloned).css({
          'position': 'absolute',
          "top": $(window).scrollTop() - 450 + "px",
          "left": ($(window).width() - $(".cloned").outerWidth()) / 4 + $(window).scrollLeft() + "px",
          'width': '40%',
          'overflow': 'hidden',
          'background': '#d1cb8e'
        });
        $(tmpBottom).css({
          'color': '#dad59e',
          'text-decoration': 'underline',
          'font-family': 'DM Serif Display, serif',
          'font-size': '2.5rem',
          'background': 'linear-gradient(to bottom right, #3b1600 40%, #1b0a00)'
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

    for (var _i3 = 0; _i3 < jqI_len; _i3++) {
      oldArray[_i3] = jqIndex.eq(_i3).data();
    }

    for (var _i4 = 1; _i4 < div_length + 14; _i4++) {
      // 아직 생성되지 않은 곳에 order속성 추가시키기
      // 이미 생성된 data-index는 넘김
      var alreadyMade = data_index[oldCnt].dataset.index;

      if (alreadyMade == _i4) {
        oldCnt++;
        newCnt++;
        if (oldCnt == div_length) oldCnt--;
        continue;
      } // 생성되지 않은 data-index는 div를 생성


      contents.innerHTML += '<div data-index="' + _i4 + '"></div>';
      newCnt++;
      newArray[cnt] = newCnt;
      cnt++;
    }

    return div_length + 13;
  }

  function insertContents() {
    contents_div = document.querySelectorAll('[data-index]');

    for (var _i5 = 0; _i5 < contentscnt; _i5++) {
      // 본문채우기
      contents_div[_i5].innerHTML += '<div class="bottom-div"></div>';

      for (var j = 0; j < 2; j++) {
        if (_i5 == 1 && j == 1) {// 히오스 마크 넣던 흔적
          //contents_div[i].innerHTML +=('<div>'+ p_tag + '</div>');
          //continue;
        }

        contents_div[_i5].innerHTML += p_tag;
      }

      contents_div[_i5].classList = 'gridcontent';
    }
  }

  function insertOrder() {
    nowIndex = $('[data-index]');
    var cnt = 0;

    for (var _i6 = 0; _i6 < jqI_len; _i6++) {
      oldArray[_i6] = oldArray[_i6].index;
      $(nowIndex[_i6]).css('order', oldArray[_i6]);
    } //이거 진짜 노력의 산물인데 좀 더 집중했으면 좋았을껄


    for (var _i7 = 0; _i7 < contentscnt; _i7++) {
      if (_i7 + 1 == newArray[cnt]) {
        // 이 부분에 'nowIndex[jqI_len+cnt]'이런 모양대신 >> '$(nowIndex[jqI_len+cnt])'이런 모양으로 써야하는 이유는 유사배열이기 때문이다.
        $(nowIndex[jqI_len + cnt]).css('order', newArray[cnt]);
        cnt++;
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

      for (var _i8 = 1; _i8 < clicked_location; _i8++) {
        _goto = contentscnt - clicked_location;
        $(nowIndex[_i8 - 1]).css('order', _goto + tmp + 1);
        tmp++;
      }

      tmp = 1;

      for (var _i9 = clicked_location; _i9 < contentscnt + 1; _i9++) {
        $(nowIndex[_i9 - 1]).css('order', tmp);
        tmp++;
      }
    });
  });
});