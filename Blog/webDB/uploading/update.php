<?php
session_start();
require_once('lib/navbar.php');
$conn = mysqli_connect('localhost','normalUser','normalUser11!!','blogdb');
if(!isset($_SESSION['email'])){
    echo "<script> document.location.href='index.php'; </script>";
}else{
    $loginButton = '
                <form action="logout.php" method="post" class="logoutButton">
                    <button class="btn btn-outline-light" type="submit">
                        Logout
                    </button>
                </form>';
    $navbar = print_nav($loginButton,$_SESSION['nickname'].'님 반갑습니다!');
}

// 업데이트 하는 부분
$name = $_POST['wid'];
if($name){
    $sql = "SELECT * from written where wid = {$name};";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);
    
    $url = $row['url'];
    $url_pieces = explode("/", $url);
    
    // 미리보기 내용 생성
    // 업데이트 기능이기 때문에 원래 있던 데이터를 출력해준다.
    $file = fopen("{$url}","r") or die("파일을 열 수 없습니다.");
    $title = $url_pieces[6];
    $text = '';

    // 파일 내용 출력
    while( !feof($file) ) {
        $text =  $text.fgets($file);
    }
    fclose($file);
    
    array_pop($url_pieces);
    $url = implode('/', $url_pieces);
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
</head>

<body>
    <div class="wrap-main">
    <?php
        echo $navbar;
    ?>
        <div class="wrap-form">
            <form action="update_process.php" method="post" enctype='multipart/form-data' class="d-flex" id="writting-form">
                <div class="form-floating">
                    <textarea name="title" class="form-control" placeholder="Leave a comment here" id="floatingTextarea"><?= $title?></textarea>
                    <label for="floatingTextarea">제목 작성</label>
                </div>
                <div class="form-floating">
                    <textarea name="text" class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"><?= $text?></textarea>
                    <label for="floatingTextarea2">본문 작성</label>
                </div>
                <div class="mb-3">
                    <label for="formFile" class="form-label"><span class="upload-thumbnail-label">Upload Thumbnail</span><span class="upload-extends-label">jpg, jpeg, png, gif extends only</span></label>
                    <input class="form-control" type="file" id="formFile" name="thumbnail">
                </div>
                <input type='hidden' name='wid' value='<?=$name?>'>
                <input type='hidden' name='url' value='<?=$url?>'>
                <input type='hidden' name='old_title' value='<?=$title?>'>
                <button class="btn btn-primary" name="check-nickname" type="submit">submit</button>
            </form>
        </div>
    </div>
</body>

</html>