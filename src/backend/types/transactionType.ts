const transactionType = `#graphql
  type Transaction {
    _id: String,
    buyerID: String,
    artworkID: String,
    artistID: String,
    total: Int,
    status: String,
    quantity: Int,
    address: String
  }
 
  input TransactionInput {
    buyerID: String,
    artworkID: String,
    artistID: String,
    total: Int,
    status: String,
    quantity: Int,
    address: String
  }
 
  input UpdateTransactionInput{
    buyerID: String,
    artworkID: String,
    artistID: String,
    total: Int,
    status: String,
    quantity: Int,
    address: String
}

  type Query {
    transactionGetFromUser(buyerID: String!): [Transaction]
    transactionGetFromArtist(artistID: String!): [Transaction]
    transactionGetFromArtwork(artworkID: String!): [Transaction]
    transactionGetFromID(ID: ID!): Transaction
  }
 
  type Mutation {
    transactionCreate(transactionInput: TransactionInput): Transaction!
    transactionUpdate(ID: ID!, updateTransactionInput: UpdateTransactionInput): Transaction
  }
`;

export default transactionType;