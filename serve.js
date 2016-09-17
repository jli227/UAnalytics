var _ = require("lodash"),
    express = require("express"),
    bodyParser = require("body-parser"),
    http = require("http");

var app = express();

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("build/public"));

app.get("/", function (req, res) {
    res.status(200).render("../client/index.ejs", {});
});

var server = http.createServer(app),
port = process.env.PORT || 8080;

server.listen(port, function () {
    console.log("Server has started listening on port", port, "...");
});