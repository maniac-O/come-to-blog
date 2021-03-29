"use strict";

// NOTE: 이 코드는 newpaperJS.js의 파일을 수정한 파일이다.
// FIXME:FIXME: 문제점 문제점 문제점 문제점 문제점 문제점 문제점 문제점 문제점 문제점 문제점 문제점 문제점 문제점 문제점 문제점 FIXME:FIXME:
// insertContents()함수가 수정되었으며, data-index를 1~5, 6~10, 11~15, 16~20로 가진 div들을 div로 한번 더 묶는 코드이다. 즉, 한 행을 묶겠다는 말이다.
// 한 행으로 묶는 이유는 위에 navbar를 하나씩 클릭할때마다 transition효과로 부드럽게 한 행씩 최상위로 올라오는 동작을 수행하기 위해서였다.
// 하지만 묶은 뒤 innerHTML로 삽입 시 자바스크립트 파일이 html파일보다 느리게 실행 되므로 html에서 작성한 사진과 글자 등 모든 본문내용이 초기화 되어버린다.
// 또한 소스코드 27행의 sortDataIndex()를 주석처리 한 뒤 실행시키면 본문이 잘 덮어 씌여진다. 하지만 풀면 실행되지 않는데, 여기서 또 한가지 문제점이 발견된다.
// newpaperJS파일의 기본 동작 원리는 div 태그를 만들고(createContents) => 본문을 집어넣고(insertContents()) => grid의 순서를 나타내는 order속성을 삽입하고(insertOrder()) => 
// 뒤죽박죽 되어있는 html을 정렬하고(sortDataIndex())하는 것이다. (나머지 statbar()와 clicked_contents()는 각각 한 글자를 하이라이트 효과를 주는 것과 클릭 시 이벤트이다.)
// 그렇기 때문에 sortDataIndex()를 주석처리 한 뒤 실행을 시키면 본문은 문제없이 나와 보이지만 본문내용도 끌끔하게(ㅅㅂ) 다 날아 갔는데 막상 뚜껑을 열어보면 정렬도 안되어있어서
// html코드도 망한 것을 알 수 있다.
// 왜 div로 또 다시 묶냐고 궁금할 수 있는데 그 이유는 grid에 order 속성으로(이하 order) 순서를 설정하게 되어있다.
// 이를 변경하기 위해서는 order 속성을 변경해야 하는데 transition속성을 준 뒤 order속성을 변경하게되면 생각했던 그림이 나오지 않는데(딱딱하게 위치만 툭툭 바뀜),
// 원인은 
// 1번. order속성은 location이 있는 것이 아니기 때문에, order 속성이 변경되면 진짜 각각의 순서만 바뀌게된다. 그런 이유로 뚝뚝 끊기는 모양이 나오고,
// 2번. 그렇게 끊기는 모양이 for문으로 동작하기 때문에 transition 속성으로 인해 하나씩 순차적으로 끊기게 위치가 바뀐다. 그렇기 때문에 더더욱 부자연스럽다.
// ===================================================================================================================================
// 문제점 2
// FIXME: 문제점 해결방안
// grid로 contents를 만들었는데 grid는 그런 본문내용보단 전체적인 레이아웃을 만드는 편이 맞는 것 같다.
// 왜냐하면 본문내용은 동적인 이펙트를 만들기도 하고, 위치를 변경시키거나 속성을 변경시키는 경우가 많기 때문이다.
// NOTE: 배운점
// NOTE: 좋은점
// NOTE: 기타
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
  statbar(); //sortDataIndex();

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
    contents = document.querySelector('.contents');
    var tmp_p_tag = '';

    for (var i = 0; i < contentscnt; i++) {
      var fourP = '';

      for (var j = 0; j < 4; j++) {
        fourP += p_tag;

        if (i == 1 && j == 1) {
          /*
          contents_div[i].innerHTML +='<span>RESTORANCE IS EVERYWHERE.. MAYBE IN YOUR COMPUTER</span><div><img src="./pic/HEOS01BW.png" alt=""></img></div>'
          contents_div[i].innerHTML +=('<div>'+ p_tag + '</div>');
          */
          fourP += '<span>RESTORANCE IS EVERYWHERE.. MAYBE IN YOUR COMPUTER</span><div><img src="./pic/HEOS01BW.png" alt=""></img></div>';
          fourP += '<div>' + p_tag + '</div>';
          j = 5;
        }
      } // 본문채우기


      if ((i + 1) % 5 == 1) {
        // tmp_p_tag += '<div>' + 1번째div시작 + fourP + 1번째div끝;
        tmp_p_tag += '<div>' + '<div data-index="' + (i + 1) + '">' + fourP + '</div>';
      }

      if ((i + 1) % 5 == 0) {
        // tmp_p_tag += 5번째div + fourP + 5번째div닫기 +'</div>';
        tmp_p_tag += '<div data-index="' + (i + 1) + '">' + fourP + '</div>' + '</div>'; //console.log(tmp_p_tag, i+1);
        //tmp_p_tag='';
      } else {
        //2~4
        //tmp_p_tag += 시작div + fourP + 끝div;
        tmp_p_tag += '<div data-index="' + (i + 1) + '">' + fourP + '</div>';
      }

      contents_div[i].classList = 'gridcontent';
    }

    contents.innerHTML = tmp_p_tag; //contents_div[i].innerHTML = tmp_p_tag;
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