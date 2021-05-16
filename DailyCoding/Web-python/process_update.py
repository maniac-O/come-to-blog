#!/usr/bin/python3

import cgi
import os
form = cgi.FieldStorage()
pageId = form["pageId"].value
title = form["title"].value
description = form['description'].value
description = description.replace('<', '&lt;')
description = description.replace('>', '&gt;')


opened_file = open('data/'+pageId, 'w')
opened_file.write(description)
opened_file.close()

os.rename('data/'+pageId, 'data/'+title)

# Redirection
print("Location: index.py?id="+title)
print()
