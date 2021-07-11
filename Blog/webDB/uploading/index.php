<?php
session_start();
$conn = mysqli_connect('localhost','normalUser','normalUser11!!','blogdb');

require_once('lib/navbar.php');

// 클릭 => js에서 감지 => ajax로 php 전송
// 클릭 => php 감지 => php에서 ajax script 실행?
// 클릭 => 클릭 한 버튼의 index 번호를 받아오면 index * 12해서 표시

// 로그인 상태 확인하여 로그인 버튼 조절
if(!isset($_SESSION['email'])){
    $loginButton = '<button class="btn btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Login
                    </button>';

    // 2번 버튼 조절
    $navbar = print_nav($loginButton);
    $button2 = '<a class="list-group-item list-group-item-action" href="#">로그인 하세요</a>';
}else{
    $loginButton = '
                <form action="logout.php" method="post" class="logoutButton" id="dropdownMenuButton">
                    <button class="btn btn-outline-light" type="submit">
                        Logout
                    </button>
                </form>';

    $navbar = print_nav($loginButton);
    // 2번 버튼 조절
    $button2 = '<a class="list-group-item list-group-item-action" href="?written">내 글 보기</a>';
}

    $Current_URI = $_SERVER['QUERY_STRING'];
    $btn_edit_none = "<style> .btn-edit {display:none !important; }</style>";
    $btn_edit_block = "<style> .btn-edit {display:inline-block !important; }</style>";


    // 1번 버튼 클릭 시 변화 (메인 화면)
    if($Current_URI == 'main'){
        $sql = "SELECT * from user, written where user.uid = written.uid order by wid desc;";
        $button3 = '';

        //수정 버튼 숨기기
        echo $btn_edit_none;
    
    }else if($Current_URI == 'written'){
    // 2번 버튼 클릭 시 변화 (내 글 보기 화면)
        $sql = "SELECT * from user, written where user.uid = written.uid and written.uid = (select uid from user where email like '{$_SESSION['email']}' ) order by wid desc;";
        $button3 = '<a class="list-group-item list-group-item-action" href="writting.php">새 글 작성</a>';
        
        //수정 버튼 보이기
        echo $btn_edit_block;
    }else{
        $sql = "SELECT * from user, written where user.uid = written.uid order by wid desc;";
        $button3 = '';

        //수정 버튼 숨기기
        echo $btn_edit_none;
    }
    
    $result = mysqli_query($conn, $sql);

    $i = 1;
    $list = '';
    // 본문 미리보기 생성
    while($row = mysqli_fetch_array($result)){
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
        
        $i = $i + 1;
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
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
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