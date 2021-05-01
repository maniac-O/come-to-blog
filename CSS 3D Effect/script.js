(() => {
    const houseElem = document.querySelector('.house');
    const barElem = document.querySelector('.progress__bar');
    const stageElem = document.querySelector('.stage');
    let maxScrollValue = document.body.offsetHeight - window.innerHeight;

    function scrollHandler() {
        const scrollPer = this.pageYOffset / maxScrollValue;
        const zMove = scrollPer * 950 - 500;

        houseElem.style.transform = `translateZ( ${zMove}vw)`;
        barElem.style.width = scrollPer * 100 + '%';
    }

    function resizeHandler() {
        maxScrollValue = document.body.offsetHeight - this.window.innerHeight;
    }

    function mousemoveHandler(e) {
        const mousePos = { x: 0, y: 0 };
        mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
        mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
        stageElem.style.transform = `rotateY( ${mousePos.x * 5}deg) 
        rotateX( ${mousePos.y * 5}deg)`;
    }

    function Character(info) {
        this.mainElem = document.createElement('div');
        this.mainElem.classList.add('char');
        this.mainElem.innerHTML = `
        <div class="char running">
            <div class="char__con char__head" data-direction="backward">
                <div class="char__face char__head-face face-front"></div>
                <div class="char__face char__head-face face-back"></div>
            </div>
            <div class="char__con char__torso "data-direction="backward">
                <div class="char__face char__torso-face face-front"></div>
                <div class="char__face char__torso-face face-back"></div>
            </div>
            <div class="char__con char__arm char__armRight">
                <div class="char__face char__arm-face face-front"></div>
                <div class="char__face char__arm-face face-back"></div>
            </div>
            <div class="char__con char__arm char__armLeft">
                <div class="char__face char__arm-face face-front"></div>
                <div class="char__face char__arm-face face-back"></div>
            </div>
            <div class="char__con char__leg char__legRight">
                <div class="char__face char__leg-face face-front"></div>
                <div class="char__face char__leg-face face-back"></div>
            </div>
            <div class="char__con char__leg char__legLeft">
                <div class="char__face char__leg-face face-front"></div>
                <div class="char__face char__leg-face face-back"></div>
            </div>
        </div>`;
        this.mainElem.style.left = info.xPos + '%';
        document.querySelector('.stage').appendChild(this.mainElem);
    }

    stageElem.addEventListener('click', (e) => {
        new Character({
            xPos: (e.clientX / window.innerWidth) * 100,
        });
    });

    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);
    window.addEventListener('mousemove', mousemoveHandler);
})();
