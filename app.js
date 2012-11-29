var express = require("express");
var util = require("util");
var app = express();
var exams = require("./public/data/exams.json");


app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.engine(".html", require('ejs').renderFile);

app.get('/', function(req, res) {
    res.render('index.html');
});

app.post('/exam', function(req, res) {
    console.log("creating an exam: ");
    console.dir(req.body);
    res.end();
});

app.get('/exam', function(req, res) {
    console.log("loading all exams");
    res.json(exams);
});

app.delete('/exam/:id', function(req, res) {
    console.log("deleting an exam with an id " + req.params.id);
    res.end();
});

app.listen(3000);
