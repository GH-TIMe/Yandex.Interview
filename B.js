const readline = require('readline');
 
const rl = readline.createInterface({
    input: process.stdin
});
 
let lines = [];
rl.on('line', (line) => {
    lines.push(line);
    if (+lines[0] <= lines.length - 1) {
        rl.close();
    }
}).on('close', () => {
    let n = lines[0];
    let str = lines.slice(1, n + 2).join(",");
    let maxLen = 0;
    let len = 0;
    for (let i = 0; i < str.length; i++) {
        switch (str[i]) {
            case "1":
                len++;
                if (maxLen < len) {
                    maxLen = len;
                }
                break;
            case "0":
                len = 0;
                break;
        }
    }
    process.stdout.write(maxLen.toString());
});