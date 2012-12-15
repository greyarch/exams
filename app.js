var express = require('express')
    , exam = require('./routes/exam')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path')
    , mysql = require('mysql')
    , hbs = require('express-hbs')
    , auth = require('./auth')
    , passport = auth.passport
    , argv = require('optimist').argv;

var app = express();

app.configure(function () {
    app.set('views', __dirname + '/views');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({secret:'strogo sekretno'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.engine('html', hbs.express3({defaultLayout:__dirname + '/views/layout.html',
    extname:'.html', partialsDir:__dirname + '/views/partials'}));
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
app.post('/login', function (req, res, next) {
    passport.authenticate('local', {successRedirect:'/',
            failureRedirect:'/login'},
        function (err, user, info) {
            if (err) {
                return next(err)
            }
            if (!user) {
                return res.end();
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.redirect('/');
            });
        })(req, res, next);
});

app.get('/', auth.ensure, exam.index);

//create exam
app.post('/exam', exam.new);
//create participant for exam
app.post('/exam/:id/participant', exam.create_participant);
//get all exam
app.get('/exam', exam.get_all);
app.get('/calendar', exam.calendar);

app.get('/participant', exam.participant);

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

app.listen(argv.port || 3000).on('end', function () {
    console.log("goodbye");
    connection.end();
});