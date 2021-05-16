#!/usr/bin/python3
import html_sanitizer
import view
import os
import cgi
print("content-type:text/html; charset=UTF-8\n")
print("Hello World")

# 실패 로그 보는 법
# sudo tail /var/log/apache2/error.log

sanitizer = html_sanitizer.Sanitizer()

form = cgi.FieldStorage()

if 'id' in form:
    pageId = form["id"].value
    description = open('./data/'+pageId, 'r', encoding="utf-8").read()
    description = sanitizer.sanitize(description)

else:
    pageId = 'Welcome'
    description = 'Hello, web'


print('''<!doctype html>
<html>
<head>
  <title>WEB1 - Welcome</title>
  <meta charset="utf-8">
</head>
<body>
  <h1><a href="index.py">WEB</a></h1>
  <ol>
    {listStr}
  </ol>
  <a href="create.py">create</a>
  <form method="POST" action="./process_create.py">
    <p><input type="text" name="title" placeholder="title"></p>
    <p><textarea rows="10" name="description" placeholder="description"></textarea></p>
    <p><input type="submit"></p>
  </form>
</body>
</html>
'''.format(listStr=view.getList()))
