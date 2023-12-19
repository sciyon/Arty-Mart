const addressType = `#graphql
  type Address{
    _id: String,
    user: String,
    isPrimary: Boolean,
    createdOn: String,
    street: String,
    city: String,
    stateOrProvince: String,
    zipCode: Int,
    country: String
  }

  input AddressInput{
    user: String,
    isPrimary: Boolean,
    createdOn: String,
    street: String,
    city: String,
    stateOrProvince: String,
    zipCode: Int,
    country: String
  }

  type Query{
    addressGetByUserID(userID: String!): [Address]
  }

  type Mutation{
    addressCreate(addressInput: AddressInput): Address!
    addressUpdate(ID: ID!, addressInput: AddressInput): Address
    addressDelete(ID: ID!): String
  }
`;

export default addressType;