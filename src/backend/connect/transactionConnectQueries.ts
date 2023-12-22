import { gql } from "@apollo/client";
import { useAuth } from '../middleware/authContext.jsx';

export const GETBUYERTRANSACTION_QUERY = gql`
query TransactionGetFromUser($buyerID: String!) {
    transactionGetFromUser(buyerID: $buyerID) {
      _id
      buyerID
      artworkID
      artistID
      total
      status
      quantity
      address
    }
  }
`;

export const GETUSERTRANSACTION_QUERY = gql`
query TransactionGetFromID($id: ID!) {
    transactionGetFromID(ID: $id) {
      _id
      buyerID
      artworkID
      artistID
      total
      status
      quantity
      address
    }
  }
`;