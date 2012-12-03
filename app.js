var express = require("express");
var util = require("util");
var idgen = require("idgen");
var app = express();
var exams = require("./data.json");

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.engine(".html", require('ejs').renderFile);

app.get('/', function(req, res) {
    res.render('index.html');
});

//create exam
app.post('/exam', function(req, res) {
    var exam = req.body;
    exam.id = idgen(20);
    exam.participants = [];
    console.log("creating an exam: ");
    console.dir(exam);
    exams.unshift(exam);
    res.json(201, exam);
});

//get all exams
app.get('/exam', function(req, res) {
    console.log("loading all exams");
    res.json(exams);
});

//delete exam with an id
app.delete('/exam/:id', function(req, res) {
    console.log("deleting an exam with an id " + req.params.id);
    exams = exams.filter(function(item) {
        return (item.id != req.params.id);
    });
    res.end();
});

//update exam - currently used to add/delete participants
app.put('/exam', function(req, res){
    var exam = req.body;
    console.log("updating exam with id: ", exam.id);
    exams = exams.map(function(item) {
        return item.id == exam.id ? exam : item;
    });
    res.json(exam);
});

PORT = process.argv[2];
app.listen(PORT ? PORT : 3000);
