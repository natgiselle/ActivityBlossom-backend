const EcoAction = require('../../models/EcoAction');
const User = require('../../models/User');
const { AuthenticationError, UserInputError } = require('apollo-server');

module.exports = {
    Query: {
        async getEcoActions(_, { userId }) {
            try {
                const user = await User.findById(userId);
                if (!user) {
                    throw new Error('User not found');
                }
                const ecoActions = await EcoAction.find({ userId }).sort({ createdAt: -1 });
                return ecoActions;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async recordEcoAction(_, { taskId, description, impact, userId }) {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            if (description.trim() === '') {
                throw new UserInputError('Empty description', {
                    errors: {
                        description: 'Eco action description must not be empty'
                    }
                });
            }

            const newEcoAction = new EcoAction({
                taskId,
                description,
                impact,
                userId,
                createdAt: new Date().toISOString()
            });

            const ecoAction = await newEcoAction.save();
            return ecoAction;
        }
    }
}; 