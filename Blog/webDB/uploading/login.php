<?php
$email = $_POST['email'];
$passwd = $_POST['passwd'];
if(empty($_POST['email']) || empty($_POST['passwd'])){
    echo "<script> alert('정확한 정보를 입력하세요'); 
    document.location.href='index.php'; </script>";
    exit;
} 

$conn = mysqli_connect('localhost','normalUser','normalUser11!!','blogdb');

$sql = "SELECT * FROM user where email like '".$_POST['email']."'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$password_hash = hash("sha256", $_POST['passwd']);

if($row['email'] == $_POST['email'] && $row['passwd'] == $password_hash){
    echo '로그인 성공!';
    session_start();
    $_SESSION['email'] = $email;
    echo "<script> document.location.href='index.php'; </script>";
}else{
    echo '로그인 실패!';
    echo "<script> alert('로그인 실패'); 
    document.location.href='index.php'; </script>";
}

?>