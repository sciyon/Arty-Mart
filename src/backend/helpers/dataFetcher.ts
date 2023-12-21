import { GraphQLError } from 'graphql';
import User from '../models/users.js';
import Address from '../models/address.js';
import Artist from '../models/artists.js';
import Artwork from '../models/artworks.js';

export async function fetchBuyer(buyerID) {
  try{
    const user = await User.findById(buyerID);
    if(!user){
      throw new GraphQLError("Buyer does not exist.", {
        extensions: { code: 'USER_DOESNT_EXIST'}
      })
    }
    return user;
  }catch(error){
    throw new GraphQLError("Buyer info fetch fail.", {
      extensions: { code: 'BUYER_FETCH_FAIL'}
    })
  }
}

export async function fetchAddress(addressID) {
  try {
    const result = await Address.findById(addressID);
    if(!result){
      throw new GraphQLError("User has no address found.", {
        extensions: { code: 'USER_ADDRESS_FETCH_ERROR_1'}
      })
    }
    return result;
  }catch (error) {
    throw new GraphQLError("Address info fetch fail.", {
      extensions: { code: 'ADDRESS_FETCH_FAIL'}
    })
  }
}

export async function fetchArtist(artistID){
  try {
    const artist = await Artist.findById(artistID);
    if(!artist){
      throw new GraphQLError("Artist does not exist.", {
        extensions: { code: 'ARTIST_DOESNT_EXIST'}
      })
    }
    return artist;
  } catch (error) {
    throw new GraphQLError("Artist info fetch fail.", {
      extensions: { code: 'ARTIST_FETCH_FAIL'}
    })
  }
}

export async function fetchArtwork(artworkID){
  try {
    const artworks = await Artwork.findById(artworkID);
    if(!artworks){
      throw new GraphQLError("Artwork does not exist.", {
        extensions: { code: 'ARTWORK_DOESNT_EXIST'}
      })
    }
    return artworks;
  } catch (error) {
    throw new GraphQLError("Artwork info fetch fail.", {
      extensions: { code: 'ARTWORK_FETCH_FAIL'}
    })
  }
}