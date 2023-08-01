import { gql } from '@apollo/client';

// GraphQL query for "me" to return a user
export const GET_ME = gql`
query me {
  me {
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
    bookCount
  }
}
  `;



