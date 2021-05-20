<?php
$conn = mysqli_connect('localhost','root','root','opentutorials');
$sql = "SELECT * FROM topic";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);
    $list = '';
    while($row = mysqli_fetch_array($result)){
        $list = $list."<li><a href=\"index2.php?id={$row['id']}\">{$row['title']}</a></li>";
    }

$sql = "SELECT * FROM author";
$result = mysqli_query($conn,$sql);
$select_form = '<select name="author_id">';
while($row = mysqli_fetch_array($result)){
    $select_form .= '<option value="'.$row['id'].'">'.$row['name'].'</option>';
}
$select_form .= '</select>';
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
    <form action="create2_process.php" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p><textarea name="description" placeholder="description" cols="30" rows="10"></textarea></p>
        <?=$select_form?>
        <p><input type="submit"></p>  
    </form>
</body>
</html>

