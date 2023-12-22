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