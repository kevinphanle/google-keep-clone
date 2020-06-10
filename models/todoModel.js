var mongoose = require('mongoose');

var Schema = mongoose.Schema;

let TodoSchema = new Schema({
    title: {
        type: String,
    },
    text: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: "#ffffff"
    },
    isDone: {
        type: Boolean,
        default: false
    },
    hasAttachment: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model("Todo", TodoSchema);