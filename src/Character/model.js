const { model, Schema } = require('mongoose');

const characterSchema = new Schema({
    name: String,
    race: String,
    level: Number
});

module.exports = model('Character', characterSchema);