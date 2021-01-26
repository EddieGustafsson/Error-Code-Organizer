const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type: String, required: true },
    username: {type: String, required: true },
    email: {type: String, required: true},
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    }],
    password: {type: String, required: true},
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('user', userSchema);