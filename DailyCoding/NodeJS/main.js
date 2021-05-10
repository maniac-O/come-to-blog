let http = require('http');
let fs = require('fs');
//let url = require('url');

let app = http.createServer(function (request, response) {
    let _url = request.url;
    let queryData = new URL('http://127.0.0.1:8080' + _url);
    let pathname = queryData.pathname;
    let title = queryData.searchParams.get('id');

    if (pathname === '/') {
        fs.readdir('./data', (err, filelist) => {
            if (err) console.log('err!!');
            let template = '';
            let description = '';

            // ul태그 안 list를 동적으로 만드는 동작
            let list = `<ul>`;
            for (let i = 0; i < filelist.length; i++) {
                list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            }
            list += `</ul>`;

            function rendering(title, list, body) {
                template = `<!doctype html>
                <html>
                <head>
                  <title>Node.JS - ${title}</title>
                  <meta charset="utf-8">
                </head>
                <body>
                  <h1><a href="/">WEB</a></h1>
                  ${list}
                  ${body}
                </body>
                </html>
              `;
                response.writeHead(200);
                response.end(template);
            }

            // ul태그 아래 title과 본문내용 변경
            if (title == undefined) {
                title = 'Welcome';
                description = 'Welcome!!!';
                rendering(title, list, `<h2>${title}</h2>${description}`);
            } else if (title) {
                fs.readFile(`./data/${title}`, 'utf-8', (err, data) => {
                    description = data;
                    rendering(title, list, `<h2>${title}</h2>${description}`);
                });
            }
        });
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(8080);

// cd E:\web\come-to-blog\DailyCoding\NodeJS
// nodemon main.js
// pm2 start .\main.js
