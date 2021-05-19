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
    <a href="create.php">create</a>
    <form action="create_process.php" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p><textarea name="description" id="" cols="30" rows="10" placeholder="Description">
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

