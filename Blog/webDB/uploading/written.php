<?php
session_start();
$conn = mysqli_connect('localhost','normalUser','normalUser11!!','blogdb');
if(!isset($_SESSION['email'])){
    echo "로그인 되지 않아있다.";
    $loginButton = '<button class="btn btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Login
                    </button>';
    echo "<script> document.location.href='index.php'; </script>";
}else{
    $loginButton = '
                <form action="logout.php" method="post" class="logoutButton">
                    <button class="btn btn-outline-light" type="submit">
                        Logout
                    </button>
                </form>';
    echo "로그인 중입니다.";
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

/*
while($row = mysqli_fetch_array($result)){
    
    print_r($row);
    $list = $list."<li><a href=\"index2.php?id={$row['uid']}\">{$row['email']}</a></li>";
}

echo $list;
/*
$conn = mysqli_connect('localhost','root','root','opentutorials');

$sql = "SELECT * FROM topic";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);
    $list = '';
    while($row = mysqli_fetch_array($result)){
        print_r($row);
        $list = $list."<li><a href=\"index2.php?id={$row['id']}\">{$row['title']}</a></li>";
    }
/*
$article = array('title'=>'Welcome',
    'description'=>'Hello, web');

$update_link = '';
$delete_link = '';
$author = '';
if(isset($_GET['id'])){
    $filtered_id = mysqli_real_escape_string($conn, $_GET['id']);
    $sql = "SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id={$filtered_id}";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);
    $article = array('title'=>$row['title'],
        'description'=>htmlspecialchars($row['description']),
        'name'=>htmlspecialchars($row['name']));

    $update_link = "<a href=\"update2.php?id={$_GET['id']}\">update</a>";
    $delete_link = "
        <form action='delete2_process.php' method='post'>
            <input type='hidden' name='id' value='{$_GET['id']}'>
            <input type='submit' value='delete'>
        </form>
    ";
    $author = "<p>by {$article['name']}</p>";
}
*/
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