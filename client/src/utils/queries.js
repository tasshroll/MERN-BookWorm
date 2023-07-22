import { gql } from '@apollo/client';

// GraphQL query for "me" to return a user
export const GET_ME = gql`
  query me {
    users {
      _id
      name
      email
      savedBooks
    }
  }
`;