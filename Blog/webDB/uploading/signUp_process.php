<?php
//여기서도 검사해서 다시 리다이렉션 / POST로 signUp한테 다시 값 넘겨서 말풍선 띄우기? 말풍선 어캐띄우냐
    $sql = "INSERT INTO user(email, passwd, signUpdate)";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);
    print_r($row);

?>