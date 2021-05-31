let tc,
    nmax,
    printTC,
    printSize,
    randomSize,
    isBinary,
    isAzSmall,
    isAzCapital,
    isNumber,
    isPalindrome,
    order;
let alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];
let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let chars = [];

function generateStringTc(req, res, save) {
    tc = Number(req.body.testCase);
    nmax = Number(req.body.size);
    printTC = req.body.printTC;
    printSize = req.body.printSize;
    randomSize = req.body.randomSize;
    order = Number(req.body.flexRadioDefault);
    isBinary = req.body.binary;
    isAzSmall = req.body.azSmall;
    isAzCapital = req.body.azCapital;
    isNumber = req.body.nums;
    isPalindrome = req.body.isPalindrome;
    ans = new Array();

    save.tc = tc;
    save.nmax = nmax;
    save.printTC = printTC;
    save.printSize = printSize;
    save.randomSize = randomSize;
    save.order = order;
    save.isBinary = isBinary;
    save.isAzSmall = isAzSmall;
    save.isAzCapital = isAzCapital;
    save.isNumber = isNumber;
    save.isPalindrome = isPalindrome;

    if (tc * nmax > Number(100000)) {
        return ans;
    }

    const testCaseArr = [];
    testCaseArr.push(tc);
    if (printTC) ans.push(testCaseArr);
    chars = [];

    if (isBinary) {
        chars.push("0");
        chars.push("1");
    } else {
        if (isAzSmall) {
            for (i = 0; i < alphabet.length; i++) {
                chars.push(alphabet[i]);
            }
        }
        if (isAzCapital) {
            for (i = 0; i < alphabet.length; i++) {
                chars.push(alphabet[i].toUpperCase());
            }
        }
        if (isNumber) {
            for (i = 0; i < numbers.length; i++) {
                chars.push(numbers[i]);
            }
        }
    }

    for (test = 0; test < tc; test++) {
        let n;
        if (randomSize) {
            n = Math.floor(Math.random() * nmax) + 1;
        } else {
            n = nmax;
        }
        let narr = [];
        if (printSize) {
            narr.push(n);
            ans.push(narr);
        }

        let arr = [];
        for (i = 0; i < n; i++) {
            let x = Math.floor(Math.random() * chars.length);
            arr.push(chars[x]);
        }
        if (order == 1) {
        } else if (order == 2) {
            arr.sort(function (a, b) {
                return a - b;
            });
        } else if (order == 3) {
            arr.sort(function (a, b) {
                return b - a;
            });
        }
        var sarr = "";
        if (isPalindrome) {
            for (i = 0; i < Math.ceil(arr.length / 2); i++) {
                sarr += arr[i];
            }
            for (i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
                sarr += arr[i];
            }
        } else {
            for (i = 0; i < arr.length; i++) {
                sarr += arr[i];
            }
        }
        var tarr = [];
        tarr.push(sarr);
        ans.push(tarr);
    }
    return ans;
}

module.exports = { generateStringTc };
