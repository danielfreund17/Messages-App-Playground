var express = require('express');
var router = express.Router();
var Message = require('../models/message');


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
    var message = new Message({
        content: req.body.content
    });

    message.save((err,mongoRes)=>{
        if(err) {
            var errorObj = {title: 'An error occurred'};
            return res.status(500).send(JSON.stringify(errorObj));
        }

       var ret = {message: 'Saved message', obj : mongoRes};
       return res.status(201).json(ret);
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
    Message.findOneAndRemove({"_id" : req.params.id}, (err, result) => {
        if(err) {
            return res.status(500).json({mesasge: 'Could not delete message'});
        }

        return res.status(204).json({message : 'Message deleted succesfully'});
    })
});

module.exports = router;