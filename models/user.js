var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseValidator = require('mongoose-unique-validator');

var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    group: {type: Schema.Types.ObjectId, ref: 'Group'},
    email: {type: String, required: true, unique: true},
    messages : [{type: Schema.Types.ObjectId, ref: 'Message'}]
});

schema.plugin(mongooseValidator);

module.exports = mongoose.model('User', schema); //creates collection users
