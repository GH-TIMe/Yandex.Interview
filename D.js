const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let result = [], str = "";

rl.once("line", (N) => {
    main(str, 0, 0, +N);
    rl.close();
});

function main(str, leftBr, rightBr, N) {
    // base 0
    if (leftBr === N) {
        for (let i = 0; i < N - rightBr; i++) {
            str += ")";
        }
        fs.appendFileSync('output.txt', `${str}\n`);
        return str;
    }
    // recursive
    doLeftBracket(str, leftBr, rightBr, N);
    if (leftBr > rightBr) {
        doRightBracket(str, leftBr, rightBr, N);
    }
}

function doLeftBracket(str, leftBr, rightBr, N) {
    str += "(";
    main(str, ++leftBr, rightBr, N);
}

function doRightBracket(str, leftBr, rightBr, N) {
    str += ")";
    main(str, leftBr, ++rightBr, N);
 }