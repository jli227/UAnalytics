/**
 * Created by Jonathan on 9/17/16.
 */

var express = require("express"),
    router = express.Router(),
    _ = require("lodash"),

    graphController = require("./lib/graph");

router.get("/getMetrics", function (req, res) {
    graphController.getData(function (err) {
        if (err) {
            console.log(err);
        }
    });
});

module.exports = router;