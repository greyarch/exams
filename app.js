var express = require('express')
        , exam = require('./routes/exam')
        , user = require('./routes/user')
        , http = require('http')
        , path = require('path')
        , mysql = require('mysql')
        , hbs = require('express-hbs')
        , passport = require('passport')
        , LocalStrategy = require('passport-local').Strategy
        , argv = require('optimist').argv;


var users = [
    {id: 1, username: 'bob', password: 'secret', email: 'bob@example.com'}
    , {id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com'}
];

function findById(id, fn) {
    var idx = id - 1;
    if (users[idx]) {
        fn(null, users[idx]);
    } else {
        fn(new Error('User ' + id + ' does not exist'));
    }
}

function findByUsername(username, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.username === username) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'pass'
},
function(username, password, done) {
    console.log("username is ", username);
    // asynchronous verification, for effect...
    process.nextTick(function() {

        // Find the user by username.  If there is no user with the given
        // username, or the password is not correct, set the user to `false` to
        // indicate failure and set a flash message.  Otherwise, return the
        // authenticated `user`.
        findByUsername(username, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'Unknown user ' + username});
            }
            if (user.password != password) {
                return done(null, false, {message: 'Invalid password'});
            }
            return done(null, user);
        })
    });
}
));

var app = express();

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({secret: 'strogo sekretno'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.engine('html', hbs.express3({defaultLayout: __dirname + '/views/layout.html',
    extname: '.html', partialsDir: __dirname + '/views/partials'}));
app.set('view engine', 'html');

connection = mysql.createConnection({
    host: 'localhost',
    database: 'admin_exams',
    user: 'admin_exams',
    password: 'apppass',
    insecureAuth: true
});
connection.connect();

app.get('/login', user.login);
app.post('/login', passport.authenticate('local', {successRedirect: '/',
    failureRedirect: '/login'}));

app.get('/', exam.index);

//create exam
app.post('/exam', exam.new );
//create participant for exam
app.post('/exam/:id/participant', exam.create_participant);
//get all exam
app.get('/exam', exam.get_all);
app.get('/calendar', exam.calendar);

//create exam
app.post('/exam', exam.new );
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

app.listen(argv.port || 3000).on('end', function() {
    console.log("goodbye");
    connection.end();
});