'use strict';
$(document).ready(() => {
    class conMake {
        // 생성자 함수 makeConObject에서 new로 만들때 호출됨
        constructor(cloth, color, gender, size) {
            this.cloth = cloth;
            this.color = color;
            this.gender = gender;
            this.size = size;
        }

        // 인자 랜덤 생성 함수
        makeFactor() {
            let clothArray = [
                '<i class="fas fa-bread-slice"></i>',
                '<i class="fas fa-drumstick-bite"></i>',
                '<i class="fas fa-stroopwafel"></i>',
            ];
            let colorArray = ['blue', 'yellow', 'pink'];
            let genderArray = ['male', 'female'];
            let sizeArray = ['small size', 'medium size', 'large size'];

            // 랜덤으로 반환시켜줌
            return {
                cloth: clothArray[Math.floor(Math.random() * 3)],
                color: colorArray[Math.floor(Math.random() * 3)],
                gender: genderArray[Math.floor(Math.random() * 2)],
                size: sizeArray[Math.floor(Math.random() * 3)],
            };
        }

        // new로 Object를 모은 배열 생성
        makeConObject(info) {
            return new conMake(info.cloth, info.color, info.gender, info.size);
        }

        // 태그 생성
        makeContent(i) {
            // contents div 만들기
            contents.innerHTML += `<div class="con">${contentsArray[i].cloth}  ${contentsArray[i].gender}, ${contentsArray[i].size}</div>`;

            // 금방 만든 contents div icon 받기
            let current = document.querySelector(
                `.contents div:nth-of-type(${i + 1}) i`
            );

            // 해당 contents div icon 색상변경
            current.style.color = contentsArray[i].color;
        }
    }

    class sortIt {
        sortBy(who, contentsArray, cons) {
            let cnt = 0;

            contentsArray.filter((contentsArray) => {
                // 1번 버튼 작동
                if (
                    contentsArray.cloth ==
                        '<i class="fas fa-bread-slice"></i>' &&
                    who == 'button1'
                ) {
                    cons[cnt].style.display = 'block';
                }

                // 2번 버튼 작동
                else if (
                    contentsArray.cloth ==
                        '<i class="fas fa-drumstick-bite"></i>' &&
                    who == 'button2'
                ) {
                    cons[cnt].style.display = 'block';
                }

                // 3번버튼 작동
                else if (
                    contentsArray.cloth ==
                        '<i class="fas fa-stroopwafel"></i>' &&
                    who == 'button3'
                ) {
                    cons[cnt].style.display = 'block';
                }

                // 4번 버튼 작동
                else if (contentsArray.color == 'blue' && who == 'button4') {
                    cons[cnt].style.display = 'block';
                }

                // 5번 버튼 작동
                else if (contentsArray.color == 'yellow' && who == 'button5') {
                    cons[cnt].style.display = 'block';
                }

                // 6번 버튼 작동
                else if (contentsArray.color == 'pink' && who == 'button6') {
                    cons[cnt].style.display = 'block';
                }

                // 나머지는 보이지않게 처리
                else {
                    cons[cnt].style.display = 'none';
                }
                cnt++;
            });
        }
    }

    const conmake = new conMake();
    const sortit = new sortIt();
    const buttons = document.querySelectorAll('.nav ul li');
    let contentsArray = [];
    let contents = document.querySelector('.contents');

    for (let i = 0; i < 20; i++) {
        contentsArray[i] = conmake.makeConObject(conmake.makeFactor());
        conmake.makeContent(i);
    }

    Array.prototype.forEach.call(buttons, (e) => {
        e.addEventListener('click', () => {
            sortit.sortBy(
                e.id,
                contentsArray,
                document.querySelectorAll('.con')
            );
        });
    });
});
