const transactionType = `#graphql
  type Transaction {
    _id: String,
    buyerID: String,
    buyerAddressID: String,
    artworkID: String,
    artistID: String,
    artistAddressID: String,
    total: Int,
    status: String
  }
 
  input TransactionInput {
    buyerID: String,
    buyerAddressID: String,
    artworkID: String,
    artistID: String,
    artistAddressID: String,
    total: Int,
    status: String
  }
 
  type Query {
    transactionGetFromUser(buyerID: String!): [Transaction]
    transactionGetFromArtist(artistID: String!): [Transaction]
    transactionGetFromArtwork(artworkID: String!): [Transaction]
    transactionGetFromID(ID: ID!): Transaction
  }
 
  type Mutation {
    transactionCreate(transactionInput: TransactionInput): Transaction!
  }
`;

export default transactionType;