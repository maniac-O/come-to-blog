$(document).ready(function(){
    let contents= document.querySelector('.contents');
    let data_index = document.querySelectorAll('[data-index]');
    let jqIndex = $('[data-index]');
    let jqI_len = jqIndex.length;
    let contents_div;
    let p_tag = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex possimus ipsum, beatae unde doloribus repellat odio tempora omnis earum quo? Doloribus incidunt labore at commodi veritatis. Accusamus nihil eaque modi?<br><br>';
    let oldArray = [];
    let newArray = [];
    let nowIndex;
    let moveNavBar =0;
    let isHeader = false;
    let isScroll = false;
    

    const contentscnt = createContents();
    insertContents();
    insertOrder();
    statbar();
    insertDivBottom();
    cloneToPreview();
    arrowClick();
    headerHover();
    hoverbar();
    makeDate()
    getWeather();
    setInterval(makeDate,1000);
    resizeTitle();

    $(window).resize(function(){
        resizeTitle();
    });

    function resizeTitle(){
        if($(document).width()<=1619){
            $('.originalH2 section1').css('float','right');
            $('.originalH2 section2').css('float','right');
        }else{
            $('.originalH2 section1').css('float','left');
            $('.originalH2 section2').css('float','left');
        }
    }
    

    function getWeather(){
        $.ajax({
            url : 'http://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=49680123c3aa9bd8c047e59da5114873',
            dataType : 'json',
            type : 'GET',
            success: function(data){
                
                let $Icon = (data.weather[0].icon);
                let $Temp = Math.floor(data.main.temp) + 'º';
                let $city = data.name;
                $('.CurrIcon1').append('<img class="weatherIcon" src="'+'http://openweathermap.org/img/wn/'+ $Icon + '@2x.png'+'"></img>');
                $('.CurrTemp1').prepend($Temp);
                $('.City1').append($city);
            }
        })
        $.ajax({
            url : 'http://api.openweathermap.org/data/2.5/weather?q=Busan&appid=49680123c3aa9bd8c047e59da5114873',
            dataType : 'json',
            type : 'GET',
            success: function(data){
                let $Icon = (data.weather[0].icon);
                let $Temp = Math.floor(data.main.temp) + 'º';
                let $city = data.name;
                $('.CurrIcon2').append('<img class="weatherIcon" src="'+'http://openweathermap.org/img/wn/'+ $Icon + '@2x.png'+'"></img>');
                $('.CurrTemp2').prepend($Temp);
                $('.City2').append($city);
            }
        })
    }


    function makeDate(){
        let headerDate = document.querySelector('.header-date');
        headerDate.innerHTML = (new Date().toLocaleString());
    }

    function headerHover(){
        
        
        
        $('.header-rolling h2').css(
            'top', $('.header-rolling').height()/3
        );

        clonedH2 = $('.header-rolling h2:nth-of-type(1)').clone();
        $(clonedH2).appendTo('.header-rolling');
        clonedH2 = $('.header-rolling h2:nth-of-type(1)').clone();
        $(clonedH2).appendTo('.header-rolling');
        
        $('.header-text h2:nth-of-type(1)').addClass('clonedH2 clonedH2First');
        $('.header-text h2:nth-of-type(3)').addClass('clonedH2 clonedH2Second');
        

        originalH2 = $('.header-text h2:nth-of-type(2)');
        $('.header-text h2:nth-of-type(2)').addClass('originalH2');
        clonedH2 = $('.clonedH2');
        $(originalH2[1]).css({
            
        });

        originalsection1 = $('.originalH2 section1');
        $(originalsection1).text('THIS IS BLOG\u00A0');
        originalsection2 = $('.originalH2 section2');
        clonedH2 = $('.clonedH2');

        $('.clonedH2First section1').css({
            'opacity':'0',
        });
        $('.clonedH2Second section2').css({
            'opacity':'0',
        });
        

        $('.header-text h2').mouseover(function(){
            
            $(originalsection1).css({
                'transition':'all 0.3s',
                'transform':'rotateX(90deg)',
            });
            $(originalsection2).css({
                'transition':'all 0.3s',
                'transform':'rotateX(90deg)',
            });
            $(clonedH2[0]).css({
                'transition':'all 0.7s',
                'transform':'rotateX(0deg)',
                'transform-origin':'bottom',
            });
            $(clonedH2[1]).css({
                'transition':'all 0.7s',
                'transform':'rotateX(0deg)',
                'transform-origin':'top',
            });
        });
        $('.header-text h2').mouseout(function(){
            
            $(originalsection1).css({
                'transition':'all 0.7s',
                'transform':'rotateX(0deg)',
            });
            $(originalsection2).css({
                'transition':'all 0.7s',
                'transform':'rotateX(0deg)',
            });
            $(clonedH2[0]).css({
                'transition':'all 0.3s',
                'transform':'translateY(-29px) rotateX(90deg)',
            });
            $(clonedH2[1]).css({
                'transition':'all 0.3s',
                'transform':'translateY(29px) rotateX(90deg)',
            });
        });
    }






    function hoverbar(){
        let menuline = $('.menuline');
        // 헤더 메뉴바 마우스 호버 이벤트
        function movemenuline(){
            $('.hoverbar').css('display','flex');
            
            $(menuline[0]).css({
                'transform':'translateY(11px) rotate(40deg)',
            });
            $(menuline[1]).css({
                'opacity':'0'
            });
            $(menuline[2]).css({
                'transform':'translateY(-11px) rotate(-40deg)',
            });
        }
        function stopmenuline(){
            $('.hoverbar').css('display','none');
            
            $(menuline[0]).css({
                'transform':'rotate(0deg)',
            });
            $(menuline[1]).css({
                'opacity':'1'
            });
            $(menuline[2]).css({
                'transform':'rotate(0deg)',
            });
        }


        $('.menu-button').mouseover(function(){
            movemenuline();
        });
        $('.hoverbar').mouseover(function(){
            $('.hoverbar').css('display','flex');
            movemenuline();
        });

        // 헤더 메뉴바 마우스 아웃 이벤트
        $('.menu-button').mouseout(function(){
            stopmenuline();
        });
        $('.hoverbar').mouseout(function(){
            $('.hoverbar').css('display','none');
            stopmenuline();
        });
        
    }


    function insertPreviewIndex(){
        let clonedIndex = document.querySelectorAll('.clonedContents');
        for(i=0; i<10;i++){
            let clonedIndextmp = document.querySelectorAll('.clonedContents .bottom-div');
            clonedIndextmp[i].innerHTML = "NEWS"+"<cnt>&nbsp"+(i+11)+"</cnt>";
        }
    }

    // sidebar내 화살표 클릭 시 preview 이동
    function arrowClick(){
        let clonedmiddle = $('.cloned-middle');
        let clonedwidth = $('.clonedContents').width();
        let waitClick = true;
        let clonedIndex = 1;
        clonedmiddle.css('left', -clonedwidth);

        let buttons = document.querySelectorAll('.sidebar-top-right');
        buttons[1].addEventListener('click',function(){
            
            if(waitClick){
                waitClick = false;
                clonedmiddle.css('transition', 'all 0.4s');
                clonedmiddle.css('left', '+=' + clonedwidth);
                clonedIndex--;
                if(!clonedIndex){
                    setTimeout(function(){
                        clonedmiddle.css('transition', 'all 0s');
                        clonedmiddle.css('left', -(clonedmiddle.width() - clonedwidth*2));
                        clonedIndex=10;
                    },400);
                }


                // 너무빠른 클릭 방지
                setTimeout(function(){
                    waitClick = true;
                },400);
            }
        });
        buttons[0].addEventListener('click',function(){
            
            if(waitClick){
                waitClick = false;
                clonedmiddle.css('transition', 'all 0.4s');
                clonedmiddle.css('left', '-=' + clonedwidth);
                clonedIndex++;
                if(clonedIndex==11){
                    setTimeout(function(){
                        clonedmiddle.css('transition', 'all 0s');
                        clonedmiddle.css('left', - (clonedwidth));
                        clonedIndex=1;
                    },400);
                }

                // 너무빠른 클릭 방지
                setTimeout(function(){
                    waitClick = true;
                },400);
            }
        });
    }



    // sidebar의 preview에 본문내용 clone시키기
    function cloneToPreview(){
        let sidebarClone = $('.cloned-middle');
        for(i=11; i<=contentscnt; i++){
            let cloned = $(nowIndex[i-1]).clone().appendTo(sidebarClone);
            cloned.addClass('clonedContents');
        }
        // Preview창 middle부분에 Index번호 띄우기
        insertPreviewIndex();

        let parents = document.querySelector('.cloned-middle');
        let sidebarfisrt = document.querySelectorAll('.clonedContents')[0]
        let sidebarlast = document.querySelectorAll('.clonedContents')[9];
        let cloned_first = sidebarfisrt.cloneNode(true);
        let cloned_last = sidebarlast.cloneNode(true);
        $(cloned_first).appendTo('.cloned-middle');

        parents.insertBefore(cloned_last, sidebarfisrt);


        // preview영역에 clone 된 이미지들 컬러로 변경 ( src 로케이션 재지정 )
        let sidebarCloneImg = $('.clonedContents p .contents-img');
        $(sidebarCloneImg[0]).attr('src','./pic/waitingRoom/contents'+(nowIndex.length)+'.gif');
        for(i=1; i<sidebarCloneImg.length-1; i++){
            $(sidebarCloneImg[i]).attr('src','./pic/waitingRoom/contents'+(i+10)+'.gif');
        }
        $(sidebarCloneImg[sidebarCloneImg.length]).attr('src','./pic/waitingRoom/contents'+(11)+'.gif');
        
    }

    // 스크롤 시 Preview 따라오기
    function scrollPreview(){
        $('.sidebar').css({
            'position':'fixed',
            'top':'70px',
            'width': ($('.wrapmiddle').width()/10*2.4),
        });
    }


    // 스크롤 이동 시 네비게이션 바 색깔 변경
    $(window).scroll(function(e){
        if(isScroll){
            isScroll = false;  
            // 스크롤 위치 감지 함수
            navbarPosition();
        }
        setInterval(function(){
            isScroll = true;
        },100);
    })


    // 네비게이션 색깔 실제 변경 함수
    function navbarColor(location){
        
        location = Math.floor(location)+1;
        if(location == 0)
            isHeader = true;
        if(location >= 0){

            // li값을 변경해 준 이유는 이미 ul에 색상이 적용되어있기 때문에 
            // li에 색상 변경 줬다가 가장 위로 올라가면 지워버리면 편하기 때문에 
            fixedbar = document.querySelectorAll('.wrapnav ul li');
            for(let i=0; i<5; i++){

                // 가장 상위에 있을땐 모든 백그라운드 색 제거
                if(isHeader){
                    fixedbar[i].style.background = '';
                    continue;
                }

                // 현재 위치에 있는 영역만 색깔 변경, 나머지는 색상 제거
                if(i==location-1){
                    navColorIndex = location-1;
                    fixedbar[location-1].style.background = '#180900';
                    
                }else if(i!=location-1){
                    fixedbar[i].style.background = '';
                }
            }
            isHeader = false;
        }
        
        
        
        

    }


    // 스크롤 인식 후 navbar에 fixed 속성 부여
    function navbarPosition(){
        // scroll시 navbar조작
        navbar = document.querySelector('.wrapnav');
        if(($(window).scrollTop()) >=270){
            navbar.classList.add('fixed-bar');
            
            moveNavBar = Math.floor(($(window).scrollTop()-300)/700);
            navbarColor(moveNavBar);
            
        }else if(($(window).scrollTop()) < 270){
            navbarColor(-1);
            navbar.classList.remove('fixed-bar');
        }
        else{
            navbar.classList.remove('fixed-bar');
        }

        // scroll시 sidebar조작
        if(($(window).scrollTop()) >= $(document).height()- ($('.footer').height()+950)){
            $('.sidebar').css({
                'position':'relative',
                'top':$(document).height()- ($('.footer').height()+1500)+'px',
            });
        }else if($(window).scrollTop() >= 410){
            scrollPreview();
            
        }else if(($(window).scrollTop()) < 800){
            $('.sidebar').css({
                'position':'relative',
                'top':'0',
            });
        }
    }




    // contents 내의 .bottom-div의 내용 추가 함수
    function insertDivBottom(){
        for(let i=1; i<contentscnt+1; i++){
            contents_bottom_div = document.querySelectorAll('.bottom-div');
            contents_bottom_div[i-1].innerHTML = '<div class="bottom-div-line"></div>';
        }
    }
    

    function createContents(){
        let div_length = data_index.length;
        let oldCnt=0;
        let newCnt=0;
        let cnt=0;
        
        for(let i=0; i<jqI_len; i++){
            oldArray[i] = jqIndex.eq(i).data();
        }
        

        for(let i=1; i<(div_length+14); i++){
            // 아직 생성되지 않은 곳에 order속성 추가시키기
            
            
            // 이미 생성된 data-index는 넘김
            let alreadyMade = data_index[oldCnt].dataset.index;
            if(alreadyMade == i){
                oldCnt++;
                newCnt++;

                if(oldCnt==div_length)
                    oldCnt--;
                continue;
            }
            // 생성되지 않은 data-index는 div를 생성
            contents.innerHTML += '<div data-index="' + i +  '"></div>';

            newCnt++;
            newArray[cnt] = newCnt;
            cnt++;
            
        }
        sortDataIndex();
        return div_length+13;
    }

    function insertContents(){
        contents_div = document.querySelectorAll('[data-index]');
        for(let i=0; i<contentscnt; i++){
            // 본문채우기
            let contents_tmp = '';
            contents_tmp += '<div class="bottom-div"></div>';
            contents_tmp += "<p><img class='contents-img' src='./pic/contents" + (i+1) + ".gif'>";
            
            for(let j=0; j<2; j++){
                
                contents_tmp += p_tag;
            }
            contents_tmp += '</p>';
            contents_div[i].innerHTML += contents_tmp;
            contents_div[i].classList='gridcontent';
        }
    }
    function insertOrder(){
        nowIndex = $('[data-index]');
        let cnt = 0;
        

        for(let i=0; i<nowIndex.length; i++){
            $(nowIndex[i]).css('order',i+1);
        }

        // 2021-04-03 수정 전
        /*
        for(let i=0; i<jqI_len; i++){
            oldArray[i] = oldArray[i].index;
            $(nowIndex[i]).css('order',oldArray[i]);
        }
        
        //이거 진짜 노력의 산물인데 좀 더 집중했으면 좋았을껄
        for(let i=0; i<contentscnt; i++){
            if(i+1 == newArray[cnt]){
                // 이 부분에 'nowIndex[jqI_len+cnt]'이런 모양대신 >> '$(nowIndex[jqI_len+cnt])'이런 모양으로 써야하는 이유는 유사배열이기 때문이다.
                $(nowIndex[jqI_len+cnt]).css('order',newArray[cnt]);
                cnt++;
            }
        }
        */
    }

    function statbar(){
        let tmp='';
        let statbar = document.querySelector('.statbar');
        tmp += "<p>Here's <highlight class='highlight'>" + contentscnt + '</highlight> news wait for you</p>';
        statbar.innerHTML += tmp;
    }


    // NOTE: https://heropy.blog/2019/08/17/css-grid/ 여기 order 속성으로 위치 조절 가능하다.
    // nav바를 클릭하면 회전. 예) A=>1번 B=>2번으로 슬라이드
    let navbar_index = document.querySelectorAll('.wrapnav ul li');
    let navcnt=1;
    
    function sortDataIndex(){

        $('.contents').html(
            $('[data-index]').sort(function(a,b){
                return $(a).data('index') - $(b).data('index');
        })
        );
        nowIndex = $('[data-index]');
    }
    Array.prototype.forEach.call(navbar_index, function(e){
        e.dataset.chunk=navcnt;
        navcnt++;
        e.addEventListener('click',function(){
            let data_chunk = e.dataset.chunk;
            let clicked_location = (data_chunk-1)*5+1;
            let tmp = 1;
            let goto = 0;
            

            for(let i=1; i<clicked_location; i++){
                goto = contentscnt - clicked_location;
                $(nowIndex[i-1]).css('order',goto+tmp+1);
                tmp++;
            }
            tmp = 1;
            for(let i=clicked_location; i<contentscnt+1; i++){
                $(nowIndex[i-1]).css('order',tmp);
                tmp++;
            }
            

            
        });
    });
});