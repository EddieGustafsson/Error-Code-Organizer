const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: false},
    type: {type: String, required: false}
});

module.exports = mongoose.model('Project', projectSchema);