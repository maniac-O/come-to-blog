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
    $navbar = print_nav($loginButton);
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
    <?php
        echo $navbar;
    ?>
        <div class="wrap-form">
            <form action="writting_process.php" method="post" enctype='multipart/form-data' class="d-flex" id="writting-form">
                <div class="form-floating">
                    <textarea name="title" class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                    <label for="floatingTextarea">제목 작성</label>
                </div>
                <div class="form-floating">
                    <textarea name="text" class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"></textarea>
                    <label for="floatingTextarea2">본문 작성</label>
                </div>
                <div class="mb-3">
                    <label for="formFile" class="form-label"><span class="upload-thumbnail-label">Upload Thumbnail</span><span class="upload-extends-label">jpg, jpeg, png, gif extends only</span></label>
                    <input class="form-control" type="file" id="formFile" name="thumbnail">
                </div>
                <button class="btn btn-primary" name="check-nickname" type="submit">submit</button>
            </form>
        </div>
    </div>
</body>

</html>