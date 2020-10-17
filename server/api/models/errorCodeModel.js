const mongoose = require('mongoose');

const errorCodeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    project_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'project', 
        required: true
    },
    code: {type: String, required: true},
    location: {type: String, required: true},
    message: {type: String, required: true},
    description: {type: String, required: true},
    last_updated_at: {type: Date, required: true},
    created_at: {type: Date, required: true}
});

module.exports = mongoose.model('error_code', errorCodeSchema);