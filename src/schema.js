const gql = require('graphql-tag');
const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require('lodash');

// Typedef and resolvers for a Character
const Character = require('./Character/type.js');
const CharacterResolver = require('./Character/resolver.js');


// Typedef and resolver for a User
const User = require('./User/type.js');
const UserResolver = require('./User/resolver.js');


// The typedef and resolvers above will be merged here
const typedefs = gql`
    type Query {
        _empty: String
    }
    type Mutation {
        _empty: String
    }
`;

const resolvers = {};


// Merge all typedefs and resolvers in schema
const schema = makeExecutableSchema({
    typeDefs: [typedefs, User, Character],
    resolvers: merge(resolvers, UserResolver, CharacterResolver)
})


module.exports = schema;