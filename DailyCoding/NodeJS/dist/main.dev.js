"use strict";

var http = require('http');

var fs = require('fs');

var qs = require('querystring');

var path = require('path');

var sanitizeHtml = require('sanitize-html');

var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'madang',
  password: 'madang',
  database: 'madang',
  port: '3306'
});
db.connect();
var Listlen;
var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = new URL('http://127.0.0.1:8080' + _url);
  var pathname = queryData.pathname;
  var title = queryData.searchParams.get('id');
  var template = '';

  function rendering(title, list, body, control) {
    return new Promise(function (resolve, reject) {
      resolve("<!doctype html>\n        <html>\n        <head>\n            <title>Node.JS - ".concat(title, "</title>\n            <meta charset=\"utf-8\">\n        </head>\n        <body>\n        <h1><a href=\"/\">WEB</a></h1>\n            ").concat(list, "  \n            ").concat(control, "\n            ").concat(body, "\n        </body>\n        </html>\n        "));
    });
  }

  function rendList(filelist) {
    this.filelist = filelist;
    Listlen = this.filelist.length;
    var list = "<ul>";

    for (var i = 0; i < this.filelist.length; i++) {
      list += "<li><a href=\"/?id=".concat(this.filelist[i].bookid, "\">").concat(this.filelist[i].bookname, "</a></li>");
    }

    list += "</ul>";
    return list;
  }

  if (pathname === '/') {
    if (title == null) {
      db.query("select * from book", function (err, topics) {
        if (err) throw err;
        title = 'Welcome';
        var description = 'Welcome!!!';
        var list = rendList(topics);
        rendering(title, list, "<h2>".concat(title, "</h2>").concat(description), "<a href=\"/create\">create</a>").then(function (a) {
          response.writeHead(200).end(a);
        });
      });
    }

    if (title) {
      //console.log(typeof title);
      db.query("select * from book", function (err, topics) {
        if (err) throw err;
        title = queryData.searchParams.get('id');
        var queryTmp = db.query("select * from book where bookid=?", [title], function (err2, topic) {
          if (err2) throw err2;
          title = topic[0].bookname;
          var description = topic[0].publisher;
          var list = rendList(topics);
          rendering(title, list, "<h2>".concat(title, "</h2>").concat(description), "<a href=\"/create\">create</a> \n                            <a href=\"/update?id=".concat(title, "\">update</a>\n                            <form action=\"/delete_process\" method=\"post\" onsubmit=\"checkToSubmit\">\n                                <input type=\"hidden\" name=\"id\" value=\"").concat(title, "\">\n                                <input type=\"submit\" value=\"delete\">\n                            </form>")).then(function (a) {
            response.writeHead(200).end(a);
          });
        });
        console.log(queryTmp);
      });
    }
  } else if (pathname === '/create') {
    db.query("select * from book", function (err, topics) {
      if (err) throw err;
      title = queryData.searchParams.get('id');
      db.query("select * from book where bookid=?", [title], function (err2, topic) {
        if (err2) throw err2;
        title = "Create";
        var list = rendList(topics);
        rendering(title, list, "<form action=\"/create_process\" method=\"post\">\n                            <p><input type=\"text\" name=\"title\" placeholder=\"title\"></p>\n                            <p><textarea name=\"description\" id=\"\" cols=\"30\" rows=\"10\" placeholder=\"description\"></textarea></p>\n                            <p><input type=\"submit\"></p>\n                        </form>", "<a href=\"/create\">create</a>").then(function (a) {
          response.writeHead(200).end(a);
        });
      });
    });
  } else if (pathname === '/create_process') {
    var body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      var post = qs.parse(body);
      var description = sanitizeHtml(post.description);
      db.query("INSERT INTO book(bookid,bookname,publisher,price) values(?,?,?,?)", [Listlen + 1, post.title, description, 1], function (err, result) {
        if (err) throw err;else {
          response.writeHead(302, {
            Location: "/?id=".concat(Listlen + 1)
          });
          response.end();
        }
      });
    });
  } else if (pathname === '/update') {
    var list;
    db.query("select * from book", function (err, topics) {
      if (err) throw err;
      title = queryData.searchParams.get('id');
      db.query("select * from book where bookid=?", [title], function (err2, topic) {
        if (err2) throw err2;
        title = "Create";
        var list = rendList(topics);
        rendering(title, list, "<form action=\"/update_process\" method=\"post\">\n                            <p><input type=\"text\" name=\"title\" placeholder=\"title\"></p>\n                            <p><textarea name=\"description\" id=\"\" cols=\"30\" rows=\"10\" placeholder=\"description\"></textarea></p>\n                            <p><input type=\"submit\"></p>\n                        </form>", "<a href=\"/create\">create</a>").then(function (a) {
          response.writeHead(200).end(a);
        });
      });
    });
  } else if (pathname === '/update_process') {
    var _body = '';
    request.on('data', function (data) {
      console.log(data);
      _body += data;
    });
    request.on('end', function () {
      var post = qs.parse(_body);
      console.log(post);
      var id = post.id;
      title = post.title;
      var description = post.description;
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
    var _body2 = '';
    request.on('data', function (data) {
      _body2 += data;
    });
    request.on('end', function () {
      var post = qs.parse(_body2);
      var id = post.id; // 파일 삭제 기능

      fs.unlink("data/".concat(id), function (err) {
        if (err) throw err;
        response.writeHead(302, {
          Location: "/"
        });
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(8080); // cd E:\web\come-to-blog\DailyCoding\NodeJS
// nodemon main.js
// pm2 start .\main.js