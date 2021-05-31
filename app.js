const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const port = process.env.PORT || 3000;

const arr = require("./scripts/array");
const grid = require("./scripts/grid");
const str = require("./scripts/string");
const tree = require("./scripts/tree");

let sugg;
let ans = [];
let save = [
    "tc",
    "nmax",
    "mmax",
    "printTC",
    "printSize",
    "randomSize",
    "isBinary",
    "isAzSmall",
    "isAzCapital",
    "isNumber",
    "isPalindrome",
    "order",
    "isWeight",
    "weightMin",
    "weightMax",
    "mn",
    "mx",
];
let s_arr = [
    "tc",
    "nmax",
    "mmax",
    "printTC",
    "printSize",
    "randomSize",
    "isBinary",
    "isAzSmall",
    "isAzCapital",
    "isNumber",
    "isPalindrome",
    "order",
    "isWeight",
    "weightMin",
    "weightMax",
    "mn",
    "mx",
    "isPermutation",
];
let s_string = [
    "tc",
    "nmax",
    "mmax",
    "printTC",
    "printSize",
    "randomSize",
    "isBinary",
    "isAzSmall",
    "isAzCapital",
    "isNumber",
    "isPalindrome",
    "order",
    "isWeight",
    "weightMin",
    "weightMax",
    "mn",
    "mx",
];
let s_grid = [
    "tc",
    "nmax",
    "mmax",
    "printTC",
    "printSize",
    "randomSize",
    "isBinary",
    "isAzSmall",
    "isAzCapital",
    "isNumber",
    "isPalindrome",
    "order",
    "isWeight",
    "weightMin",
    "weightMax",
    "mn",
    "mx",
];
let s_tree = [
    "tc",
    "nmax",
    "mmax",
    "printTC",
    "printSize",
    "randomSize",
    "isBinary",
    "isAzSmall",
    "isAzCapital",
    "isNumber",
    "isPalindrome",
    "order",
    "isWeight",
    "weightMin",
    "weightMax",
    "mn",
    "mx",
    "root",
    "randomRoot",
];

const path = require("path");

const static_path = path.join(__dirname, "/public");
const views_path = path.join(__dirname, "/views");

console.log(static_path);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(static_path));

app.set("view engine", "ejs");

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "bandwidth999@gmail.com ",
        pass: "aA@1122bandwidth",
    },
});

app.listen(port, function () {
    console.log("server is running on port " + port);
});

app.get("/", function (req, res) {
    init();
    res.render("index");
});

app.get("/array", function (req, res) {
    res.render("array", { generatedTc: ans, save: s_arr });
});
app.post("/array", function (req, res) {
    ans = arr.generateArrayTc(req, res, s_arr);
    res.redirect("/array");
});

app.get("/matrix", function (req, res) {
    res.render("grid", { generatedTc: ans, save: s_grid });
});
app.post("/matrix", function (req, res) {
    ans = grid.generateGridTc(req, res, s_grid);
    res.redirect("/matrix");
});

app.get("/string", function (req, res) {
    res.render("string", { generatedTc: ans, save: s_string });
});
app.post("/string", function (req, res) {
    ans = str.generateStringTc(req, res, s_string);
    res.redirect("/string");
});

app.get("/tree", function (req, res) {
    res.render("tree", { generatedTc: ans, save: s_tree });
});
app.post("/tree", function (req, res) {
    ans = tree.generateTreeTc(req, res, s_tree);
    res.redirect("/tree");
});


function init() {
    JSON.stringify(save);
    JSON.stringify(s_arr);
    JSON.stringify(s_string);
    JSON.stringify(s_grid);
    s_arr.printTC = 1;
    s_arr.printSize = 1;
    s_grid.printTC = 1;
    s_grid.printSize = 1;
    s_string.printTC = 1;
    s_string.printSize = 1;
    s_string.isAzSmall = 1;
    s_tree.printTC = 1;
    s_tree.printSize = 1;
    s_tree.randomRoot = 1;
}
app.get("/suggestion", function (req, res) {
    res.render("suggestion");
});
app.post("/suggestion", function (req, res) {
    sugg = req.body.suggestion;
    console.log(sugg);
    const mailOptions = {
        from: "bandwidth999@gmail.com", // sender address
        to: "random.tc.generator@gmail.com", // list of receivers
        subject: "Suggestion on Random TestCase Generator", // Subject line
        html: "<p>" + sugg + "</p>", // plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            //console.log(err);
        } else {
            //console.log(info);
        }
    });
    res.redirect("/suggestion");
});

//Kalpit Arya