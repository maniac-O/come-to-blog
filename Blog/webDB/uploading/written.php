<?php
session_start();
require_once('lib/navbar.php');
$conn = mysqli_connect('localhost','normalUser','normalUser11!!','blogdb');
if(!isset($_SESSION['email'])){
    $loginButton = '<button class="btn btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Login
                    </button>';
    echo "<script> document.location.href='index.php'; </script>";
    $navbar = print_nav($loginButton);
}else{
    $loginButton = '
                <form action="logout.php" method="post" class="logoutButton">
                    <button class="btn btn-outline-light" type="submit">
                        Logout
                    </button>
                </form>';
    $navbar = print_nav($loginButton);
    $sql = "SELECT * from written where uid = (select uid from user where email like '{$_SESSION['email']}' );";
    $result = mysqli_query($conn, $sql);

    $list = '';
    // 본문 미리보기 생성
    while($row = mysqli_fetch_array($result)){
        $url = $row['url'];
        $url_pieces = explode("/", $url);
        $url = $url.$url_pieces[5];
        $date = $row['date'];

        // 미리보기 내용 생성
        $file = fopen("{$url}","r") or die("파일을 열 수 없습니다.");
        $text = '';
        // 파일 내용 출력
        while( !feof($file) ) {
            $text =  $text.fgets($file);
        }
        fclose($file);

        $list = $list." <div class='contents'>
                            <img src='data/sample.png' class='rounded' alt='...'>
                            <span class='contents-title'>{$url_pieces[5]}</span>
                            <hr class='title-division'>
                            <span class='contents-body'>{$text}</span>
                            <div id='contents-buttons' class='btn-group'>
                                <div>
                                    <button class='btn btn-sm btn-outline-light'>View</button>
                                    <button class='btn btn-sm btn-outline-light'>Edit</button>
                                </div>
                                <div class='contents-date'>
                                    {$date}
                                </div>
                            </div>
                        </div>";
    }

    
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="scss/dist/custom.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
    </script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="index.js"></script>
</head>

<body>
    <div id="wrap-body">
        <?php
            echo $navbar;
        ?>
        <div class="album">
            <div class="banner col-12 row">
                <img src="data/banner 01.jpg" class="rounded" alt="...">
                <hr>
                <span class="banner-body">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis maiores
                    nihil voluptate
                    repudiandae, excepturi debitis saepe blanditiis est temporibus sequi architecto iste quibusdam rem
                    veritatis in velit recusandae nemo aspernatur!</span>
                <hr>
            </div>
            <div class="container col-10">
                <?= $list ?>
            </div>
            <div id="list-example" class="list-group col-2">
                <a class="list-group-item list-group-item-action" href="index.php">전체 글 보기</a>
                <a class="list-group-item list-group-item-action" href="written.php">나의 글 보기</a>
                <a class="list-group-item list-group-item-action" href="writting.php">새 글 작성</a>
                <a class="list-group-item list-group-item-action" href="#list-item-4">Item 4</a>
            </div>
        </div>
    </div>
</body>

</html>