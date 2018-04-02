var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    content: {type: String, required: true},
    user : {type: Schema.Types.ObjectId, ref: 'User'}, //hold user
    group: {type: Schema.Types.ObjectId, ref: 'Group'} //hold group
});

module.exports = mongoose.model('Message', schema);