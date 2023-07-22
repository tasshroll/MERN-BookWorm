const { gql } = require('apollo-server-express');

// these typeDefs match the mongo models in ./models
const typeDefs = gql`

type User {
    _id : ID
    username : String
    email : String
    bookCount : Int
    savedBooks : [Book]
    },

type Book {
    bookId : String
    authors : [String]
    description : String
    title : String
    image : String
    link : String
    },

type Auth {
    token : String
    user : User
    },

type Query {
    me (userId : ID) : User
    },

input BookInfo {
    authors : [String], 
    description : String, 
    title : String, 
    bookId : String, 
    image: String, 
    link: String
    },

type Mutation {
    login (email : String, password : String) : User
    addUser(username : String, password: String) : User
    saveBook(bookInfo : BookInfo) : Book
    removeBook(bookId : ID, userId : ID) : Book
    },
`;

module.exports = typeDefs;