const SustainabilityGoal = require('../../models/SustainabilityGoal');
const User = require('../../models/User');
const { AuthenticationError, UserInputError } = require('apollo-server');

module.exports = {
    Query: {
        async getSustainabilityGoals(_, { userId }) {
            try {
                const user = await User.findById(userId);
                if (!user) {
                    throw new Error('User not found');
                }
                const goals = await SustainabilityGoal.find({ userId }).sort({ createdAt: -1 });
                return goals;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getSustainabilityGoal(_, { goalId, userId }) {
            try {
                const user = await User.findById(userId);
                if (!user) {
                    throw new Error('User not found');
                }
                const goal = await SustainabilityGoal.findById(goalId);
                if (goal) {
                    if (goal.userId.toString() === userId) {
                        return goal;
                    } else {
                        throw new AuthenticationError('Action not allowed');
                    }
                } else {
                    throw new Error('Goal not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createSustainabilityGoal(_, { goalInput: { title, description, targetDate }, userId }) {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            if (title.trim() === '') {
                throw new UserInputError('Empty title', {
                    errors: {
                        title: 'Goal title must not be empty'
                    }
                });
            }

            const newGoal = new SustainabilityGoal({
                title,
                description,
                targetDate,
                completed: false,
                userId,
                createdAt: new Date().toISOString()
            });

            const goal = await newGoal.save();
            return goal;
        },
        async updateSustainabilityGoal(_, { goalId, goalInput: { title, description, targetDate }, userId }) {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            try {
                const goal = await SustainabilityGoal.findById(goalId);
                if (goal) {
                    if (goal.userId.toString() === userId) {
                        if (title.trim() === '') {
                            throw new UserInputError('Empty title', {
                                errors: {
                                    title: 'Goal title must not be empty'
                                }
                            });
                        }

                        goal.title = title;
                        goal.description = description;
                        goal.targetDate = targetDate;

                        await goal.save();
                        return goal;
                    } else {
                        throw new AuthenticationError('Action not allowed');
                    }
                } else {
                    throw new Error('Goal not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async deleteSustainabilityGoal(_, { goalId, userId }) {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            try {
                const goal = await SustainabilityGoal.findById(goalId);
                if (goal) {
                    if (goal.userId.toString() === userId) {
                        await goal.delete();
                        return 'Goal deleted successfully';
                    } else {
                        throw new AuthenticationError('Action not allowed');
                    }
                } else {
                    throw new Error('Goal not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async toggleGoalCompletion(_, { goalId, userId }) {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            try {
                const goal = await SustainabilityGoal.findById(goalId);
                if (goal) {
                    if (goal.userId.toString() === userId) {
                        goal.completed = !goal.completed;
                        await goal.save();
                        return goal;
                    } else {
                        throw new AuthenticationError('Action not allowed');
                    }
                } else {
                    throw new Error('Goal not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}; 