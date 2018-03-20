var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');

router.post('/', function (req, res, next) {
    var user = new User({
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        password : bcrypt.hash(req.body.password, 10),
        email : req.body.email
    });

    user.save((err, mongoRes) => {
        if(err) {
            return res.status(500).json({
                message: 'Could not create user',
                error: err
            });
        }

        res.status(201).json({
            message: 'Created user',
            obj: mongoRes
        });
    });
});

module.exports = router;