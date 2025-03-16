const { model, Schema } = require('mongoose');

const taskSchema = new Schema({
    title: String,
    description: String,
    dueDate: String,
    completed: {
        type: Boolean,
        default: false
    },
    isEcoFriendly: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: String
});

module.exports = model('Task', taskSchema); 