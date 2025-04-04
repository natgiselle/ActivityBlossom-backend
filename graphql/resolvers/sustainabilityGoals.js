const SustainabilityGoal = require('../../models/SustainabilityGoal');
const checkAuth = require('../../util/check-auth');
const { AuthenticationError, UserInputError } = require('apollo-server');

module.exports = {
    Query: {
        async getSustainabilityGoals(_, { userId }, context) {
            try {
                const user = checkAuth(context);
                const goals = await SustainabilityGoal.find({ userId }).sort({ createdAt: -1 });
                return goals;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getSustainabilityGoal(_, { goalId }, context) {
            try {
                const user = checkAuth(context);
                const goal = await SustainabilityGoal.findById(goalId);
                if (goal) {
                    if (goal.userId.toString() === user.id) {
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
        async createSustainabilityGoal(_, { goalInput: { title, description, targetDate } }, context) {
            const user = checkAuth(context);

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
                userId: user.id,
                createdAt: new Date().toISOString()
            });

            const goal = await newGoal.save();
            return goal;
        },
        async updateSustainabilityGoal(_, { goalId, goalInput: { title, description, targetDate } }, context) {
            const user = checkAuth(context);

            try {
                const goal = await SustainabilityGoal.findById(goalId);
                if (goal) {
                    if (goal.userId.toString() === user.id) {
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
        async deleteSustainabilityGoal(_, { goalId }, context) {
            const user = checkAuth(context);

            try {
                const goal = await SustainabilityGoal.findById(goalId);
                if (goal) {
                    if (goal.userId.toString() === user.id) {
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
        async toggleGoalCompletion(_, { goalId }, context) {
            const user = checkAuth(context);

            try {
                const goal = await SustainabilityGoal.findById(goalId);
                if (goal) {
                    if (goal.userId.toString() === user.id) {
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