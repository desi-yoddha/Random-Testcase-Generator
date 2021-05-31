let tc,
    nmax,
    mn,
    mx,
    printTC,
    printSize,
    randomSize,
    order,
    isWeight,
    isPermutation,
    weightMin,
    weightMax;

let ans = [];

function generateArrayTc(req, res, save) {
    tc = Number(req.body.testCase);
    nmax = Number(req.body.size);
    mn = Number(req.body.rangeMin);
    mx = Number(req.body.rangeMax);
    printTC = req.body.printTC;
    printSize = req.body.printSize;
    randomSize = req.body.randomSize;
    order = Number(req.body.flexRadioDefault);
    isWeight = req.body.isWeight;
    weightMin = Number(req.body.weightMin);
    weightMax = Number(req.body.weightMax);
    isPermutation = req.body.isPermutation;

    mx = Math.min(mx, 1000000000);
    mn = Math.max(mn, -1000000000);

    save.tc = tc;
    save.nmax = nmax;
    save.mn = mn;
    save.mx = mx;
    save.printTC = printTC;
    save.printSize = printSize;
    save.randomSize = randomSize;
    save.order = order;
    save.isWeight = isWeight;
    save.weightMin = weightMin;
    save.weightMax = weightMax;
    save.isPermutation = isPermutation;

    ans = new Array();

    if (tc * nmax > Number(100000)) {
        return ans;
    }

    const testCaseArr = [];
    testCaseArr.push(tc);
    if (printTC) ans.push(testCaseArr);
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
        if (isPermutation == 1) {
            arr = new Array(n);
            for (i = 0; i < n; i++) {
                arr[i] = i + 1;
            }
            for (i = 0; i < n; i++) {
                let x = Math.floor(Math.random() * n);
                let temp = arr[i];
                arr[i] = arr[x];
                arr[x] = temp;
            }
        } else {
            for (i = 0; i < n; i++) {
                let x = Math.floor(Math.random() * (mx - mn + 1)) + mn;
                arr.push(x);
            }
        }
        if (order == 1) {
            ans.push(arr);
        } else if (order == 2) {
            arr.sort(function (a, b) {
                return a - b;
            });
            ans.push(arr);
        } else if (order == 3) {
            arr.sort(function (a, b) {
                return b - a;
            });
            ans.push(arr);
        }
        if (isWeight) {
            let warr = [];
            for (i = 0; i < n; i++) {
                let x =
                    Math.floor(Math.random() * (weightMax - weightMin + 1)) +
                    weightMin;
                warr.push(x);
            }
            ans.push(warr);
        }
    }
    return ans;
}

module.exports = { generateArrayTc };
