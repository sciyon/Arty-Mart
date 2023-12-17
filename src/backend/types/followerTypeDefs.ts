const followerType = `#graphql
  type Follower{
    _id: String,
    user: String,
    artist: String,
    followedOn: String
  }

  input FollowerInput{
    user: String,
    artist: String,
    followedOn: String
  }

  type Query{
    followerGetAll(userID: ID!):[Follower]
  }

  type Mutation{
    followerCreate(followerInput: FollowerInput): Follower!
    followerDelete(ID: ID!): String!
  }
`;

export default followerType;