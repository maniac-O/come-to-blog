<?php
require('print.php');
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
    <?php
    print_title();
    ?></title>
</head>
<body>
    <h1><a href="index.php">WEB</a></h1>
    <ol>
        <?php
            print_list();
        ?>
    </ol>
    <a href="update.php">update</a>
    <form action="update_process.php" method="post">
        <input type="hidden" name="old_title" value="<?=$_GET['id']?>">
        <p><input type="text" name="title" value="<?php print_title(); ?>"></p>
        <p><textarea name="description" id="" cols="30" rows="10">
            <?php print_description(); ?>
        </textarea></p>
        <p><input type="submit"></p>
    </form>
    <h2>
        <?php
            print_title();
        ?>
    </h2>
    <?php
        print_description();
    ?>
</body>
</html>

