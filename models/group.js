var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    groupName: {type: String, required: true, unique: true},
});

module.exports = mongoose.model('Group', schema);