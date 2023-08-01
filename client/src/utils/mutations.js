import { gql } from '@apollo/client';

// Define GraphQL mutations to correspond specific actions 
// that are performed on the server-side data. 
// Server Resolvers 
export const LOGIN_USER = gql`
mutation login($email: String, $password: String) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      email
      username
    }
  }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String, $email: String, $password: String) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      email
      username
    }
  }
}
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInfo!) {
    saveBook(bookData: $bookData) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
mutation Mutation($bookId: ID) {
  removeBook(bookId: $bookId) {
    _id
    email
    username
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
  }
}
`;