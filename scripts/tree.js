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
    weightMax,
    randomRoot,
    root;

let ans = [];

function generateTreeTc(req, res, save) {
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
    isPermutation = 1;
    randomRoot = req.body.randomRoot;
    root = req.body.root;

    mx = Math.min(mx, 1000000000);
    mn = Math.max(mn, -1000000000);

    if (root) {
    } else {
        root = 1;
    }

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
    save.randomRoot = randomRoot;
    save.root = root;

    ans = new Array();

    if (tc * nmax > Number(100000)) {
        return ans;
    }

    const testCaseTree = [];
    testCaseTree.push(tc);
    if (printTC) ans.push(testCaseTree);
    for (test = 0; test < tc; test++) {
        let n;
        if (randomSize) {
            n = Math.floor(Math.random() * nmax) + 1;
        } else {
            n = nmax;
        }

        let ntree = [];
        if (printSize) {
            ntree.push(n);
            ans.push(ntree);
        }
        if (isWeight) {
            let wtree = [];
            for (i = 0; i < n; i++) {
                let x =
                    Math.floor(Math.random() * (weightMax - weightMin + 1)) +
                    weightMin;
                wtree.push(x);
            }
            ans.push(wtree);
        }
        if (randomRoot == 1) {
            root = Math.floor(Math.random() * n) + 1;
        } else {
        }
        let tree = [];
        tree = new Array(n);
        for (i = 0; i < n; i++) {
            tree[i] = i + 1;
        }
        for (i = 0; i < n; i++) {
            let x = Math.floor(Math.random() * n);
            let temp = tree[i];
            tree[i] = tree[x];
            tree[x] = temp;
        }
        let temp = [];
        let edges = [];
        temp.push(root);
        for (i = 0; i < n; i++) {
            if (tree[i] != root) {
                let idx = Math.floor(Math.random() * temp.length);
                let edge = [];
                if (Math.floor(Math.random() * 2) == 0) {
                    edge.push(temp[idx]);
                    edge.push(tree[i]);
                } else {
                    edge.push(tree[i]);
                    edge.push(temp[idx]);
                }
                temp.push(tree[i]);
                edges.push(edge);
                //ans.push(edge);
            }
        }
        for (i = 0; i < n - 1; i++) {
            let x = Math.floor(Math.random() * (n - 1));
            let temp = [];
            temp = edges[i];
            edges[i] = edges[x];
            edges[x] = temp;
        }
        for (i = 0; i < n - 1; i++) {
            ans.push(edges[i]);
        }
    }
    return ans;
}

module.exports = { generateTreeTc };
