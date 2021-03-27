$(document).ready(function(){
    let contents= document.querySelector('.contents');
    let data_index = document.querySelectorAll('[data-index]');
    let buttons = document.querySelectorAll('wrapnav > ul > li');
    let jqIndex = $('[data-index]');
    let jqI_len =jqIndex.length;
    let p_tag = '<span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex possimus ipsum, beatae unde doloribus repellat odio tempora omnis earum quo? Doloribus incidunt labore at commodi veritatis. Accusamus nihil eaque modi?</span>';
    let oldArray = [];
    let newArray = [];
    

    const contentscnt = createContents();
    insertContents();
    insertOrder();
    statbar();


    function insertOrder(){
        let nowIndex = $('[data-index]');
        let cnt = 0;
        
        
        for(let i=0; i<jqI_len; i++){
            oldArray[i] = oldArray[i].index;
            $(nowIndex[i]).css('order',oldArray[i]);
        }
        
        //이거 진짜 노력의 산물인데 개멍청했네 시발;
        for(let i=0; i<nowIndex.length; i++){
            //console.log(i+1,newArray[cnt]);
            if(i+1 == newArray[cnt]){
                //console.log('inside i =',i,$(nowIndex[jqI_len+cnt]).data(), newArray[cnt]);
                $(nowIndex[jqI_len+cnt]).css('order',newArray[cnt]);
                cnt++;
            }

            // 한 행마다 3번째 gird는 폰트스타일 변경
            if(Math.floor( $(nowIndex[i]).data('index')%5) == 3){
                //console.log(i+1);
                $(nowIndex[i]).css('font-family',"'Syne Mono', 'monospace'", 
                                    'font-weight','bold',
                                    'font-size','2rem');
            }
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
        

        for(let i=1; i<(div_length+11); i++){
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
        return div_length+10;
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
    
});