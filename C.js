const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  terminal: false
});

let str = '', prev;

rl.once('line', () => {
  rl.on('line', line => {
    if (line != prev) str += `${prev = line}\n`;
    if (str.length > 150000) {
      fs.appendFileSync('output.txt', str);
      str = '';
    }
  }).on('close', () => fs.appendFileSync('output.txt', str));
});