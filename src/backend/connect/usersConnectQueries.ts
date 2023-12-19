import { gql } from "@apollo/client";

export const GETUSER_QUERY = gql`
  query UserGet($id: ID!) {
    userGet(ID: $id) {
      _id
      email
      fname
      lname
      gender
      birthDate
      roles
      status
      createdOn
    }
  }
`;
