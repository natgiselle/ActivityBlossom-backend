const Event = require('../../models/Event');
const checkAuth = require('../../util/check-auth');
const { AuthenticationError, UserInputError } = require('apollo-server');

module.exports = {
    Query: {
        async getEvents(_, { userId }, context) {
            try {
                const user = checkAuth(context);
                const events = await Event.find({ userId }).sort({ startDate: 1 });
                return events;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getEvent(_, { eventId }, context) {
            try {
                const user = checkAuth(context);
                const event = await Event.findById(eventId);
                if (event) {
                    if (event.userId.toString() === user.id) {
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
        async createEvent(_, { eventInput: { title, description, startDate, endDate } }, context) {
            const user = checkAuth(context);

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
                userId: user.id,
                createdAt: new Date().toISOString()
            });

            const event = await newEvent.save();
            return event;
        },
        async updateEvent(_, { eventId, eventInput: { title, description, startDate, endDate } }, context) {
            const user = checkAuth(context);

            try {
                const event = await Event.findById(eventId);
                if (event) {
                    if (event.userId.toString() === user.id) {
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
        async deleteEvent(_, { eventId }, context) {
            const user = checkAuth(context);

            try {
                const event = await Event.findById(eventId);
                if (event) {
                    if (event.userId.toString() === user.id) {
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