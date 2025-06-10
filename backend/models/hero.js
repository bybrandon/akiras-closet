const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const heroSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
     
    ability: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    }
});


module.exports = mongoose.model('Hero', heroSchema);