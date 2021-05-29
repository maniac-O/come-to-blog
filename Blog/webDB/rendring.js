$(document).ready(() => {
    // AJAX 구현
});
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
