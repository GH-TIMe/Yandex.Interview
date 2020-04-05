const readline = require('readline');
 
const rl = readline.createInterface({
    input: process.stdin
});
 
let lines = [];
rl.on('line', (line) => {
    lines.push(line);
}).on('close', () => {
    const [jewels, stones] = lines
    let result = 0;
    for (let i = 0; i < stones.length; i++) {
        if (jewels.includes(stones.charAt(i))) {
            ++result;
        }
    }
    process.stdout.write(result.toString());
});