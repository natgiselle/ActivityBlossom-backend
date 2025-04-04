const User = require('../../models/User');
const { UserInputError } = require('apollo-server');

module.exports = {
    Query: {
        async getUser(_, { email, password }) {
            try {
                const user = await User.findOne({ email, password });
                if (user) {
                    return user;
                } else {
                    throw new Error('User not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async getUsers() {
            try {
                const users = await User.find();
                return users;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async login(_, { email, password }) {
            const user = await User.findOne({ email, password });

            if (!user) {
                throw new UserInputError('Invalid credentials');
            }

            return user;
        },
        async register(_, { email, password }) {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                throw new UserInputError('Email is already registered');
            }

            const newUser = new User({
                email,
                password,
                createdAt: new Date().toISOString(),
                avatarFlower: 'default'
            });

            const res = await newUser.save();
            return res;
        }
    }
}; 