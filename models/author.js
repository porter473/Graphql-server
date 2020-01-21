const mongo = require('mongoose');
const Schema = mongo.Schema;

const authorSchema =  new Schema({
    name: String,
    age: Number

});

module.exports = mongo.model('Authors', authorSchema);