const reviewType = `#graphql

  type Review{
    _id: String,
    artwork: String,
    user: String,
    rating: Int,
    title: String,
    body: String,
    createdOn: String,
    modified: Boolean,
    modifiedOn: String,
    imageURL: String,
    videoURL: String,
    status: String
  }

  input ReviewInput{
    artwork: String,
    user: String,
    rating: Int,
    title: String,
    body: String,
    createdOn: String,
    modified: Boolean,
    modifiedOn: String,
    imageURL: String,
    videoURL: String,
    status: String
  }

  type Query {
    reviewGetAllFromUser(userID: String!): [Review]
    reviewGetAllFromArtwork(artworkID: String!): [Review]
  }

  type Mutation {
    reviewCreate(reviewInput: ReviewInput): Review!
    reviewUpdate(ID: ID!, reviewInput: ReviewInput): Review!
    reviewDelete(ID: ID!): String!
  }

`

export default reviewType;