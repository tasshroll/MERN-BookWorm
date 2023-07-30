const { gql } = require('apollo-server-express');

// these typeDefs match the mongo models in ./models
// these are the objects that are returned when a user makes a query
const typeDefs = gql`

type User {
    _id : ID
    username : String
    email : String
    bookCount : Int
    savedBooks : [Book]
    }

type Book {
    bookId : ID!
    authors : [String]
    description : String
    title : String
    image : String
    link : String
    }

type Auth {
    token : ID
    user : User
}

input BookInfo {
    authors : [String], 
    description : String, 
    title : String, 
    bookId : String, 
    image: String, 
    link: String
}

type Query {
    me: User
    }

type Mutation {
    login (email : String, password : String) : Auth
    addUser(username : String, email: String, password: String) : Auth
    saveBook(bookData: BookInfo!): User
    removeBook(bookId : ID) : User
    }
`;

module.exports = typeDefs;