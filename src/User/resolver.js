const { UserInputError } = require('apollo-server');
const User = require('./model');
const bcrypt = require('bcrypt');


module.exports = {
    Query: {
        // get a list of all the Users in the database
        async getUsers() {
            const users = await User.find();
            return users;
        },

        // get the users with the specified id
        async getUser(_, { _id }, context, info) {
            const user = await User.findById(_id);
            return user;
        }
    },

    Mutation: {

        // create a new User in the database
        async createUser(_, { createUserInput: { username, password, confirm_password } }, context, info) {
            const newUser = new User({ username, password, confirm_password });
            let res;

            if (password != confirm_password) {
                throw new UserInputError("Passwords must match.", {
                    error: {
                        password: 'Password and Confirm Password must match',
                    }
                })
            }
            // await throws an error if the promise doesn't resolve
            try {
                res = await newUser.save();
            } catch (err) {
                console.log(err);
                throw new UserInputError("This username was already taken.", {
                    error: {
                        username: 'This username was already taken.'
                    }
                })
            }

            return res
        },

        // delete a user with the specified id
        async deleteUser(_, { _id }, context, info) {
            let ret;
            // Mongoose queries (find, findOne, ...) are not promises but they support await
            // it is possible to use .exec() to make a real promise

            console.log("Requested deletion of user with id: " + _id);
            ret = await User.findOneAndDelete(_id).exec();

            // check if the document was found in the database
            if (ret) {
                console.log("User " + ret.username + " with id: " + ret._id + " was deleted successfully")
            } else {
                console.log("Deletion of user with id: " + _id + " failed, id does not exist")
            }

            return ret;
        },

        // login the user and return a authentication token
        async loginUser(_, { loginUserInput: { username, password } }, context, info) {
            const user = await User.findOne({ username: username }).exec();

            if (user) {

                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    console.log("User Auth error, password did not match");
                    throw new UserInputError("wrong password");
                }
            }

            //TODO generate and return Auth Token
            return user
        }
    }

};