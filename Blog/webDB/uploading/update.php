<?php
session_start();
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
    echo "로그인 중입니다.";
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
    <script type="text/javascript" src="index.js"></script>
</head>

<body>
    <div class="wrap-main">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
                <a class="navbar-brand" href="index.php">Community</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                        </li>
                        <li>
                            <form class="d-flex">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                                <button class="btn btn-outline-light" name="check-nickname" type="submit">Search</button>
                            </form>
                        </li>
                    </ul>
                    <div class="btn-group nav-btns">
                        <?=$loginButton?>
                        <div class="dropdown-menu">
                        <!-- 로그인 버튼 -->
                            <form action="login.php" method="post" class="px-4 py-3">
                                <div class="mb-3">
                                    <label for="exampleDropdownFormEmail1" class="form-label">Email address</label>
                                    <input name="email" type="email" class="form-control" id="exampleDropdownFormEmail1"
                                        placeholder="email@example.com">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleDropdownFormPassword1" class="form-label">Password</label>
                                    <input name="passwd" type="password" class="form-control" id="exampleDropdownFormPassword1"
                                        placeholder="Password">
                                </div>
                                <div class="mb-3">
                                    <div class="form-check">
                                        <input type="checkbox" class="form-check-input" id="dropdownCheck">
                                        <label class="form-check-label" for="dropdownCheck">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary">Sign in</button>
                            </form>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="signUp.php">New around here? Sign up</a>
                            <a class="dropdown-item" href="#">Forgot password?</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
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