const Task = require('../../models/Task');
const User = require('../../models/User');
const { AuthenticationError, UserInputError } = require('apollo-server');

module.exports = {
    Query: {
        async getTasks(_, { userId }) {
            try {
                const user = await User.findById(userId);
                if (!user) {
                    throw new Error('User not found');
                }
                const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
                return tasks;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getTask(_, { taskId, userId }) {
            try {
                const user = await User.findById(userId);
                if (!user) {
                    throw new Error('User not found');
                }
                const task = await Task.findById(taskId);
                if (task) {
                    if (task.userId.toString() === userId) {
                        return task;
                    } else {
                        throw new AuthenticationError('Action not allowed');
                    }
                } else {
                    throw new Error('Task not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createTask(_, { taskInput: { title, description, dueDate, isEcoFriendly }, userId }) {
            // First verify the user exists
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            if (title.trim() === '') {
                throw new UserInputError('Empty title', {
                    errors: {
                        title: 'Task title must not be empty'
                    }
                });
            }

            const newTask = new Task({
                title,
                description,
                dueDate,
                completed: false,
                isEcoFriendly,
                userId,
                createdAt: new Date().toISOString()
            });

            const task = await newTask.save();
            return task;
        },
        async updateTask(_, { taskId, taskInput: { title, description, dueDate, isEcoFriendly }, userId }) {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            try {
                const task = await Task.findById(taskId);
                if (task) {
                    if (task.userId.toString() === userId) {
                        if (title.trim() === '') {
                            throw new UserInputError('Empty title', {
                                errors: {
                                    title: 'Task title must not be empty'
                                }
                            });
                        }

                        task.title = title;
                        task.description = description;
                        task.dueDate = dueDate;
                        task.isEcoFriendly = isEcoFriendly;

                        await task.save();
                        return task;
                    } else {
                        throw new AuthenticationError('Action not allowed');
                    }
                } else {
                    throw new Error('Task not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async deleteTask(_, { taskId, userId }) {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            try {
                const task = await Task.findById(taskId);
                if (task) {
                    if (task.userId.toString() === userId) {
                        await Task.deleteOne({ _id: taskId });
                        return 'Task deleted successfully';
                    } else {
                        throw new AuthenticationError('Action not allowed');
                    }
                } else {
                    throw new Error('Task not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async toggleTaskCompletion(_, { taskId, userId }) {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            try {
                const task = await Task.findById(taskId);
                if (task) {
                    if (task.userId.toString() === userId) {
                        task.completed = !task.completed;
                        await task.save();
                        return task;
                    } else {
                        throw new AuthenticationError('Action not allowed');
                    }
                } else {
                    throw new Error('Task not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}; 