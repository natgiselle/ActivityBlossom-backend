const { model, Schema } = require('mongoose');

const ecoActionSchema = new Schema({
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    description: String,
    impact: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: String
});

module.exports = model('EcoAction', ecoActionSchema); 