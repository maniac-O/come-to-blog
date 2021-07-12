$(document).ready(() => {
    let not_same_pw = document.querySelector('#not-same-pw');
    let InputPasswd1 = document.querySelector('#InputPassword1');
    let InputPasswd2 = document.querySelector('#InputPassword2');
    let btn = document.getElementById('signUp');
    let focus_status = 0;

    not_same_pw.style.opacity = '0';
    InputPasswd2.addEventListener('focusout', () => {
        console.log(InputPasswd1.value, InputPasswd2.value);
        if (InputPasswd1.value != InputPasswd2.value) {
            not_same_pw.style.opacity = '1';
            btn.disabled = 'true';
            focus_status = 1;
        } else {
            not_same_pw.style.opacity = '0';
            btn.disabled = false;
        }
    });

    InputPasswd1.addEventListener('focusout', () => {
        if (focus_status == 1 && InputPasswd1.value != InputPasswd2.value) {
            not_same_pw.style.opacity = '1';
            btn.disabled = 'true';
        } else {
            not_same_pw.style.opacity = '0';
            btn.disabled = false;
        }
    });
});
