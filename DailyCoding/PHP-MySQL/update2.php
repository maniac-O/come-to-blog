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
if(isset($_GET['id'])){
    $filtered_id = mysqli_real_escape_string($conn, $_GET['id']);
    $sql = "SELECT * FROM topic WHERE id={$filtered_id}";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);
    $article = array('title'=>$row['title'],
        'description'=>htmlspecialchars($row['description']));

    $update_link = "<a href=\"update2.php?id={$_GET['id']}\">update</a>";
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1><a href="index2.php">WEB</a></h1>
    <ol>
        <?= $list; ?>
    </ol>
    <form action="update2_process.php" method="post">
        <input type="hidden" name="id" value="<?=$_GET['id']?>">
        <p><input type="text" name="title" placeholder="title" value="<?=$article['title']?>"></p>
        <p><textarea name="description" placeholder="description" cols="30" rows="10"><?=$article['description']?></textarea></p>
        <p><input type="submit"></p>  
    </form>
</body>
</html>

