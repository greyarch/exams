var express = require('express')
    ,exam = require('./routes/exam')
    ,user = require('./routes/user')
    ,http = require('http')
    ,path = require('path')
    ,mysql = require('mysql')
    ,hbs = require('express-hbs')
    ,argv = require('optimist').argv;

var app = express();

app.configure(function () {
    app.set('views', __dirname + '/views');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.engine('html', hbs.express3({defaultLayout: __dirname + '/views/layout.html',
    extname: '.html', partialsDir: __dirname + '/views/partials'}));
app.set('view engine', 'html');

connection = mysql.createConnection({
    host:'localhost',
    database:'admin_exams',
    user:'admin_exams',
    password:'apppass',
    insecureAuth:true
});
connection.connect();

app.get('/login', user.login);

app.get('/', exam.index);

//create exam
app.post('/exam', exam.new);
//create participant for exam
app.post('/exam/:id/participant', exam.create_participant);
//get all exam
app.get('/exam', exam.get_all);
app.get('/calendar', exam.calendar);

//create exam
app.post('/exam', exam.new);
//create participant for exam
app.post('/exam/:id/participant', exam.create_participant);
//get all exam
app.get('/exam', exam.get_all);
//get all participants in an exam
app.get('/exam/:id/participant', exam.get_all_participants);
//delete exam with an id
app.delete('/exam/:id', exam.delete);
//delete a participant with an id
app.delete('/participant/:id', exam.delete_participant);
//update exam - currently used to add/delete participants
app.put('/exam', exam.update);

app.listen(argv.port || 3000).on('end', function () {
    console.log("goodbye");
    connection.end();
});