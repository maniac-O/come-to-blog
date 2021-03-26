$(document).ready(function(){
    let screen_width = document.body.scrollWidth;
    let screen_height = document.body.scrollHeight;
    let block_section = screen_height / 8;
    const stars_width_cnt = parseInt(10);;
    const stars_height_cnt = parseInt(10);
    let block_height = [];
    let tmp=1;

    
    // '열' 한 줄에 들어갈 별 개수, 한 개의 height block의 크기를 지정 해주고 그 안에서 random하게 돌려줘야함
    function init_height(){
        let height_one_block = parseInt(screen_height / stars_height_cnt);
        for(let i=0; i<11; i++){
            block_height[i] = height_one_block * i;
        }
    }


    // main 함수 되는친구
    init_height();
    for(let i=0; i<6; i++){
        
        $('<div></div>').addClass('wrap-stars').css({
            'top' : block_section*i,
        }).appendTo('.wrap-blog');
        
        make_star(make_width(), make_height());
    }


    // stars_width_array 배열에 행에 들어갈 랜덤 위치 할당
    function make_width(){
        let stars_width_array = [];
        for(let i=1; i<stars_width_cnt; i++){
            
            stars_width_array[i] = getRandomInt(parseInt((screen_width/stars_width_cnt)*(i-1)), parseInt((screen_width/stars_width_cnt)*i));
        }
        sortArray(stars_width_array);
        return stars_width_array;
    }

    // FIXME: 최소 최대값 범위 받아서 그안에서 랜덤 돌리고
    function make_height(){
        let stars_height_array = [];
        for(let i=0; i<stars_height_cnt; i++){
            
            stars_height_array[i] = getRandomInt(parseInt(block_height[tmp-1]), parseInt(block_height[tmp]));
            
        }
        tmp ++;
        return stars_height_array;
    }

    // FIXME: 블럭 크기 안에서 출력구문 루핑
    function make_star(width_array, height_array){
        
        for(let i=0; i<stars_width_cnt; i++){
            
            for(let j=0; j<9; j++){
                $('<span></span>').addClass('stars-made-js').css({
                    'left': width_array[j],
                    'top' : height_array[j],
                }).appendTo('.wrap-stars');
            }
        }
    }

    // 배열 오름차순 정렬 함수
    function sortArray(array){
        array.sort(function(a, b){
            return a-b
        })
    }

    // 랜덤 위치 생성 함수 ( 0 ~ 디스플레이 크기 만큼 랜덤변수 생성함 )
    function getRandomInt(min, max){
        min++;
        let randomNum = Math.floor(Math.random() * (max-min+1))+min;
        return parseInt(randomNum);
    }
})