var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var appConfig = require('../appConfig');

router.post('/', function (req, res, next) {
    var user = new User({
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        password : bcrypt.hashSync(req.body.password, 10),
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


router.post('/login', function(req, res, next) {
    User.findOne({email: req.body.email} , (err, user) => {
        if(err) {
            return res.status(500).json({
                message: 'Could not login user',
                error: err
            });
        }
        else if(!user) {
            return res.status(500).json({
                message: 'Login failed',
            });
        }

        if(!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                message: 'Login failed',
            });
        }

        var token = jwt.sign({user: user._id}, appConfig.secret, {expiresIn: 7200});
        return res.status(200).json({
            message: 'logged in successfully',
            token: token,
            userId: user._id
        });
    });
});

module.exports = router;