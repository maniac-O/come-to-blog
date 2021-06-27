<?php
$conn = mysqli_connect('localhost','normalUser','normalUser!!','opentutorials');

$sql = "SELECT * FROM topic";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);
    $list = '';
    while($row = mysqli_fetch_array($result)){
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
    <link rel="stylesheet" href="scss/dist/custom.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
    </script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="index.js"></script>
</head>

<body>
    <ol>
        a
        <?= $list ?>
    </ol>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
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
                            <button class="btn btn-outline-light" type="submit">Search</button>
                        </form>
                    </li>
                </ul>
                <div class="btn-group">
                    <button class="btn btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Login
                    </button>
                    <div class="dropdown-menu">
                        <form class="px-4 py-3">
                            <div class="mb-3">
                                <label for="exampleDropdownFormEmail1" class="form-label">Email address</label>
                                <input type="email" class="form-control" id="exampleDropdownFormEmail1"
                                    placeholder="email@example.com">
                            </div>
                            <div class="mb-3">
                                <label for="exampleDropdownFormPassword1" class="form-label">Password</label>
                                <input type="password" class="form-control" id="exampleDropdownFormPassword1"
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
                        <a class="dropdown-item" href="#">New around here? Sign up</a>
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
            <div class="contents">
                <img src="data/sample.png" class="rounded" alt="...">
                <span class="contents-body">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis maiores
                    nihil voluptate
                    repudiandae, excepturi debitis saepe blanditiis est temporibus sequi architecto iste quibusdam rem
                    veritatis in velit recusandae nemo aspernatur!</span>
                <div class="btn-group">
                    <button class="btn btn-sm btn-outline-secondary">View</button>
                    <button class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
            </div>
            <div class="contents">
                <img src="data/sample.png" class="rounded" alt="...">
                <span class="contents-body">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis maiores
                    nihil voluptate
                    repudiandae, excepturi debitis saepe blanditiis est temporibus sequi architecto iste quibusdam rem
                    veritatis in velit recusandae nemo aspernatur!</span>
                <div class="btn-group">
                    <button class="btn btn-sm btn-outline-secondary">View</button>
                    <button class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
            </div>
            <div class="contents">
                <img src="data/sample.png" class="rounded" alt="...">
                <span class="contents-body">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis maiores
                    nihil voluptate
                    repudiandae, excepturi debitis saepe blanditiis est temporibus sequi architecto iste quibusdam rem
                    veritatis in velit recusandae nemo aspernatur!</span>
                <div class="btn-group">
                    <button class="btn btn-sm btn-outline-secondary">View</button>
                    <button class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
            </div>
            <div class="contents">
                <img src="data/sample.png" class="rounded" alt="...">
                <span class="contents-body">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis maiores
                    nihil voluptate
                    repudiandae, excepturi debitis saepe blanditiis est temporibus sequi architecto iste quibusdam rem
                    veritatis in velit recusandae nemo aspernatur!</span>
                <div class="btn-group">
                    <button class="btn btn-sm btn-outline-secondary">View</button>
                    <button class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
            </div>
            <div class="contents">
                <img src="data/sample.png" class="rounded" alt="...">
                <span class="contents-body">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis maiores
                    nihil voluptate
                    repudiandae, excepturi debitis saepe blanditiis est temporibus sequi architecto iste quibusdam rem
                    veritatis in velit recusandae nemo aspernatur!</span>
                <div class="btn-group">
                    <button class="btn btn-sm btn-outline-secondary">View</button>
                    <button class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
            </div>
            <div class="contents">
                <img src="data/sample.png" class="rounded" alt="...">
                <span class="contents-body">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis maiores
                    nihil voluptate
                    repudiandae, excepturi debitis saepe blanditiis est temporibus sequi architecto iste quibusdam rem
                    veritatis in velit recusandae nemo aspernatur!</span>
                <div class="btn-group">
                    <button class="btn btn-sm btn-outline-secondary">View</button>
                    <button class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
            </div>
        </div>
        <div id="list-example" class="list-group col-2">
            <a class="list-group-item list-group-item-action" href="#list-item-1">Item 1</a>
            <a class="list-group-item list-group-item-action" href="#list-item-2">Item 2</a>
            <a class="list-group-item list-group-item-action" href="#list-item-3">Item 3</a>
            <a class="list-group-item list-group-item-action" href="#list-item-4">Item 4</a>
        </div>
    </div>
</body>

</html>