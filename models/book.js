const mongo = require('mongoose');
const Schema = mongo.Schema;

const bookSchema =  new Schema({
    name: String,
    genre: String,
    authorId: mongo.Schema.Types.ObjectId

});

module.exports = mongo.model('Books', bookSchema);