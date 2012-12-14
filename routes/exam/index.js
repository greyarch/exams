exports.index = function (req, res) {
    res.render('exams.html');
};

exports.calendar = function (req, res) {
    res.render('calendar.html');
};

exports.participant = function (req, res) {
    res.render('participant.html');
};

exports.new = function (req, res) {
    var exam = req.body;
    console.log("creating an exam: ");
    console.dir(exam);
    connection.query('INSERT INTO exams SET ?', exam, function (err, result) {
        if (err) throw err; //TODO report error here
        console.log('result is: ', result);
        res.json(201, exam);
    });
}

exports.create_participant = function (req, res) {
    var part = req.body;
    part.exam_id = req.params.id;
    console.log("creating a participant for exam with id ", req.params.id);
    console.dir(part);
    connection.query('INSERT INTO participants SET ?', part, function (err, result) {
        if (err) throw err; //TODO report error here
        console.log('result is: ', result);
        res.json(201, part);
    });
};

exports.get_all = function (req, res) {
    console.log("loading all exam");
    connection.query('SELECT * FROM exams', function (err, rows) {
        if (err) throw err; //TODO report error here
        console.log('exam are: ', rows);
        res.json(200, rows);
    });
};

exports.get_all_participants = function (req, res) {
    console.log("loading all participants in exam with id ", req.params.id);
    connection.query('SELECT * FROM participants WHERE exam_id = ?', [req.params.id], function (err, rows) {
        if (err) throw err; //TODO report error here
        console.log('participants are: ', rows);
        res.json(200, rows);
    });
};

exports.delete = function (req, res) {
    console.log("deleting an exam with id " + req.params.id);
    connection.query('DELETE FROM exams WHERE id = ?', [req.params.id], function (err, result) {
        if (err) throw err; //TODO report error here
        console.log('result is: ', result);
        res.end();
    });
};

exports.delete_participant = function (req, res) {
    console.log("deleting a participant with id " + req.params.id);
    connection.query('DELETE FROM participants WHERE id = ?', [req.params.id], function (err, result) {
        if (err) throw err; //TODO report error here
        console.log('result is: ', result);
        res.end();
    });
};

exports.update = function (req, res) {
    var exam = req.body;
    console.log("updating exam with id: ", exam.id);
    //TODO implement using db
    exams = exams.map(function (item) {
        return item.id == exam.id ? exam : item;
    });
    res.json(exam);
};