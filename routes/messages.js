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

router.get('/', async function(req, res, next) {
    try {
        let messages = await Message.find()
        .populate('user', 'firstName lastName')
        .exec();
        
        return res.status(200).json({message: 'success', obj: messages});
    } catch (error) {
        var errorObj = {title: 'An error occurred'};
        return res.status(500).send(JSON.stringify(errorObj));
    }
});

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.headers['authorization']);
    User.findById(decoded.user,(err, mongoUser) => {
        if(err) {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        }    
        var message = new Message({
        content: req.body.content,
        user: mongoUser._id});       
        message.save((err, mongoMsg)=>{
            if(err) {
                var errorObj = {title: 'An error occurred'};
                return res.status(500).send(JSON.stringify(errorObj));
            }
            mongoUser.messages.push(mongoMsg._id);    
            mongoUser.save(); 
            var ret = {message: 'Saved message', msg : mongoMsg, userFirstName : mongoUser.firstName, userLastName : mongoUser.lastName};
            return res.status(201).json(ret);
        });
    }); 
});


router.patch('/:id', function(req, res, next) {
    var decoded = jwt.decode(req.headers['authorization']);
    Message.findById(req.params.id, (err, mongoMessage) => {
        if(err) {
            return res.status(500).json({
                message: 'Didnt find message',
                error: err
            });
        }
        if(mongoMessage.user.toString() !== decoded.user) {
            return res.status(401).json({message : 'User can only update his own messages'});
        }
        mongoMessage.content = req.body.content;
        mongoMessage.save((err,mongoRes)=>{
            if(err) {
                return res.status(500).json({title: 'An error occurred'});
            }
    
           return res.status(201).json({message: 'Updated message'});
        });
    });
});


router.delete('/:id', function(req, res, next)  {
    var decoded = jwt.decode(req.headers['authorization']);
    Message.findOne({"_id" : req.params.id}, (err, mongoMsg) => {
        if(err) {
            return res.status(500).json({mesasge: 'Could not delete message'});
        }
        if(mongoMsg.user.toString() !== decoded.user) {
            return res.status(401).json({mesasge: 'Could not delete message'});
        }
        mongoMsg.remove();
        User.findById(mongoMsg.user, (err, mongoUser) => {
            mongoUser.messages.pull(mongoMsg._id);
            mongoUser.save();
        });
        res.status(204).json({message : 'Message deleted succesfully'});
    });
});

module.exports = router;