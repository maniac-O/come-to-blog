const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'madang',
    password: 'madang',
    database: 'madang',
    port: '3306',
});
db.connect();

let Listlen;

const app = http.createServer(function (request, response) {
    let _url = request.url;
    let queryData = new URL('http://127.0.0.1:8080' + _url);
    let pathname = queryData.pathname;
    let title = queryData.searchParams.get('id');
    let template = '';

    function rendering(title, list, body, control) {
        return new Promise((resolve, reject) => {
            resolve(
                `<!doctype html>
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
        `
            );
        });
    }

    function rendList(filelist) {
        this.filelist = filelist;
        Listlen = this.filelist.length;
        let list = `<ul>`;
        for (let i = 0; i < this.filelist.length; i++) {
            list += `<li><a href="/?id=${this.filelist[i].bookid}">${this.filelist[i].bookname}</a></li>`;
        }
        list += `</ul>`;
        return list;
    }

    if (pathname === '/') {
        if (title == null) {
            db.query(`select * from book`, (err, topics) => {
                if (err) throw err;

                title = 'Welcome';
                let description = 'Welcome!!!';
                let list = rendList(topics);

                rendering(
                    title,
                    list,
                    `<h2>${title}</h2>${description}`,
                    `<a href="/create">create</a>`
                ).then((a) => {
                    response.writeHead(200).end(a);
                });
            });
        }

        if (title) {
            //console.log(typeof title);
            db.query(`select * from book`, (err, topics) => {
                if (err) throw err;

                title = queryData.searchParams.get('id');
                let queryTmp = db.query(
                    `select * from book where bookid=?`,
                    [title],
                    (err2, topic) => {
                        if (err2) throw err2;

                        title = topic[0].bookname;

                        let description = topic[0].publisher;
                        let list = rendList(topics);

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
                        ).then((a) => {
                            response.writeHead(200).end(a);
                        });
                    }
                );
                console.log(queryTmp);
            });
        }
    } else if (pathname === '/create') {
        db.query(`select * from book`, (err, topics) => {
            if (err) throw err;

            title = queryData.searchParams.get('id');
            db.query(
                `select * from book where bookid=?`,
                [title],
                (err2, topic) => {
                    if (err2) throw err2;

                    title = `Create`;
                    let list = rendList(topics);

                    rendering(
                        title,
                        list,
                        `<form action="/create_process" method="post">
                            <p><input type="text" name="title" placeholder="title"></p>
                            <p><textarea name="description" id="" cols="30" rows="10" placeholder="description"></textarea></p>
                            <p><input type="submit"></p>
                        </form>`,
                        `<a href="/create">create</a>`
                    ).then((a) => {
                        response.writeHead(200).end(a);
                    });
                }
            );
        });
    } else if (pathname === '/create_process') {
        let body = '';
        request.on('data', (data) => {
            body += data;
        });
        request.on('end', () => {
            let post = qs.parse(body);

            let description = sanitizeHtml(post.description);

            db.query(
                `INSERT INTO book(bookid,bookname,publisher,price) values(?,?,?,?)`,
                [Listlen + 1, post.title, description, 1],
                (err, result) => {
                    if (err) throw err;
                    else {
                        response.writeHead(302, {
                            Location: `/?id=${Listlen + 1}`,
                        });
                        response.end();
                    }
                }
            );
        });
    } else if (pathname === '/update') {
        let list;

        db.query(`select * from book`, (err, topics) => {
            if (err) throw err;

            title = queryData.searchParams.get('id');
            db.query(
                `select * from book where bookid=?`,
                [title],
                (err2, topic) => {
                    if (err2) throw err2;

                    title = `Create`;
                    let list = rendList(topics);

                    rendering(
                        title,
                        list,
                        `<form action="/update_process" method="post">
                            <p><input type="text" name="title" placeholder="title"></p>
                            <p><textarea name="description" id="" cols="30" rows="10" placeholder="description"></textarea></p>
                            <p><input type="submit"></p>
                        </form>`,
                        `<a href="/create">create</a>`
                    ).then((a) => {
                        response.writeHead(200).end(a);
                    });
                }
            );
        });
    } else if (pathname === '/update_process') {
        let body = '';
        request.on('data', (data) => {
            console.log(data);
            body += data;
        });
        request.on('end', () => {
            let post = qs.parse(body);
            console.log(post);

            let id = post.id;
            title = post.title;
            let description = post.description;

            /*
            // 파일명 바꾸기
            fs.rename(`data/${id}`, `data/${title}`, (err) => {
                if (err) console.log('rename error');

                //파일 내용 바꾸기
                fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
                    if (err) throw err;

                    response.writeHead(302, { Location: `/?id=${title}` });
                    response.end();
                });
            });*/
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
                if (err) throw err;
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

// cd E:\web\come-to-blog\DailyCoding\NodeJS
// nodemon main.js
// pm2 start .\main.js
