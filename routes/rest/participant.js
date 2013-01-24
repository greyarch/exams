module.exports = function (app, auth, db) {
    //update a participant
    app.put('/participant/id/:id', auth.rest, function (req, res) {
        var participant = req.body;
        console.log("updating participant", participant);
        db.query('UPDATE participants SET ? WHERE id = ?', [participant, req.params.id], function (err, rows) {
            if (err) {
                res.json(400, err);
            } else {
                console.log('participants are: ', rows);
                res.json(200, rows);
            }
        });
    });

    //delete a participant with an id
    app.delete('/participant/id/:id', auth.rest, function (req, res) {
        console.log("deleting a participant with id " + req.params.id);
        db.query('DELETE FROM participants WHERE id = ?', [req.params.id], function (err, result) {
            if (err) throw err; //TODO report error here
            console.log('result is: ', result);
            res.end();
        });
    });
};
