<?php
// 회원가입 프로세싱
if(empty($_POST['email']) || empty($_POST['nickname']) || empty($_POST['passwd'])){
    echo "<script> alert('회원가입 실패'); 
    document.location.href='signUp.php'; </script>";
    exit;
}
$email = $_POST['email'];
$passwd = $_POST['passwd'];
$nickname = $_POST['nickname'];

$date = date('Y-d-m', time()); 

$password_hash = hash("sha256", $passwd);

$conn = mysqli_connect('localhost','normalUser','normalUser11!!','blogdb');
$sql = "INSERT INTO user(email, passwd, signUpdate, nickname) VALUES('{$email}', '{$password_hash}', '{$date}' ,'{$nickname}')";
$result = mysqli_query($conn, $sql);

if(empty($result)){
    echo "<script> alert('중복된 이메일 또는 닉네임 입니다.'); 
        document.location.href='index.php'; </script>";
    exit;
}

$upload_dir = "E:/web/written/{$email}/";
if(!is_dir($upload_dir)){
    mkdir($upload_dir);
}

echo "<script> alert('환영합니다 {$nickname} 님'); 
document.location.href='index.php'; </script>";
?>