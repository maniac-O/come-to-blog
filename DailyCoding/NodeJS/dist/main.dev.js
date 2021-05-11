"use strict";

var http = require('http');

var fs = require('fs');

var qs = require('querystring');

var path = require('path');

var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = new URL('http://127.0.0.1:8080' + _url);
  var pathname = queryData.pathname;
  var title = queryData.searchParams.get('id');
  var template = '';

  function rendering(title, list, body, control) {
    template = "<!doctype html>\n        <html>\n        <head>\n            <title>Node.JS - ".concat(title, "</title>\n            <meta charset=\"utf-8\">\n        </head>\n        <body>\n        <h1><a href=\"/\">WEB</a></h1>\n            ").concat(list, "  \n            ").concat(control, "\n            ").concat(body, "\n        </body>\n        </html>\n        ");
  }

  function rendList(filelist) {
    this.filelist = filelist;
    var list = "<ul>";

    for (var i = 0; i < this.filelist.length; i++) {
      list += "<li><a href=\"/?id=".concat(this.filelist[i], "\">").concat(this.filelist[i], "</a></li>");
    }

    list += "</ul>";
    return list;
  }

  if (pathname === '/') {
    fs.readdir('./data', function (err, filelist) {
      if (err) console.log('err!!');
      var description = ''; // ul태그 안 list를 동적으로 만드는 동작

      var list = rendList(filelist); // ul태그 아래 title과 본문내용 변경

      if (title == undefined) {
        title = 'Welcome';
        description = 'Welcome!!!';
        rendering(title, list, "<h2>".concat(title, "</h2>").concat(description), "<a href=\"/create\">create</a>");
        response.writeHead(200);
        response.end(template);
      } else if (title) {
        fs.readFile("./data/".concat(title), 'utf-8', function (err, data) {
          title = sanitizeHtml(title);
          description = sanitizeHtml(data);
          rendering(title, list, "<h2>".concat(title, "</h2>").concat(description), "<a href=\"/create\">create</a> \n                        <a href=\"/update?id=".concat(title, "\">update</a>\n                        <form action=\"/delete_process\" method=\"post\" onsubmit=\"checkToSubmit\">\n                            <input type=\"hidden\" name=\"id\" value=\"").concat(title, "\">\n                            <input type=\"submit\" value=\"delete\">\n                        </form>"));
          response.writeHead(200);
          response.end(template);
        });
      }
    });
  } else if (pathname === '/create') {
    fs.readdir('./data', function (err, filelist) {
      if (err) console.log('err!!');
      title = 'NODE.JS - create';
      var list = rendList(filelist);
      var description = "<form action=\"/create_process\" method=\"post\">\n                <p><input type=\"text\" name=\"title\" placeholder=\"title\"></p>\n                <p><textarea name=\"description\" id=\"\" cols=\"30\" rows=\"10\" placeholder=\"description\"></textarea></p>\n                <p><input type=\"submit\"></p>\n            </form>";
      rendering(title, list, description, "<a href=\"/create\">create</a>");
      response.writeHead(200);
      response.end(template);
    });
  } else if (pathname === '/create_process') {
    var body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      var post = qs.parse(body);
      title = post.title;
      var description = post.description;
      fs.writeFile("data/".concat(title), description, 'utf8', function (err) {
        if (err) throw err;
        response.writeHead(302, {
          Location: "/?id=".concat(title)
        });
        response.end();
      });
    });
  } else if (pathname === '/update') {
    var list;
    fs.readdir('./data', function (err, filelist) {
      list = rendList(filelist);
    });
    fs.readFile("./data/".concat(title), 'utf-8', function (err, data) {
      description = data;
      rendering(title, list, "<form action=\"/update_process\" method=\"post\">\n                    <input type=\"hidden\" name=\"id\" value=\"".concat(title, "\">\n                    <p><input type=\"text\" name=\"title\" placeholder=\"title\" value=\"").concat(title, "\"></p>\n                    <p><textarea name=\"description\" id=\"\" cols=\"30\" rows=\"10\" placeholder=\"description\">").concat(description, "</textarea></p>\n                    <p><input type=\"submit\"></p>\n                </form>"), "<a href=\"/create\">create</a> <a href=\"/update?id=".concat(title, "\">update</a>"));
      response.writeHead(200);
      response.end(template);
    });
  } else if (pathname === '/update_process') {
    var _body = '';
    request.on('data', function (data) {
      _body += data;
    });
    request.on('end', function () {
      var post = qs.parse(_body);
      var id = post.id;
      title = post.title;
      var description = post.description; // 파일명 바꾸기

      fs.rename("data/".concat(id), "data/".concat(title), function (err) {
        if (err) console.log('rename error'); //파일 내용 바꾸기

        fs.writeFile("data/".concat(title), description, 'utf8', function (err) {
          if (err) throw err;
          response.writeHead(302, {
            Location: "/?id=".concat(title)
          });
          response.end();
        });
      });
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