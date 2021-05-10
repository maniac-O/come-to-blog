"use strict";

var fs = require('fs');

var data = new Uint8Array(Buffer.from('Hello Node.js'));
var data2 = 'aaaaa';
fs.writeFile('aaaaa', data2, function (err) {
  if (err) throw err;
  console.log('The file has been saved!');
});