const artworkType = `#graphql
  type Artwork{
    _id: String,
    artist: String,
    title: String,
    type: String,
    categories: [String],
    description: String,
    tags: [String],
    createdOn: String,
    imageURL: String,
    videoURL: String,
    status: String,
    quantity: Int
  }

  input ArtworkInput {
    artist: String,
    title: String,
    type: String,
    categories: [String],
    description: String,
    tags: [String],
    createdOn: String,
    imageURL: String,
    videoURL: String,
    status: String,
    quantity: Int
  }

  input ArtworkByStatus {
    artist: String,
    status: String
  }

  type Query {

    artworkGetByLimit(limit: Int!): [Artwork]
    artworkGetByID(ID: ID!): Artwork
    artworkGetAllByArtist(artistID: String!): [Artwork]
    artworkGetAllByArtistAndStatus(artworkByStatus: ArtworkByStatus!): [Artwork]
    
  }

  type Mutation {

    artworkCreate(artworkInput: ArtworkInput): Artwork!
    artworkUpdate(ID: ID!, artworkInput: ArtworkInput): Artwork!
    artworkDelete(ID: ID!): String!
    
  }

`;

export default artworkType;