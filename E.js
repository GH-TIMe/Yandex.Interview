const readline = require('readline');
 
const rl = readline.createInterface({
    input: process.stdin
});

let str1, str2, result;

rl.once("line", line1 => {
    str1 = line1;
    rl.once("line", line2 => {
        str2 = line2;
        rl.close();
    });
}).on("close", () => {
    result = isAnagrams(str1, str2);
    process.stdout.write(result.toString());
});


function isAnagrams(str1, str2) {
    // base 0 
    let cnt1 = {};
    let cnt2 = {};
    str1.split("").forEach(letter => calcCount(cnt1, letter));
    str2.split("").forEach(letter => calcCount(cnt2, letter));
    let cntLen1 = Object.keys(cnt1).length,
        cntLen2 = Object.keys(cnt2).length;
    if (cntLen1 === cntLen2) {
        for (key of Object.keys(cnt1)) {
            if (cnt1[key] !== cnt2[key]) {
                return 0;
            }
        }
        return 1;
    } else {
        return 0;
    }
}

function calcCount(cnt, letter) {
    if (cnt.hasOwnProperty(letter)) {
        cnt[letter]++;
    } else {
        cnt[letter] = 0;
    }
}