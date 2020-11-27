const gql = require('graphql-tag');

const typeDefs = gql`
    type Character {
        id: ID!,
        name: String!,
        race: String!,
        level: Int!
    }

    input CreateInput {
        name: String!,
        race: String!,
        level: Int!
    }

    extend type Query {
        getCharacters: [Character],
        getCharacter(_id: ID!): Character
    }

    extend type Mutation {
        createCharacter(createInput: CreateInput!) : Character!
        deleteCharacter(_id: ID!): Character
    }
`;


module.exports = typeDefs;