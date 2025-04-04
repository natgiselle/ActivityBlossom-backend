const { model, Schema } = require('mongoose');

const sustainabilityGoalSchema = new Schema({
    title: String,
    description: String,
    targetDate: String,
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: String
});

module.exports = model('SustainabilityGoal', sustainabilityGoalSchema); 