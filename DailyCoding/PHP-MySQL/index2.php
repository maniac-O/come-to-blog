<?php
$conn = mysqli_connect('localhost','root','root','opentutorials');
$sql = "SELECT * FROM topic";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);
    $list = '';
    while($row = mysqli_fetch_array($result)){
        $list = $list."<li><a href=\"index2.php?id={$row['id']}\">{$row['title']}</a></li>";
    }

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

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">ㄴ
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1><a href="index2.php">WEB</a></h1>
    <a href="author2.php">author</a>
    <ol>
        <?= $list ?>
    </ol>
    <p><a href="create2.php">create</a></p>
    <?=$update_link?>
    <?=$delete_link?>
    <h2><?=$article['title']?></h2>
    <?=$author?>
</body>
</html>

