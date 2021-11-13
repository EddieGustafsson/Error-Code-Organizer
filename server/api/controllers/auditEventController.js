const mongoose = require('mongoose');

const AuditEvent = require('../models/auditEventModel');

module.exports = {
    newAuditEvent: async(audit) => {

        const auditEvent = new AuditEvent({
            _id: new mongoose.Types.ObjectId(),
            action: audit.action,
            action_target: audit.action_target,
            action_target_id: audit.action_target_id,
            action_value: audit.action_value,
            actor_id: audit.actor_id,
            actor_host: audit.actor_host,
            event_timestamp: new Date()
        });

        auditEvent.save().then(result => {
            return true;
        })
        .catch(error => {
            console.log(error);
            return false;
        });
    }
};