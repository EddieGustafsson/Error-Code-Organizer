const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subject:  {type: String, enum: ['project', 'error_code'], required: true},
    event_type:  {type: String, enum: ['create', 'update', 'deletion'], required: true},
    project_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'project', 
        required: true
    },
    creator_user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true
    },
    created_at: {type: Date, required: true}
});

module.exports = mongoose.model('event', eventSchema);