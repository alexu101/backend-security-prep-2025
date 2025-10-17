export const typeDefs = `#graphql
    type User {
        id: Int!
        name: String!
        email: String!
        createdAt: String!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Query {
        users: [User!]!
        user(id: Int!): User
        me: User
    }

    type Mutation {
        register(name: String!, email: String!, password: String!): AuthPayload!
        login(email: String, password: String!): AuthPayload!
    }
`