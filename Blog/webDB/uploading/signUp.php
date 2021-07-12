<?php
require_once('lib/navbar.php');
$navbar = print_nav(null);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="scss/dist/custom.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
    </script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="signUp.js"></script>
</head>
<body>    
    <?php
        echo $navbar;
    ?>
    <div class="signUp">
        <form action="signUp_process.php" method="post">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Your name</label>
                <input name="nickname" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input name="passwd" type="password" class="form-control" id="InputPassword1">
                <div id="emailHelp" class="form-text">Passwords must be at least 6 characters.</div>
            </div>
            <div class="mb-3">
                <div class="re_passwd">
                    <label for="exampleInputPassword1" class="form-label">Re-enter password</label>
                    <div class="toast-container">
                        <div class="toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true" id="not-same-pw">
                            <div class="d-flex">
                                <div class="toast-body">
                                    입력한 비밀번호가 다릅니다!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <input name="re_passwd" type="password" class="form-control" id="InputPassword2">
            </div>
            <button type="submit" class="btn btn-primary" id="signUp">Submit</button>
            <div class="mb-3 form-check">
                <span>By creating an account, you agree to Community's Conditions of Use and Privacy Notice.</span>
            </div>
            <div class="mb-3 form-check">
                <span>Already have an account? Sign-In </span>
            </div>
        </form>
    </div>
</body>
</html>