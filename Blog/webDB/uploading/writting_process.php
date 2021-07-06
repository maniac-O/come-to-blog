<?php
if(empty($_POST['title']) || empty($_POST['text'])){
    echo "<script> alert('글 작성 실패'); 
    document.location.href='written.php'; </script>";
    exit;
}
session_start();
$title = $_POST['title'];
$text = $_POST['text'];
$email = $_SESSION['email'];
$date = date('Y-d-m_H-i-s', time()); 

$upload_dir = "E:/web/written/{$email}/{$date}/";
if(!is_dir($upload_dir)){
    mkdir($upload_dir);
}
$upload_dir = "E:/web/written/{$email}/{$date}/{$title}/";
if(!is_dir($upload_dir)){
    mkdir($upload_dir);
}

$conn = mysqli_connect('localhost','normalUser','normalUser11!!','blogdb');
$sql = "select uid from user where email like '{$email}'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_array($result);
$uid = $row['uid'];

$date = date('Y-d-m H:i:s', time()); 
$sql = "INSERT INTO written(uid, url, date) VALUES({$uid}, '{$upload_dir}', '{$date}')";
$result = mysqli_query($conn, $sql);

$url = $upload_dir.$title;
$file = fopen("{$url}","w");
fwrite($file,$text);
fclose($file);

if($result){
    echo "<script> alert('업로드 성공!'); 
    document.location.href='written.php'; </script>";
}else{
    echo "<script> alert('업로드 실패!'); 
    document.location.href='written.php'; </script>";
}
?>