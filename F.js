const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  terminal: false
});

const countNum = [...Array(101)].fill(0);
rl.once('line', () => {
    rl.on('line', line => {
        let subArray = line.split(" ");
        for (let i = 1; i < subArray.length; i++) {
            countNum[+subArray[i]]++;
        }
    }).on('close', () => countNum.forEach((item, index) => fs.appendFileSync('output.txt', `${index} `.repeat(item))));
});