<?php
$conn = mysqli_connect('localhost','root','root','opentutorials');
print_r($_POST);
$filtered = array('title'=> mysqli_real_escape_string($conn, $_POST['title']),
        'description' => mysqli_real_escape_string($conn, $_POST['description']),
        'author_id' => mysqli_real_escape_string($conn, $_POST['author_id']),
);

$sql = "INSERT INTO topic(title, description, created, author_id)
        VALUES('{$_POST['title']}',
        '{$_POST['description']}',
        NOW(),
        {$filtered['author_id']})";

$result = mysqli_query($conn,$sql);
if($result ===false){
    echo '저장하는 과정에서 문제가 생겼습니다, 관리자에게 문의하세요.';
    // apache2 에러로그에 기록됨 
    // C:\Bitnami\wampstack-8.0.6-0\apache2\logs\error.log 파일에 기록됨.
    error_log(mysqli_error($conn));
}else{
    echo '성공적으로 업로드 되었습니다. <a href="index2.php">돌아가기</a>';
}
?>

