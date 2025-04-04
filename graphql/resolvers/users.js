const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const { UserInputError } = require('apollo-server');

module.exports = {
    Query: {
        async getUser(_, { email, password }) {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error('User not found');
                }

                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    throw new Error('Invalid password');
                }

                return user;
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
            const user = await User.findOne({ email });

            if (!user) {
                throw new UserInputError('Invalid credentials');
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                throw new UserInputError('Invalid credentials');
            }

            return user;
        },
        async register(_, { email, password }) {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                throw new UserInputError('Email is already registered');
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                password: hashedPassword,
                createdAt: new Date().toISOString(),
                avatarFlower: 'default'
            });

            const res = await newUser.save();
            return res;
        }
    }
}; 