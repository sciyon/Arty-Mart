const artistType = `#graphql

  type Artist{
    _id: String,
    user: String,
    name: String,
    language:[String],
    followers: Int,
    countryOrigin: String,
    address: String,
    createdOn: String,
  }

  input ArtistInput{
    user: String,
    name: String,
    language:[String],
    followers: Int,
    countryOrigin: String,
    address: String,
    createdOn: String
  }

  type Query {
    artistGet(ID: ID!):Artist!
    artistGetLimit(limit: Int): [Artist]!
    artistGetFollowersCount(ID: ID!):Int!
  }

  type Mutation {
    artistCreate(artistInput: ArtistInput): Artist!
    artistUpdate(ID: ID!, artistInput: ArtistInput): Artist!
    artistDelete(ID: ID!): String!
  }
`

export default artistType;