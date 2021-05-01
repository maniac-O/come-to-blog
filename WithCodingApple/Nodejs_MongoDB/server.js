// 설치한 라이브러리를 첨부해주세요
const express = require('express');
// 라이브버리 객체 만들어주세요
const app = express();

app.listen(8080, () => {
    console.log('Listening on 8080');
});

// 누군가가 /pet으로 방문을 하면
// pet과 관련된 안내문을 띄워주자

// '/'는 홈로케이션을 뜻하고
// __dirname은 서버의 로케이션을 보여줌
app.get('/', (요청, 응답) => {
    응답.sendFile(__dirname + '/index.html');
});
