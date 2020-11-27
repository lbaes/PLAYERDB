const gql = require('graphql-tag');

const typeDefs = gql`

    type User {
        id: ID!,
        username: String!
    }

    input CreateUserInput {
        username: String!,
        password: String!,
        confirm_password: String!
    }

    input loginUserInput {
        username: String!,
        password: String!
    }

    extend type Query {
        getUsers: [User],
        getUser(_id: ID!): User
    }

    extend type Mutation {
        createUser(createUserInput: CreateUserInput!) : User
        deleteUser(_id: ID!): User
        loginUser(loginUserInput: loginUserInput!) : User
    }
`;


module.exports = typeDefs;