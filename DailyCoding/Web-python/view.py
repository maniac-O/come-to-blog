import os


def getList():
    files = os.listdir('data')
    listStr = ''
    for item in files:
        listStr += '<li><a href="index.py?id={name}d">{name}</a></li>'.format(
            name=item)
    return listStr
