const Task = require('../../models/Task');
const checkAuth = require('../../util/check-auth');
const { AuthenticationError, UserInputError } = require('apollo-server');

module.exports = {
    Query: {
        async getTasks(_, { userId }, context) {
            try {
                const user = checkAuth(context);
                const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
                return tasks;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getTask(_, { taskId }, context) {
            try {
                const user = checkAuth(context);
                const task = await Task.findById(taskId);
                if (task) {
                    if (task.userId.toString() === user.id) {
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
        async createTask(_, { taskInput: { title, description, dueDate, isEcoFriendly } }, context) {
            const user = checkAuth(context);

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
                userId: user.id,
                createdAt: new Date().toISOString()
            });

            const task = await newTask.save();
            return task;
        },
        async updateTask(_, { taskId, taskInput: { title, description, dueDate, isEcoFriendly } }, context) {
            const user = checkAuth(context);

            try {
                const task = await Task.findById(taskId);
                if (task) {
                    if (task.userId.toString() === user.id) {
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
        async deleteTask(_, { taskId }, context) {
            const user = checkAuth(context);

            try {
                const task = await Task.findById(taskId);
                if (task) {
                    if (task.userId.toString() === user.id) {
                        await task.delete();
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
        async toggleTaskCompletion(_, { taskId }, context) {
            const user = checkAuth(context);

            try {
                const task = await Task.findById(taskId);
                if (task) {
                    if (task.userId.toString() === user.id) {
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