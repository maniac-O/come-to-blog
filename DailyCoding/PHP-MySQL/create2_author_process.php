<?php
$conn = mysqli_connect('localhost','root','root','opentutorials');
print_r($_POST);
$filtered = array(
    'name'=> mysqli_real_escape_string($conn, $_POST['name']),
    'profile' => mysqli_real_escape_string($conn, $_POST['profile'])
);

$sql = "   
    INSERT INTO author (name,profile)
        VALUES(
            '{$filtered['name']}',
            '{$filtered['profile']}'
        )";

$result = mysqli_query($conn,$sql);
if($result ===false){
    echo '저장하는 과정에서 문제가 생겼습니다, 관리자에게 문의하세요.';
    // apache2 에러로그에 기록됨 
    // C:\Bitnami\wampstack-8.0.6-0\apache2\logs\error.log 파일에 기록됨.
    error_log(mysqli_error($conn));
}else{
    header('Location: author.php');
}
?>

