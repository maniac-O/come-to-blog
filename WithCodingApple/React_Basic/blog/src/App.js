import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    // [a, b] 형태로 Array가 남음
    // a = 값이 들어감
    // b = 해당 배열 state 정정해주는 함수
    let [글제목, 글제목변경] = useState({
        title1: '낙곱새 맛집 추천',
        title2: '햄버거 맛집 추천',
        title3: '타피오카 맛집 추천',
    });
    let [따봉, 따봉변경] = useState(0);

    function addDDabong() {
        따봉변경((따봉 += 1));
    }
    function pizza() {
        let newArray = { ...글제목 };
        newArray['title1'] = '피자 맛집 추천';
        글제목변경(newArray);
    }

    return (
        <div className="App">
            <div className="black-nav">
                <div>개발 Blog</div>
            </div>
            <button onClick={pizza}>버튼</button>
            <div className="list">
                <h3>
                    {글제목['title1']} <span onClick={addDDabong}>👍</span>{' '}
                    {따봉}
                </h3>
                <p>2월 17일 발행</p>
                <hr />
            </div>
            <div className="list">
                <h3> {글제목['title2']} </h3>
                <p>3월 12일 발행</p>
                <hr />
            </div>
            <div className="list">
                <h3> {글제목['title3']} </h3>
                <p>4월 21일 발행</p>
                <hr />
            </div>

            <Model />
        </div>
    );
}

function Model() {
    return (
        <div>
            <div>a</div>
            <div>b</div>
            <div>c</div>
        </div>
    );
}

export default App;
