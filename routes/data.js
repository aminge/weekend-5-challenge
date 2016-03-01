var express = require('express');
var router = express.Router();
var pg = require('pg');
var connect = require('../modules/connection');

router.post('/', function(req, res) {

    pg.connect(connect, function(err, client, done) {

        client.query('INSERT INTO pets (id, name, type, description, picture_url) VALUES ($1, $2, $3, $4, $5)',
            [parseInt(req.body.id), req.body.name, req.body.type, req.body.description, req.body.picture_url],
            function (err, result) {
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                }
            }
        );
    });
});

router.get('/', function(req, res) {
    var results = [];

    pg.connect(connect, function(err, client, done) {
        var query = client.query('SELECT * FROM pets');

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }
    });
});

module.exports = router;