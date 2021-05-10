const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const app = http.createServer(function (request, response) {
    let _url = request.url;
    let queryData = new URL('http://127.0.0.1:8080' + _url);
    let pathname = queryData.pathname;
    let title = queryData.searchParams.get('id');
    let template = '';

    function rendering(title, list, body, control) {
        template = `<!doctype html>
        <html>
        <head>
            <title>Node.JS - ${title}</title>
            <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">WEB</a></h1>
            ${list}
            ${control}
            ${body}
        </body>
        </html>
        `;
    }

    function rendList(filelist) {
        this.filelist = filelist;
        let list = `<ul>`;
        for (let i = 0; i < this.filelist.length; i++) {
            list += `<li><a href="/?id=${this.filelist[i]}">${this.filelist[i]}</a></li>`;
        }
        list += `</ul>`;
        return list;
    }

    if (pathname === '/') {
        fs.readdir('./data', (err, filelist) => {
            if (err) console.log('err!!');

            let description = '';

            // ul태그 안 list를 동적으로 만드는 동작
            let list = rendList(filelist);

            // ul태그 아래 title과 본문내용 변경
            if (title == undefined) {
                title = 'Welcome';
                description = 'Welcome!!!';
                rendering(
                    title,
                    list,
                    `<h2>${title}</h2>${description}`,
                    `<a href="/create">create</a>`
                );
                response.writeHead(200);
                response.end(template);
            } else if (title) {
                fs.readFile(`./data/${title}`, 'utf-8', (err, data) => {
                    description = data;
                    rendering(
                        title,
                        list,
                        `<h2>${title}</h2>${description}`,
                        `<a href="/create">create</a> 
                        <a href="/update?id=${title}">update</a>
                        <form action="/delete_process" method="post" onsubmit="checkToSubmit">
                            <input type="hidden" name="id" value="${title}">
                            <input type="submit" value="delete">
                        </form>`
                    );
                    response.writeHead(200);
                    response.end(template);
                });
            }
        });
    } else if (pathname === '/create') {
        fs.readdir('./data', (err, filelist) => {
            if (err) console.log('err!!');

            title = 'NODE.JS - create';
            let list = rendList(filelist);
            let description = `<form action="/create_process" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                <p><textarea name="description" id="" cols="30" rows="10" placeholder="description"></textarea></p>
                <p><input type="submit"></p>
            </form>`;

            rendering(title, list, description, `<a href="/create">create</a>`);

            response.writeHead(200);
            response.end(template);
        });
    } else if (pathname === '/create_process') {
        let body = '';
        request.on('data', (data) => {
            body += data;
        });
        request.on('end', () => {
            let post = qs.parse(body);

            title = post.title;
            let description = post.description;

            fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
                if (err) throw err;

                response.writeHead(302, { Location: `/?id=${title}` });
                response.end();
            });
        });
    } else if (pathname === '/update') {
        let list;
        fs.readdir('./data', (err, filelist) => {
            list = rendList(filelist);
        });

        fs.readFile(`./data/${title}`, 'utf-8', (err, data) => {
            description = data;
            rendering(
                title,
                list,
                `<form action="/update_process" method="post">
                    <input type="hidden" name="id" value="${title}">
                    <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                    <p><textarea name="description" id="" cols="30" rows="10" placeholder="description">${description}</textarea></p>
                    <p><input type="submit"></p>
                </form>`,
                `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
            );
            response.writeHead(200);
            response.end(template);
        });
    } else if (pathname === '/update_process') {
        let body = '';
        request.on('data', (data) => {
            body += data;
        });
        request.on('end', () => {
            let post = qs.parse(body);

            let id = post.id;
            title = post.title;
            let description = post.description;

            // 파일명 바꾸기
            fs.rename(`data/${id}`, `data/${title}`, (err) => {
                if (err) console.log('rename error');

                //파일 내용 바꾸기
                fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
                    if (err) throw err;

                    response.writeHead(302, { Location: `/?id=${title}` });
                    response.end();
                });
            });
        });
    } else if (pathname === '/delete_process') {
        let body = '';
        request.on('data', (data) => {
            body += data;
        });
        request.on('end', () => {
            let post = qs.parse(body);
            let id = post.id;

            // 파일 삭제 기능
            fs.unlink(`data/${id}`, (err) => {
                response.writeHead(302, { Location: `/` });
                response.end();
            });
        });
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(8080);

// cd E:\web\come-to-blog\DailyCoding\NodeJSS
// nodemon main.js
// pm2 start .\main.js
