var express = require('express')
, http = require('http')
, path = require('path')
, mysql = require('mysql')
, hbs = require('express-hbs')
, auth = require('./auth')
, passport = auth.passport
, argv = require('optimist').argv;

app = express();

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

var connection = mysql.createConnection({
    host:'localhost',
    database:'admin_exams',
    user:'admin_exams',
    password:'apppass',
    insecureAuth:true
});
connection.connect();

require('./routes')(app, auth, connection);

app.listen(argv.port || 3000).on('end', function () {
    console.log("goodbye");
    connection.end();
});