<?php
$conn = mysqli_connect('localhost','root','root','opentutorials');


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
    <p><a href="index2.php">topic</a></p>
    <table border="1">
    <tr>
        <td>id</td>
        <td>name</td>
        <td>profile</td>
        <td></td>
        <?php
        $sql = "SELECT * FROM author";
        $result = mysqli_query($conn,$sql);
        while($row = mysqli_fetch_array($result)){
            $filtered = array(
                'id' => htmlspecialchars($row['id']),
                'name' => htmlspecialchars($row['name']),
                'profile' => htmlspecialchars($row['profile'])
            );
            ?>
            <tr>
                <td><?=$filtered['id']?></td>
                <td><?=$filtered['name']?></td>
                <td><?=$filtered['profile']?></td>
                <td><a href="author2.php?id=<?=$filtered['id']?>">update</a></td>
            </tr>
            <?php
        }
        ?>
    </tr>
    </table>
    <?php
    $escaped = array(
        'name'=>'',
        'profile' =>''
    );
    $label_submit = 'Create author';
    $form_action = "update2_author_process.php";
    $form_id = '';
    if(isset($_GET['id'])){
        $filtered_id = mysqli_real_escape_string($conn, $_GET['id']);
        settype($filtered_id,'integer');
        $sql = "SELECT * FROM author WHERE id = {$filtered_id}";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_array($result);
        $escaped['name'] = htmlspecialchars($row['name']);
        $escaped['profile'] = htmlspecialchars($row['profile']);
        $label_submit = 'Update author';
        $form_action = 'update2_author_process.php';
        $form_id = '<input type="hidden" name="id" value="'.$_GET['id'].'">';
        print_r ($result);
    }
    ?>
    <form action="<?=$form_action?>" method="post">
        <?=$form_id?>
        <p><input type="text" name="name" placeholder="name" value="<?=$escaped['name']?>"></p>
        <p><textarea name="profile" id="" cols="20" placeholder="profile"><?=$escaped['profile']?></textarea></p>
        <p><input type="submit" value="<?=$label_submit?>"></p>
    </form>
</body>
</html>

