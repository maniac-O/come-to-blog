<?php
if(empty($_POST['title']) || empty($_POST['text'])){
    echo "<script> alert('글 작성 실패'); 
    document.location.href='index.php?written'; </script>";
    exit;
}
session_start();

$conn = mysqli_connect('localhost','normalUser','normalUser11!!','blogdb');
$sql = "select max(wid) from written";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_array($result);
$wid = $row['max(wid)'];
// 다음 index 번호
$wid = $wid + 1;

// 포스팅의 내용을 업로드하기 위한 준비
$title = $_POST['title'];
$text = $_POST['text'];
$email = $_SESSION['email'];
$date = date('Y-d-m_H-i-s', time()); 

// 파일을 생성할 디렉토리 생성
$upload_dir = "E:/web/written/{$email}/{$date}/";
if(!is_dir($upload_dir)){
    mkdir($upload_dir);
}
$upload_dir = "E:/web/written/{$email}/{$date}/{$wid}/";
if(!is_dir($upload_dir)){
    mkdir($upload_dir);
}

$sql = "select uid from user where email like '{$email}'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_array($result);
$uid = $row['uid'];
$upload_dir_toDB = "E:/web/written/{$email}/{$date}/{$wid}/".$title;

$date = date('Y-d-m H:i:s', time()); 
$sql = "INSERT INTO written(uid, url, date) VALUES({$uid}, '{$upload_dir_toDB}', '{$date}')";
$result = mysqli_query($conn, $sql);

$url = $upload_dir_toDB;
$file = fopen("{$url}","w");
fwrite($file,$text);
fclose($file);



if($_FILES['thumbnail']['size']!=0){
	// 썸내일 이미지를 업로드 하기 위한 준비
	$allowed_ext = array('jpg','jpeg','png','gif');

	// 변수 정리
	$error = $_FILES['thumbnail']['error'];
	$name = $_FILES['thumbnail']['name'];
	$ext = explode('.', $name);
	$ext = array_pop($ext);
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
	}

	// 확장자 확인
	if( !in_array($ext, $allowed_ext) ) {
		echo "<script> alert('허용되지 않는 확장자입니다.'); 
		document.location.href='index.php?written'; </script>";
	}

	// 파일 이동
	move_uploaded_file( $_FILES['thumbnail']['tmp_name'], "$upload_dir/$name");
}

if($result){
    echo "<script> alert('업로드 성공!'); 
    document.location.href='index.php?written'; </script>";
}else{
    echo "<script> alert('업로드 실패!'); 
    document.location.href='index.php?written'; </script>";
}

?>