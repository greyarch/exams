var express = require('express'),
	app = express(),
	http = require('http'),
	server = http.createServer(app),
	io = require('socket.io').listen(server),
	path = require('path'),
	mysql = require('mysql'),
	hbs = require('express-hbs'),
	argv = require('optimist').argv;

db = mysql.createConnection({
	host: 'localhost',
	database: 'admin_exams',
	user: 'admin_exams',
	password: 'apppass',
	insecureAuth: true
});
db.connect();

Object.getPrototypeOf(db).safeQuery = function (query, params, response, onSuccess) {
	db.query(query, params, function (err, result) {
		if (err) {
			console.log("Error occurred", err);
			response.json(400, err);
		} else {
			onSuccess(result);
		}
	});
}

var auth = require('./auth');

io.set('log level', 1);
io.sockets.on('connection', function (socket) {
	console.log("a new socket.io connection established", socket.id);
});

app.configure(function () {
	app.set('views', __dirname + '/views');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({
		secret: 'strogo sekretno'
	}));
	app.use(auth.passport.initialize());
	app.use(auth.passport.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.compress());
	app.use(require('./404'));
});

app.engine('html', hbs.express3({
	defaultLayout: __dirname + '/views/layout.html',
	extname: '.html',
	partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'html');

require('./routes')(app, auth, db, io);

require('./views/helpers/globalHelpers')(hbs);

server.listen(argv.port || 3000).on('end', function () {
	console.log("goodbye");
	connection.end();
});