const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!User) {
                throw new AuthenticationError('No user with this email');
            }

            const correctPw = await User.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user }
        },

        saveBook: async (parent, { authors, description, title, bookId, image, link }) => {
            const book = await User.findOneAndUpdate(
                { _id: userId },
                {
                    $addToSet:
                        { savedBooks: { authors, description, title, bookId, image, link } }
                }
            );
        },
        removeBook: async (parent, { bookId, userId }) => {
            const book = await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            );
        },
    },
};

module.exports = resolvers;