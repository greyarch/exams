var express = require("express");
var mysql = require('mysql');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.engine(".html", require('ejs').renderFile);

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'admin_exams',
    user: 'admin_exams',
    password: 'apppass',
    insecureAuth: true
});

connection.connect();

app.get('/', function(req, res) {
    res.render('index.html');
});

//create exam
app.post('/exam', function(req, res) {
    var exam = req.body;
    console.log("creating an exam: ");
    console.dir(exam);
    connection.query('INSERT INTO exams SET ?', exam, function(err, result) {
        if (err) throw err; //TODO report error here
        console.log('result is: ', result);
        res.json(201, exam);
    });
});

//create participant for exam
app.post('/exam/:id/participant', function(req, res) {
    var part = req.body;
    part.exam_id = req.params.id;
    console.log("creating a participant for exam with id ", req.params.id);
    console.dir(part);
    connection.query('INSERT INTO participants SET ?', part, function(err, result) {
        if (err) throw err; //TODO report error here
        console.log('result is: ', result);
        res.json(201, part);
    });
});

//get all exams
app.get('/exam', function(req, res) {
    console.log("loading all exams");
    connection.query('SELECT * FROM exams', function(err, rows) {
        if (err) throw err; //TODO report error here
        console.log('exams are: ', rows);
        res.json(200, rows);
    });
});

//get all participants in an exam
app.get('/exam/:id/participant', function(req, res) {
    console.log("loading all participants in exam with id ", req.params.id);
    connection.query('SELECT * FROM participants WHERE exam_id = ?', [req.params.id], function(err, rows) {
        if (err) throw err; //TODO report error here
        console.log('participants are: ', rows);
        res.json(200, rows);
    });
});

//delete exam with an id
app.delete('/exam/:id', function(req, res) {
    console.log("deleting an exam with id " + req.params.id);
    connection.query('DELETE FROM exams WHERE id = ?', [req.params.id], function(err, result) {
        if (err) throw err; //TODO report error here
        console.log('result is: ', result);
        res.end();
    });
});

//delete a participant with an id
app.delete('/participant/:id', function(req, res) {
    console.log("deleting a participant with id " + req.params.id);
    connection.query('DELETE FROM participants WHERE id = ?', [req.params.id], function(err, result) {
        if (err) throw err; //TODO report error here
        console.log('result is: ', result);
        res.end();
    });
});

//update exam - currently used to add/delete participants
app.put('/exam', function(req, res) {
    var exam = req.body;
    console.log("updating exam with id: ", exam.id);
    exams = exams.map(function(item) {
        return item.id == exam.id ? exam : item;
    });
    res.json(exam);
});

PORT = process.argv[2];
app.listen(PORT ? PORT : 3000).on('end', function() {
    console.log("goodbye");
    connection.end();
});