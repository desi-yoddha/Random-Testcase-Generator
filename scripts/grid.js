let tc,
    nmax,
    mmax,
    mn,
    mx,
    printTC,
    printSize,
    randomSize,
    order,
    isWeight,
    weightMin,
    weightMax;

let ans = [];

function generateGridTc(req, res, save) {
    console.log(req.body);
    tc = Number(req.body.testCase);
    nmax = Number(req.body.sizeRow);
    mmax = Number(req.body.sizeColumn);
    mn = Number(req.body.rangeMin);
    mx = Number(req.body.rangeMax);
    printTC = req.body.printTC;
    printSize = req.body.printSize;
    randomSize = req.body.randomSize;
    order = Number(req.body.flexRadioDefault);
    isWeight = req.body.isWeight;
    weightMin = Number(req.body.weightMin);
    weightMax = Number(req.body.weightMax);

    mx = Math.min(mx, 1000000000);
    mn = Math.max(mn, -1000000000);
    
    save.tc = tc;
    save.nmax = nmax;
    save.mmax = mmax;
    save.mn = mn;
    save.mx = mx;
    save.printTC = printTC;
    save.printSize = printSize;
    save.randomSize = randomSize;
    save.order = order;
    save.isWeight = isWeight;
    save.weightMin = weightMin;
    save.weightMax = weightMax;

    ans = new Array();

    if (tc * nmax * mmax > Number(100000)) {
        return ans;
    }

    const testCaseArr = [];
    testCaseArr.push(tc);
    if (printTC) ans.push(testCaseArr);

    for (test = 0; test < tc; test++) {
        let n, m;
        if (randomSize) {
            n = Math.floor(Math.random() * nmax) + 1;
            m = Math.floor(Math.random() * mmax) + 1;
        } else {
            n = nmax;
            m = mmax;
        }
        let narr = [];
        if (printSize) {
            narr.push(n);
            narr.push(m);
            ans.push(narr);
        }
        let arr = [];
        for (i = 0; i < n * m; i++) {
            let x = Math.floor(Math.random() * (mx - mn + 1)) + mn;
            arr.push(x);
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
        for (i = 0; i < n; i++) {
            let arrt = [];
            for (j = 0; j < m; j++) {
                arrt.push(arr[i * m + j]);
            }
            ans.push(arrt);
        }
        if (isWeight) {
            for (j = 0; j < n; j++) {
                let warr = [];
                for (i = 0; i < m; i++) {
                    let x =
                        Math.floor(
                            Math.random() * (weightMax - weightMin + 1)
                        ) + weightMin;
                    warr.push(x);
                }
                ans.push(warr);
            }
        }
    }
    return ans;
}

module.exports = { generateGridTc };
