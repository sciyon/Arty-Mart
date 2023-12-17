const likeType = `#graphql
  type Like{
    _id: String,
    user: String,
    artwork: String,
    likedOn: String
  }

  type LikedInput{
    artwork: String,
  }

  type LikerInput{
    user: String,
  }

  input LikeInput{
    user: String,
    artwork: String,
    likedOn: String
  }

  type Query{
    likeGetAllLiked(userID: String!):[LikedInput]
    likeGetAllLiker(artworkID: ID!):[LikerInput]
  }

  type Mutation{
    likeCreate(likeInput: LikeInput): Like!
    likeDelete(ID: ID!): String!
  }
`;

export default likeType;