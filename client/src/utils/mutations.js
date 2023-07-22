import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login ($username: String!, email: String, password: String) {
    login(username: $username, email: $email, password: $password) {
      _id
      username
      email
      password
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser($username: String!, email: String, password: String) {
    addUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
      password
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($authors: [String], description: String, title: String, bookId: String, image: String, link: String) {
    saveBook (authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
      authors
      description
      title
      bookId
      image
      link
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($_id: ID!, bookId: String) {
    removeBook (_id: $_id, bookId: $bookId) {
      _id
      bookId
    }
  }
`;