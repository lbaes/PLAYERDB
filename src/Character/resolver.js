const { UserInputError } = require('apollo-server');
const Character = require('./model');

module.exports = {
    Query: {
        // get a list of all the character in the database
        async getCharacters() {
            const characters = await Character.find();
            return characters;
        },

        // get the character with the specified id
        async getCharacter(_, { _id }, context, info) {
            const character = await Character.findById(_id);
            return character;
        }
    },

    Mutation: {

        // create a new character in the database
        async createCharacter(_, { createInput: { name, race, level } }, context, info) {
            const newCharacter = new Character({ name: name, race: race, level: level });
            const res = await newCharacter.save();
            return res
        },

        // delete a character with the specified id
        async deleteCharacter(_, { _id }, context, info) {
            console.log("Requested deletion of character with id: " + _id);
            const ret = await Character.findByIdAndDelete(_id).exec();
            return ret;
        }
    }

};