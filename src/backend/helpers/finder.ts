import { GraphQLError } from 'graphql';
import User from '../models/users.js';
import Address from '../models/address.js';

export async function artistAddressFinder(artistID) {
  try{
    const artist = await User.findById(artistID);
    if(!artist){
      throw new GraphQLError("Artist does not exist.", {
        extensions: { code: 'ARTIST_DOESNT_EXIST'}
      })
    }

    const result = await Address.findOne({ user: artistID });
    if(!result){
      throw new GraphQLError("Error in getting the first address from artist.", {
        extensions: { code: 'ARTIST_ADDRESS_FETCH_ERROR_1'}
      })
    }
    return result;

  }catch(error){
    throw new GraphQLError("Error in getting the first address from artist." + error, {
      extensions: { code: 'ARTIST_ADDRESS_FETCH_ERROR_2'}
    })
  }
}
