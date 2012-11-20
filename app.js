var express = require("express");
var mongoose = require("mongoose");
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

var exams = [
    {"date": "20", "month": "05", "year": "2010", "title": "ISTQB Advanced", "place":"Bucharest, Romania"},
    {"date": "21", "month": "05", "year": "2011", "title": "ISTQB Foundation", "place":"Sofia, Bulgaria"},
    {"date": "30", "month": "05", "year": "2012", "title": "ISTQB Advanced", "place":"Burgas, Bulgaria"},
    {"date": "2", "month": "05", "year": "2013", "title": "ISTQB Foundation", "place":"Bucharest, Romania"},
    {"date": "12", "month": "05", "year": "2014", "title": "ISTQB Advanced", "place":"Sofia, Bulgaria"},
    {"date": "8", "month": "05", "year": "2015", "title": "ISTQB Advanced", "place":"Sofia, Bulgaria"}
];

var Exam = db.model('Exam', examSchema);

app.use(express.static(__dirname + '/public'));
app.engine(".html", require('ejs').renderFile);

app.get('/', function(req, res) {
    res.render('index.html');
});

app.post('/exam', function(req, res) {
    var x = new Exam({"date": "8", "month": "05", "year": "2020", "title": "ISTQB Advanced", "place":"Burgas, Bulgaria"});
    console.log("creating an exam: ");
    console.dir(x)
    x.save(function(err) {
        if(err) {console.log(err);}
    });
    res.end();
})

app.get('/exam', function(req, res) {
   Exam.find(function(err, exams) {
       console.log("loading all exams");
       res.send(exams);
   });
});

app.listen(process.env.VCAP_APP_PORT || 3000);
