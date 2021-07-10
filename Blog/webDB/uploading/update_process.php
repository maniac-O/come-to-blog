<?php
if(empty($_POST['title']) || empty($_POST['text'])){
    echo "<script> alert('글 작성 실패'); 
    document.location.href='index.php?written'; </script>";
    exit;
}
session_start();

$conn = mysqli_connect('localhost','normalUser','normalUser11!!','blogdb');
$wid = $_POST['wid'];
$url = $_POST['url'];

// 포스팅의 내용을 업로드하기 위한 준비
$title = $url.'/'.$_POST['title'];
$text = $_POST['text'];
$old_title = $url.'/'.$_POST['old_title'];


$file = fopen("{$old_title}","a");
fclose($file);
unlink("{$old_title}");

$file = fopen("{$title}","w");
fwrite($file,$text);
fclose($file);


$sql = "update written set url = '{$title}' where wid = {$wid};";
echo $sql;
$result = mysqli_query($conn, $sql);


// 썸내일 이미지를 업로드 하기 위한 준비
$allowed_ext = array('jpg','jpeg','png','gif');

// 변수 정리
$error = $_FILES['thumbnail']['error'];
$name = $_FILES['thumbnail']['name'];
$ext = array_pop(explode('.', $name));
$name = $wid.'.png';
$upload_dir = './data';

// 오류 확인
if( $error != UPLOAD_ERR_OK ) {
	switch( $error ) {
		case UPLOAD_ERR_INI_SIZE:
		case UPLOAD_ERR_FORM_SIZE:
			echo "파일이 너무 큽니다. ($error)";
		case UPLOAD_ERR_NO_FILE:
			echo "파일이 첨부되지 않았습니다. ($error)";
		default:
			echo "파일이 제대로 업로드되지 않았습니다. ($error)";
	}
	exit;
}

// 확장자 확인
if( !in_array($ext, $allowed_ext) ) {
	echo "허용되지 않는 확장자입니다.";
	exit;
}

// 파일 이동
move_uploaded_file( $_FILES['thumbnail']['tmp_name'], "$upload_dir/$name");


echo "<script> alert('수정 성공!'); 
document.location.href='index.php?written'; </script>";


?>