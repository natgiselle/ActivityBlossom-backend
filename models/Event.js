const { model, Schema } = require('mongoose');

const eventSchema = new Schema({
    title: String,
    description: String,
    startDate: String,
    endDate: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: String
});

module.exports = model('Event', eventSchema); 