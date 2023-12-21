const artworkType = `#graphql

  type Artwork{
    _id: String,
    artist: String,
    title: String,
    type: String,
    categories: String,
    description: String,
    createdOn: String,
    imageURL: [String],
    videoURL: String,
    status: String,
    price: Int,
    quantity: Int,
    likes: [String]
  }

  input ArtworkInput {
    artist: String,
    title: String,
    type: String,
    categories: String,
    description: String,
    createdOn: String,
    imageURL: [String],
    videoURL: String,
    status: String,
    price: Int,
    quantity: Int
  }

  input ArtworkByStatus {
    artist: String,
    status: String
  }

  input LikeInput{
    userID: String,
    artworkID: String
  }

  type LikesType{
    likes: [String]
  }

  type Query {
    artworkGetByLimit(limit: Int!): [Artwork]
    artworkGetByID(ID: ID!): Artwork
    artworkGetAllByArtist(artistID: String!): [Artwork]
    artworkGetAllByArtistAndStatus(artworkByStatus: ArtworkByStatus!): [Artwork]
    artworkGetAllLikes(ID: ID!): LikesType
    artworkGetAllLiked(userID: String!): [Artwork]
  }

  type Mutation {
    artworkCreate(artworkInput: ArtworkInput): Artwork!
    artworkUpdate(ID: ID!, artworkInput: ArtworkInput): Artwork!
    artworkDelete(ID: ID!): String!
    likeArtworkAdd(likeInput: LikeInput): Artwork!
    likeArtworkRemove(likeInput: LikeInput): Artwork!
  }
`;

export default artworkType;