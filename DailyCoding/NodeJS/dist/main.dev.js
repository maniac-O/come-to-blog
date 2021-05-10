"use strict";

var http = require('http');

var fs = require('fs'); //let url = require('url');


var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = new URL('http://127.0.0.1:8080' + _url);
  var pathname = queryData.pathname;
  var title = queryData.searchParams.get('id');

  if (pathname === '/') {
    fs.readdir('./data', function (err, filelist) {
      if (err) console.log('err!!');
      var template = '';
      var description = ''; // ul태그 안 list를 동적으로 만드는 동작

      var list = "<ul>";

      for (var i = 0; i < filelist.length; i++) {
        list += "<li><a href=\"/?id=".concat(filelist[i], "\">").concat(filelist[i], "</a></li>");
      }

      list += "</ul>";

      function rendering(title, list, body) {
        template = "<!doctype html>\n                <html>\n                <head>\n                  <title>Node.JS - ".concat(title, "</title>\n                  <meta charset=\"utf-8\">\n                </head>\n                <body>\n                  <h1><a href=\"/\">WEB</a></h1>\n                  ").concat(list, "\n                  ").concat(body, "\n                </body>\n                </html>\n              ");
        response.writeHead(200);
        response.end(template);
      } // ul태그 아래 title과 본문내용 변경


      if (title == undefined) {
        title = 'Welcome';
        description = 'Welcome!!!';
        rendering(title, list, "<h2>".concat(title, "</h2>").concat(description));
      } else if (title) {
        fs.readFile("./data/".concat(title), 'utf-8', function (err, data) {
          description = data;
          rendering(title, list, "<h2>".concat(title, "</h2>").concat(description));
        });
      }
    });
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(8080); // cd E:\web\come-to-blog\DailyCoding\NodeJS
// nodemon main.js
// pm2 start .\main.js