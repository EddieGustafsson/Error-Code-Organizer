const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    description: {type: String, required: false},
    last_updated_at: {type: Date, required: true},
    created_at: {type: Date, required: true}
});

module.exports = mongoose.model('Project', projectSchema);