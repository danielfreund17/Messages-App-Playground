var express = require('express');
var router = express.Router();
var Message = require('../models/message');
var jwt = require('jsonwebtoken');
var appConfig = require('../appConfig');
var User = require('../models/user');


router.use('/', function(req, res, next) {
    jwt.verify(req.headers['authorization'], appConfig.secret, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                message: 'Not Authenticated',
                error: err
            });
        }
        next();
    });
});

router.get('/', function(req, res, next) {
    Message.find().exec((err , messages) => {
        if(err) {
            var errorObj = {title: 'An error occurred'};
            return res.status(500).send(JSON.stringify(errorObj));
        }

        return res.status(200).json({message: 'success', obj: messages});
    });
});

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.headers['authorization']);
    User.findById(decoded.user._id, (err, mongoUser) => {
        if(err) {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        }    
        var message = new Message({
        content: req.body.content,
        user: mongoUser._id});       
        message.save((err,mongoMsg)=>{
            if(err) {
                var errorObj = {title: 'An error occurred'};
                return res.status(500).send(JSON.stringify(errorObj));
            }

            mongoUser.messages.push(mongoMsg._id);     
            mongoUser.save();
            var ret = {message: 'Saved message', obj : mongoMsg};
            return res.status(201).json(ret);
        });
    }); 
});


router.patch('/:id', function(req, res, next) {
    Message.findById(req.params.id, (err, message) => {
        if(err) {
            return res.status(500).json({
                message: 'Didnt find message',
                error: err
            });
        }

        message.content = req.body.content;
        message.save((err,mongoRes)=>{
            if(err) {
                return res.status(500).json({title: 'An error occurred'});
            }
    
           var ret = {message: 'Updated message'};
           return res.status(201).json(ret);
        });
    });
});


router.delete('/:id', function(req, res, next)  {
    Message.findOneAndRemove({"_id" : req.params.id}, (err, mongoMsg) => {
        if(err) {
            return res.status(500).json({mesasge: 'Could not delete message'});
        }
        User.findById(mongoMsg.user, (err, mongoUser) => {
            mongoUser.messages.pull(mongoMsg._id);
            mongoUser.save();
        });
        res.status(204).json({message : 'Message deleted succesfully'});
    });
});

module.exports = router;