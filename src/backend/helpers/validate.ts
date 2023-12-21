import { GraphQLError } from 'graphql';
import User from '../models/users.js';
import Address from '../models/address.js';
import Artist from '../models/artists.js';
import Artwork from '../models/artworks.js';

export async function validateUser(userID) {
  const user = await User.findById(userID);
  if(!user){
    throw new GraphQLError("User does not exist.", {
      extensions: { code: 'USER_DOESNT_EXIST'}
    })
  }
  return user;
}

export async function validateAddress(userID) {
  try{
    const user = await validateUser(userID);

    const result = await Address.findOne({ user: userID });
    if(!result){
      throw new GraphQLError("Error in getting all addresses from user.", {
        extensions: { code: 'USER_ADDRESS_FETCH_ERROR_1'}
      })
    }
    return result;

  }catch(error){
    throw new GraphQLError("Error in getting all addresses from user.", {
      extensions: { code: 'USER_ADDRESS_FETCH_ERROR_2'}
    })
  }
}

export async function validateArtist(artistID){
  try {
    const artist = await Artist.findById(artistID);
    if(!artist){
      throw new GraphQLError("Artist does not exist.", {
        extensions: { code: 'ARTIST_DOESNT_EXIST'}
      })
    }
    return artist;
    
  } catch (error) {
    throw new GraphQLError("Artist does not exist.", {
      extensions: { code: 'ARTIST_DOESNT_EXIST'}
    })
  }
}

export async function validateArtwork(artworkID){

  try {
    const artworks = await Artwork.findById(artworkID);
    if(!artworks){
      throw new GraphQLError("Artwork does not exist.", {
        extensions: { code: 'ARTWORK_DOESNT_EXIST'}
      })
    }
    return artworks;

  } catch (error) {
    throw new GraphQLError("Error in fetching artist's artworks.", {
      extensions: { code: 'ARTWORK_FETCH_ERROR'}
    })
  }
}