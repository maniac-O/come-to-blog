<?php
session_start();
require_once('lib/navbar.php');
$conn = mysqli_connect('localhost','normalUser','normalUser11!!','blogdb');
if(!isset($_SESSION['email'])){
    $loginButton = '<button class="btn btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Login
                    </button>';
    $navbar = print_nav($loginButton);

}else{
    $loginButton = '
                <form action="logout.php" method="post" class="logoutButton">
                    <button class="btn btn-outline-light" type="submit">
                        Logout
                    </button>
                </form>';
    $navbar = print_nav($loginButton);

    $sql = "select * from written where wid = {$_POST['wid']} and uid = (select uid from user where email like '".$_SESSION['email']."');";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);

    if($row){
        echo "<style> #goto-Update {display:block !important; }</style>";
    }
}

$name = $_POST['wid'];
if($name){
    $sql = "SELECT * from user, written where user.uid = written.uid and wid = {$name};";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);
    
    $url = $row['url'];
    $url_pieces = explode("/", $url);

    $email = $row['nickname'];
    

    // 파일 내용 생성
    $file = fopen("{$url}","r") or die("파일을 열 수 없습니다.");
    $title = $url_pieces[6];
    $text = '';

    // 파일 내용 출력
    while( !feof($file) ) {
        $text =  $text.fgets($file);
    }
    fclose($file);
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
    <div class="wrap-main">
        <?php
            echo $navbar;
        ?>
        <div class="wrap-form">
            <form action="update.php" method="post" enctype='multipart/form-data' class="d-flex" id="writting-form">
                <div class="form-floating">
                    <div for="floatingTextarea" class="view-title">
                        <span>제목</span>
                        <span>작성자 : <?= $email ?></span>
                    </div>
                    <textarea name="title" class="form-control view-textarea" placeholder="Leave a comment here" id="floatingTextarea" readonly="readonly"><?= $title?></textarea>
                </div>
                <div class="form-floating">
                    <div for="floatingTextarea2">본문</div>
                    <textarea name="text" class="form-control view-textarea" placeholder="Leave a comment here" id="floatingTextarea2" readonly="readonly"><?= $text?></textarea>
                </div>
                <input type='hidden' name='wid' value='<?=$name?>'>
                <button class="btn btn-primary" name="check-nickname" type="submit" id="goto-Update">Update</button>
            </form>
        </div>
    </div>
</body>

</html>