const mongoose = require('mongoose');

const auditEventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    action: {type: String, enum: ['create', 'update', 'deletion'], required: true},
    action_target: {type: String, enum: ['project', 'error_code', 'login', 'logout'], required: true},
    action_target_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    action_value: {type: Array, require: false},
    actor_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true
    },
    actor_host: {type: String, require: true},
    event_timestamp: {type: Date, required: true}
});

module.exports = mongoose.model('audit', auditEventSchema);