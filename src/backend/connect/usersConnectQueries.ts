import { gql } from "@apollo/client";

export const GETUSER_QUERY = gql`
  query UserGet($id: ID!) {
    userGet(ID: $id) {
      _id
      email
      fname
      lname
      profileURL
      gender
      birthDate
      role
      status
      createdOn
    }
  }
`;

export const GETALLUSER_QUERY = gql`
  query UserGetLimit($limit: Int) {
    userGetLimit(limit: $limit) {
      _id
      email
      password
      token
      fname
      lname
      profileURL
      gender
      birthDate
      role
      status
      createdOn
    }
  }
`;
