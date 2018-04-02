var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Group = require('../models/group');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var appConfig = require('../appConfig');

router.post('/', async function (req, res, next) {
    try {
        var existingGroup = await Group.findOne({groupName: req.body.groupName})
        var group = existingGroup ? existingGroup : new Group({
            groupName: req.body.groupName
        });
        var mongoGroup = await group.save();
        var user = new User({
            firstName : req.body.firstName,
            lastName: req.body.lastName,
            password : bcrypt.hashSync(req.body.password, 10),
            group: mongoGroup._id,
            email : req.body.email
        });
    }
    catch(err) {
        return res.status(500).json({
            message: 'Could not create user',
            error: err
        });
    }
    user.save((err, mongoRes) => {
        if(err) {
            return res.status(500).json({
                message: 'User Already Exists',
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
                message: 'User Does Not Exists',
            });
        }

        if(!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                message: 'Wrong Password',
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