import { gql } from '@apollo/client';

// GraphQL query for "me" to return a user
export const GET_ME = gql`
  query 
  me {
    _id
    username
    email
    savedBooks {
      bookId
      authors
      image
      description
      title
      link
    }
  }
  `;


  // me {
  //   users {
  //     _id
  //     name
  //     email
  //     savedBooks
  //   }
  // }


