<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<h1>WEB</h1>
    <ol>
        <li><a href="index.php?id=HTML">HTML</a></li>
        <li><a href="index.php?id=CSS">CSS</a></li>
        <li><a href="index.php?id=JavaScript">JavaScript</a></li>
    </ol>
    <h2>
        <?php
        $coworkers = array('A','B','C','D');
        echo $coworkers[0].'<br>';
        echo $coworkers[1].'<br>';
        echo count($coworkers).'<br>';

        array_push($coworkers,'E','F');
        echo $coworkers[4].'<br>';
        echo $coworkers[5].'<br>';

        
        var_dump($coworkers).'<br>';
        echo '<br>';
        print_r($coworkers).'<br>';
        echo '<br>';


        $html = scandir('./');
        print_r($html);
        ?>
    </h2>
</body> 
</html>