$(document).ready(function(){
    let contents= document.querySelector('.contents');
    let data_index = document.querySelectorAll('[data-index]');
    let buttons = document.querySelectorAll('wrapnav > ul > li');
    let screen_height = document.body.scrollHeight;
    let jqIndex = $('[data-index]');
    let jqI_len = jqIndex.length;
    let contents_div;
    let p_tag = '<span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex possimus ipsum, beatae unde doloribus repellat odio tempora omnis earum quo? Doloribus incidunt labore at commodi veritatis. Accusamus nihil eaque modi?</span>';
    let oldArray = [];
    let newArray = [];
    let nowIndex;
    let cloned;
    

    const contentscnt = createContents();
    insertContents();
    insertOrder();
    statbar();
    sortDataIndex();
    clicked_contents();

    
    function clicked_contents(){
        Array.prototype.forEach.call(contents_div, function(e){
            e.addEventListener('click',function(){
                $('.cloned').remove();
                cloned = $(e).clone().appendTo('.contents');
                cloned.addClass('cloned');
                $(cloned).css({
                        'position':'absolute'
                        ,'left':'30%'
                        ,'top':'5%'
                        ,'width':'40%'
                        ,'overflow':'hidden'
                        ,'background':'#d1cb8e'
                });
                addRemove(document.querySelector('.cloned'));
            });
        });
    }
    
    function addRemove(current){   
        console.log(current);
        current.addEventListener('click',function(){
            current.classList.toggle('deleted');
            // NOTE: animation 동작중에 클릭하면 settimeout때문에 이상해지는데 어차피 확대시키고 이럴꺼라서 중간에 클릭못하게 만들것임.
            setTimeout(function(){
                current.classList.toggle('cloned');
                current.classList.toggle('deleted');
                current.remove();
            },980);
            
        });
    }

    function createContents(){
        let div_length = data_index.length;
        let oldCnt=0;
        let newCnt=0;
        let cnt=0;
        
        for(let i=0; i<jqI_len; i++){
            oldArray[i] = jqIndex.eq(i).data();
        }
        

        for(let i=1; i<(div_length+13); i++){
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
        return div_length+12;
    }

    function insertContents(){
        contents_div = document.querySelectorAll('[data-index]');
        for(let i=0; i<contentscnt; i++){
            // 본문채우기
            for(let j=0; j<4; j++){
                
                if(i==1 && j==2){
                    contents_div[i].innerHTML +='<span>RESTORANCE IS EVERYWHERE.. MAYBE IN YOUR COMPUTER</span><div><img src="./pic/HEOS01BW.png" alt=""></img></div>'
                    contents_div[i].innerHTML +=('<div>'+ p_tag + '</div>');
                    continue;
                }
                
                contents_div[i].innerHTML += p_tag;
            }
            contents_div[i].classList='gridcontent';
        }
    }
    function insertOrder(){
        nowIndex = $('[data-index]');
        let cnt = 0;
        
        
        for(let i=0; i<jqI_len; i++){
            oldArray[i] = oldArray[i].index;
            $(nowIndex[i]).css('order',oldArray[i]);
        }
        
        //이거 진짜 노력의 산물인데 좀 더 집중했으면 좋았을껄
        for(let i=0; i<nowIndex.length; i++){
            //console.log(i+1,newArray[cnt]);
            if(i+1 == newArray[cnt]){
                // 이 부분에 'nowIndex[jqI_len+cnt]'이런 모양대신 >> '$(nowIndex[jqI_len+cnt])'이런 모양으로 써야하는 이유는 유사배열이기 때문이다.
                //console.log('inside i =',i,$(nowIndex[jqI_len+cnt]).data(), newArray[cnt]);
                $(nowIndex[jqI_len+cnt]).css('order',newArray[cnt]);
                cnt++;
            }

            // 한 행마다 3번째 gird는 폰트스타일 변경
            if(Math.floor( $(nowIndex[i]).data('index')%5) == 3){
                //console.log(i+1);
                $(nowIndex[i]).css({'font-family':"'Syne Mono', 'monospace'", 
                                    'font-weight':'bold',
                                    'font-size':'2rem'});
            }
        }
        
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
            $('.gridcontent').sort(function(a,b){
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
                //console.log(tmp);
                $(nowIndex[i-1]).css('order',tmp);
                tmp++;
            }
            

            
        });
    });
});