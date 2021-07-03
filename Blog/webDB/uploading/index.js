$(document).ready(function () {
    let not_same_pw = document.querySelector('#not-same-pw');
    let InputPasswd1 = document.querySelector('#InputPassword1');
    let InputPasswd2 = document.querySelector('#InputPassword2');

    not_same_pw.style.display = 'none';
    InputPasswd2.addEventListener('change', () => {
        let btn = document.getElementById('signUp');
        if (InputPasswd1.value != InputPasswd2.value) {
            not_same_pw.style.display = 'block';
            btn.disabled = 'true';
        } else {
            not_same_pw.style.display = 'none';
            btn.disabled = false;
        }
    });
});
