var express = require("express");
var mongoose = require("mongoose");
var util = require("util");
var app = express();

if(process.env.VCAP_SERVICES){
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var mongo = env['mongodb-1.8'][0]['credentials'];
} else {
    var mongo = {
        "hostname":"localhost",
        "port":27017,
        "username":"",
        "password":"",
        "name":"",
        "db":"db"
    }
}

var generate_mongo_url = function(obj){
    obj.hostname = (obj.hostname || 'localhost');
    obj.port = (obj.port || 27017);
    obj.db = (obj.db || 'test');
    if(obj.username && obj.password){
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
    else{
        return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
}

var mongourl = generate_mongo_url(mongo);
var db = mongoose.createConnection(mongourl);

var examSchema = new mongoose.Schema({
    date: String,
    month: String,
    year: String,
    title: String,
    place: String   
});

var Exam = db.model('Exam', examSchema);

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.engine(".html", require('ejs').renderFile);

app.get('/', function(req, res) {
    res.render('index.html');
});

app.post('/exam', function(req, res) {
    var x = new Exam(req.body);
    console.log("creating an exam: ");
    console.dir(x);
    x.save(function(err) {
        if(err) {
            console.log(err);
            res.send(500, util.inspect(err));
        } else res.end(200);
    });
});

app.get('/exam', function(req, res) {
    Exam.find(function(err, exams) {
        console.log("loading all exams");
        res.json(exams);
    });
});

app.delete('/exam/:id', function(req, res) {
    Exam.remove({
        _id: req.params.id
    }, function(err, exam) {
        if(err) {
            console.log(util.inspect(err));          
            res.send(500, util.inspect(err));
        } else res.send(200);
    });
});

app.listen(process.env.VCAP_APP_PORT || 3000);
