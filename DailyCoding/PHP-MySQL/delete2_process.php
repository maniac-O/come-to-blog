<?php
$conn = mysqli_connect('localhost','root','root','opentutorials');

settype($_POST['id'], 'integer');
$filtered = array(
        'id'=> mysqli_real_escape_string($conn, $_POST['id']),
);

$sql = "DELETE FROM topic
        WHERE id = {$filtered['id']}";

$result = mysqli_query($conn,$sql);
if($result ===false){
    echo '저장하는 과정에서 문제가 생겼습니다, 관리자에게 문의하세요.';
    // apache2 에러로그에 기록됨 
    // C:\Bitnami\wampstack-8.0.6-0\apache2\logs\error.log 파일에 기록됨.
    error_log(mysqli_error($conn));
}else{
    echo '삭제에 성공했습니다. <a href="index2.php">돌아가기</a>';
}
?>

