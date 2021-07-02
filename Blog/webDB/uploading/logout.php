<?php
session_start();
if(isset($_SESSION['email'])){
    session_destroy();
    echo "<script> document.location.href='index.php'; </script>";
}

?>