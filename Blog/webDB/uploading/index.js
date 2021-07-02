$(document).ready(function () {
    let signUp = document.querySelector('#signUp');
    signUp.addEventListener('click', () => {
        let InputPasswd1 = document.querySelector('#InputPassword1');
        let InputPasswd2 = document.querySelector('#InputPassword2');
        if (InputPasswd1.value != InputPasswd2.value) {
            document.location.href = 'signUp.php';
            alert('회원가입 실패');
        }
    });
});
