<?php
// 로그아웃 시도 시 프로세싱
session_start();
if(isset($_SESSION['email'])){
    session_destroy();
    echo "<script> document.location.href='index.php'; </script>";
}

?>