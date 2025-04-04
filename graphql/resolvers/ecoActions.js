const EcoAction = require('../../models/EcoAction');
const Task = require('../../models/Task');
const checkAuth = require('../../util/check-auth');
const { AuthenticationError, UserInputError } = require('apollo-server');

module.exports = {
    Query: {
        async getEcoActions(_, { userId }, context) {
            try {
                const user = checkAuth(context);
                const ecoActions = await EcoAction.find({ userId })
                    .sort({ createdAt: -1 })
                    .populate('taskId');
                return ecoActions;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async recordEcoAction(_, { taskId, description, impact }, context) {
            const user = checkAuth(context);

            if (description.trim() === '') {
                throw new UserInputError('Empty description', {
                    errors: {
                        description: 'Eco action description must not be empty'
                    }
                });
            }

            try {
                const task = await Task.findById(taskId);
                if (!task) {
                    throw new Error('Task not found');
                }

                if (task.userId.toString() !== user.id) {
                    throw new AuthenticationError('Action not allowed');
                }

                const newEcoAction = new EcoAction({
                    taskId,
                    description,
                    impact,
                    userId: user.id,
                    createdAt: new Date().toISOString()
                });

                const ecoAction = await newEcoAction.save();
                return ecoAction;
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}; 