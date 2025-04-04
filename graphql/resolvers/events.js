const Event = require('../../models/Event');
const User = require('../../models/User');
const { AuthenticationError, UserInputError } = require('apollo-server');

module.exports = {
    Query: {
        async getEvents(_, { userId }) {
            try {
                const user = await User.findById(userId);
                if (!user) {
                    throw new Error('User not found');
                }
                const events = await Event.find({ userId }).sort({ startDate: 1 });
                return events;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getEvent(_, { eventId, userId }) {
            try {
                const user = await User.findById(userId);
                if (!user) {
                    throw new Error('User not found');
                }
                const event = await Event.findById(eventId);
                if (event) {
                    if (event.userId.toString() === userId) {
                        return event;
                    } else {
                        throw new AuthenticationError('Action not allowed');
                    }
                } else {
                    throw new Error('Event not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createEvent(_, { eventInput: { title, description, startDate, endDate }, userId }) {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            if (title.trim() === '') {
                throw new UserInputError('Empty title', {
                    errors: {
                        title: 'Event title must not be empty'
                    }
                });
            }

            const newEvent = new Event({
                title,
                description,
                startDate,
                endDate,
                userId,
                createdAt: new Date().toISOString()
            });

            const event = await newEvent.save();
            return event;
        },
        async updateEvent(_, { eventId, eventInput: { title, description, startDate, endDate }, userId }) {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            try {
                const event = await Event.findById(eventId);
                if (event) {
                    if (event.userId.toString() === userId) {
                        if (title.trim() === '') {
                            throw new UserInputError('Empty title', {
                                errors: {
                                    title: 'Event title must not be empty'
                                }
                            });
                        }

                        event.title = title;
                        event.description = description;
                        event.startDate = startDate;
                        event.endDate = endDate;

                        await event.save();
                        return event;
                    } else {
                        throw new AuthenticationError('Action not allowed');
                    }
                } else {
                    throw new Error('Event not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async deleteEvent(_, { eventId, userId }) {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            try {
                const event = await Event.findById(eventId);
                if (event) {
                    if (event.userId.toString() === userId) {
                        await event.delete();
                        return 'Event deleted successfully';
                    } else {
                        throw new AuthenticationError('Action not allowed');
                    }
                } else {
                    throw new Error('Event not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}; 