<?php
session_start();
$conn = mysqli_connect('localhost','normalUser','normalUser11!!','blogdb');

// navbar 생성 모듈 호출 
// print_nav() 함수가 내장되어 있다
// print_nav() 사용방법 : print_nav('로그인 버튼(로그인 상태)','로그인 되어있는 사용자명')
require_once('lib/navbar.php');

// 로그인 되어있는지 email 정보가 들어있는 세션 검사
if(!isset($_SESSION['email'])){
    // 로그인 되어있지 않다면 login 버튼으로 교체
    $loginButton = '<button class="btn btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Login
                    </button>';

    // navbar 함수 호출하여 navbar 생성
    $navbar = print_nav($loginButton, '');

    // 오른쪽 리스트의 2번째 버튼 조작
    $button2 = '<a class="list-group-item list-group-item-action" href="#">로그인 하세요</a>';
}else{
    // 로그인 되어 있다면 logout 버튼으로 교체
    $loginButton = '
                <form action="logout.php" method="post" class="logoutButton" id="dropdownMenuButton">
                    <button class="btn btn-outline-light" type="submit">
                        Logout
                    </button>
                </form>';

    // navbar 함수 호출 호출하여 navbar 생성
    $navbar = print_nav($loginButton, $_SESSION['nickname'].'님 반갑습니다!');

    // 2번 버튼 조절
    $button2 = '<a class="list-group-item list-group-item-action" href="?written">내 글 보기</a>';
}

    // content의 edit 버튼 조작을 위한 초기화
    // 내 글 보기를 클릭 했을때 (querystring == written) edit 버튼이 보여짐
    $btn_edit_none = "<style> .btn-edit {display:none !important; }</style>";
    $btn_edit_block = "<style> .btn-edit {display:inline-block !important; }</style>";

    // 한 페이지에 표시할 content의 시작점 과 끝점 설정
    $start_point = 1;
    $pagenation = 13;
    
    // 3번째 버튼 초기화
    $button3 = '';


    // querystring을 가져와서 index.php의 화면을 세세하게 조작한다.
    // ?main : 1번 버튼 클릭 시 동작, 전체 글 표시
    // ?written : 로그인 상태일 때 2번 버튼 클릭, 내가 작성한 글 표시
    // 나머지 : 전체 글 표시
    $Current_URI = $_SERVER['QUERY_STRING'];
    $Current_URI = explode('=', $Current_URI);
    // 전부 get으로 주는게 아니라 querystring으로 바꾸는 것도 있기 때문에 다 바꿔버리면 안됨 search-title이랑 page는 get으로 받고있음


    /* querystring 의 처리 */
    // 1번 버튼 클릭 시 변화 (메인 화면)
    if($Current_URI[0] == 'main'){
        $sql = "SELECT * from user, written where user.uid = written.uid order by wid desc;";

        //수정 버튼 숨기기 
        echo $btn_edit_none;
    
    }else if($Current_URI[0] == 'written'){
    // 2번 버튼 클릭 시 변화 (내 글 보기 화면)
        $sql = "SELECT * from user, written where user.uid = written.uid and written.uid = (select uid from user where email like '{$_SESSION['email']}' ) order by wid desc;";
        $button3 = '<a class="list-group-item list-group-item-action" href="writting.php">새 글 작성</a>';
        
        //수정 버튼 보이기
        echo $btn_edit_block;
    }else{
        $sql = "SELECT * from user, written where user.uid = written.uid order by wid desc;";

        //수정 버튼 숨기기
        echo $btn_edit_none;
    }
    /* 여기까지 querystring 처리 */



    /* GET의 처리 */
    // search-title / page = GET 방식으로 동작함
    // search-title로 검색한 결과가 12개 이상으로 넘어가면 pagenation으로 페이징이 된다.
    // 따라서 paging된 값은 querystring을 여러개 사용하여 제어한다.
    // 141행의 basename()을 사용하면 2개의 다른 querystring을 동시에 사용할 수 있다.

    // 상단 search input 태그의 검색 기능 동작
    if(!empty($_GET['search-title'])){
        $search_words = $_GET['search-title'];
        $sql = "SELECT * from user, written where user.uid = written.uid order by wid desc;";
        $result = mysqli_query($conn, $sql);
        $title = '';
        $search_wid = array();

        // DB 검색 결과 : title[6]의 값이 글의 제목이다.
        // title[6]의 값에서 검색하는 문자가 있다면 => $search_wid에 wid를 누적시켜 줌
        while($row = mysqli_fetch_array($result)){
            $title = explode('/',$row['url']);
            if(strpos($title[6], $search_words) !== false){
                array_push($search_wid, $row['wid']);
            }
        }

        // 누적시킨 wid 값 들에 대해 query문 진행
        $search_wid = implode(', ', $search_wid);
        $sql = "SELECT * from user, written where user.uid = written.uid and written.wid in ($search_wid) order by wid desc;";

        if(!empty($_GET['page'])){
            // 페이지 이동 시 보여지는 파일 
            $start_point = ($_GET['page']-1)*12 + 1;
            $pagenation = ($_GET['page'])*12 + 1;
        }

    }else if(!empty($_GET['page'])){
        // 페이지 이동 기능
        $sql = "SELECT * from user, written where user.uid = written.uid order by wid desc;";

        // 페이지 이동 시 보여지는 파일 
        $start_point = ($_GET['page']-1)*12 + 1;
        $pagenation = ($_GET['page'])*12 + 1;

    }
    
    $result = mysqli_query($conn, $sql);
    // 검색 결과의 개수를 12로 나누고 올림 하여 
    // 하단 페이지 버튼 개수 결정
    $query_length_upper = ceil(mysqli_num_rows($result)/12);
    $pagebuttons = '';

    // 하단 페이지 버튼 생성
    for($i=1; $i <= $query_length_upper; $i = $i +1){
        // 페이지 버튼의 href에 들어갈 querystring  생성
        $movePage = basename($_SERVER['PHP_SELF'])."?".$_SERVER['QUERY_STRING']."&page=$i";

        // 실제 페이지 버튼 생성
        $pagebuttons = $pagebuttons."<li class='page-item'><a class='page-link' href='$movePage' data-page='$i'>$i</a></li>";
    }
    
    $i = 0;
    $list = '';
    // 본문 미리보기 생성
    while($row = mysqli_fetch_array($result)){
        $i = $i + 1;

        // 조건에 부합하지 않는다면 무시하고 다음 행 읽음
        if($i < $start_point || $i >= $pagenation){
            continue;
        }

        $url = $row['url'];
        $url_pieces = explode("/", $url);

        $img_url = "./data/$url_pieces[5].png";
        $date = $row['date'];
        $writter = $row['nickname'];

        // 미리보기 내용 생성
        $file = fopen("{$url}","r") or die("파일을 열 수 없습니다.");
        $text = '';
        $wid = $row['wid'];

        // 파일 내용 출력
        while( !feof($file) ) {
            $text =  $text.fgets($file);
        }
        fclose($file);
        

        $img_error = "this.src='./data/error.png'";
        $list = $list." <div class='contents' data-no='{$i}'>
                            <div class='wrap-thumbnail'>
                                <img src='$img_url' class='rounded' onerror=$img_error alt='...'>
                            </div>
                            <span class='contents-title'>{$url_pieces[6]}</span>
                            <hr class='title-division'>
                            <span class='contents-body'>{$text}</span>
                            <div id='contents-buttons' class='btn-group'>
                                <div class='wrap-buttons'>
                                    <form action='view.php' method='post'>
                                        <input type='hidden' name='wid' value='{$wid}'>
                                        <button type='submit' class='btn btn-sm btn-outline-light btn-view'>View</button>
                                    </form>
                                    <form action='update.php' method='post'>
                                        <input type='hidden' name='wid' value='{$wid}'>
                                        <button type='submit' class='btn btn-sm btn-outline-light btn-edit'>Edit</button>
                                    </form>
                                </div>
                                <div class='contents-info'>
                                    <div class='contents-date'>
                                        {$date}
                                    </div>
                                    <div class='contents-writter'>
                                        {$writter}
                                    </div>
                                </div>
                            </div>
                        </div>";
        
    }

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
    </script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <link rel="stylesheet" type="text/css" href="scss/dist/custom.css">
</head>

<body>
    <div id="wrap-body">
        <div class="background"></div>
        <?php
            echo $navbar;
        ?>
        <div class="album">
            <div class="banner col-12 row">
                <div class="card">
                    <div class="wrap-banner-img">
                        <img src="data/banner 13.jpg" class="rounded" alt="...">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">자유롭게 블로그처럼, 일기장처럼 자기만의 이야기를 남겨보세요!</h5>
                    </div>
                </div>
            </div>
            <div class="wrap-body">
                <div class="container" id="container-id">
                    <?= $list ?>
                </div>
                <div id="list-example" class="list-group">
                    <a class="list-group-item list-group-item-action" href="?main">전체 글 보기</a>
                    <?= $button2?>
                    <?= $button3?>
                </div>
            </div>
            <nav aria-label="Page navigation example" class="pagenation-buttons">
                <ul class="pagination">
                    <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </li>
                    <?= $pagebuttons?>
                    <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</body>

</html>