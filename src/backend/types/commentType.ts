const commentType = `#graphql

  type Comment{
    _id: String,
    user: String,
    artwork: String,
    comment: String,
    madeOn: String,
    edited: Boolean,
    editedOn: String
  }

  input CommentInput{
    user: String,
    artwork: String,
    comment: String,
    madeOn: String,
    edited: Boolean,
    editedOn: String
  }

  type Query {
    commentGetAllFromUser(userID: String!): [Comment]
    commmentGetAllFromArtwork(artworkID: String!): [Comment]
  }

  type Mutation {
    commentCreate(commentInput: CommentInput): Comment!
    commentUpdate(ID: ID!, commentInput: CommentInput): Comment!
    commentDelete(ID: ID!): String!
  }

`

export default commentType;