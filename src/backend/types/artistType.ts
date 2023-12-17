const artistType = `#graphql
  type Artist{
    _id: String,
    user: String,
    name: String,
    language:[String],
    followers: Int,
    countryOrigin: String,
    createdOn: String
  }

  input CreateInput{
    user: String,
    name: String,
    language:[String],
    followers: Int,
    countryOrigin: String,
    createdOn: String
  }

  type Query {
    artistGet(ID: ID!):Artist!
    artistGetLimit(limit: Int): [Artist]
    artistGetFollowersCount(ID: ID!):Int!
  }

  type Mutation {
    artistCreate(createInput: CreateInput): Artist
    artistUpdate(ID: ID!, createInput: CreateInput): Artist!
    artistDelete(ID: ID!): String!
  }
`

export default artistType;