var express = require("express");
var idgen = require("idgen");
var app = express();
var exams = require("./data.json");

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.engine(".html", require('ejs').renderFile);

app.get('/', function(req, res) {
    res.render('index.html');
});

app.post('/exam', function(req, res) {
    var exam = req.body;
    exam.id = idgen(20);
    console.log("creating an exam: ");
    console.dir(exam);
    exams.unshift(exam);
    res.json(exam);
});

app.get('/exam', function(req, res) {
    console.log("loading all exams");
    res.json(exams);
});

app.delete('/exam/:id', function(req, res) {
    console.log("deleting an exam with an id " + req.params.id);
    exams = exams.filter(function(exam) {
        return (exam.id != req.params.id);
    });
    res.end();
});

app.listen(3000);
