var express = require('express');
var router = express.Router();

var maths = require("../controllers/mathsService");


router.get("/", (req, res) => {
    res.json(maths.addminChallenge(10));
})

router.get("/add", (req, res) => {
    //res.render("challenge", { data:  maths.addminChallenge(15) });
    res.redirect("/add/15")
})


router.get("/add/:num", (req, res) => {
    var data = maths.addminChallenge(req.params.num);
    var strVal = JSON.stringify(data)

    res.render("challenge", { data: data, str: strVal });
})

router.get("/multiply", (req, res) => {
    res.redirect("multiply/15")
})

router.get("/multiply/:num", (req, res) => {
    var data = maths.multdivChallenge(req.params.num)

    console.log(JSON.stringify(data));
    var strVal = JSON.stringify(data)
    res.render("challenge", { data: data, str: strVal})
})

module.exports = router 