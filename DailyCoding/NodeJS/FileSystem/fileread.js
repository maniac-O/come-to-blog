const fs = require('fs');
const data = new Uint8Array(Buffer.from('Hello Node.js'));
const data2 = 'aaaaa';
fs.writeFile('aaaaa', data2, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});
