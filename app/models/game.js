// app/models/game.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    name: String,
    platform: String,
    format: String,
    genre: String
});

module.exports = mongoose.model('Game', GameSchema);