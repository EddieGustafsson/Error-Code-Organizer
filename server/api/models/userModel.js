const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type: String, required: true },
    username: {type: String, required: true },
    email: {type: String, required: true},
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    }],
    bio: {type: String, default: '' },
    url: {type: String, default: '' },
    location: {type: String, default: '' },
    settings: {
        theme: {type: String, enum: ['light', 'dark'], default: 'light'},
        show_projects: {type: Boolean, default: true }
    },
    password: {type: String, required: true},
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('user', userSchema);