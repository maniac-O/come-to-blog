$(document).ready(() => {
    // 회원가입 시 : 비밀번호, 비밀번호 확인에 입력된 값이 모두 다를 때 동작한다.
    // 값이 서로 같으면 정상작동
    // 값이 다르다면 경고문이 출력되고, submit 버튼이 비활성화 된다.

    let not_same_pw = document.querySelector('#not-same-pw');
    let InputPasswd1 = document.querySelector('#InputPassword1');
    let InputPasswd2 = document.querySelector('#InputPassword2');
    let btn = document.getElementById('signUp');
    let focus_status = 0;

    not_same_pw.style.display = 'none';
    InputPasswd2.addEventListener('focusout', () => {
        console.log(InputPasswd1.value, InputPasswd2.value);
        if (InputPasswd1.value != InputPasswd2.value) {
            not_same_pw.style.display = 'block';
            btn.disabled = 'true';
            focus_status = 1;
        } else {
            not_same_pw.style.display = 'none';
            btn.disabled = false;
        }
    });

    InputPasswd1.addEventListener('focusout', () => {
        if (focus_status == 1 && InputPasswd1.value != InputPasswd2.value) {
            not_same_pw.style.display = 'block';
            btn.disabled = 'true';
        } else {
            not_same_pw.style.display = 'none';
            btn.disabled = false;
        }
    });
});
