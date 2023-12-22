import { GraphQLError } from 'graphql';

import Transaction from '../models/transaction.js';
import User from '../models/users.js';
import Artwork from '../models/artworks.js';

const transactionResolver = {
  Query: {
    async transactionGetFromUser(_, { buyerID }){
      const user = await User.findById(buyerID);
      if(!user){
        throw new GraphQLError("User does not exist.", {
          extensions: { code: 'USER_DOESNT_ARTIST'}
        })
      }

      try {
        return Transaction.find({ 'buyerID': buyerID });
      } catch (error) {
        throw new GraphQLError("Failed to get t ransactions from buyer.", {
          extensions: { code: 'BUYER_TRANSACTION_FETCH_FAIL'}
        })
      }
    },
 
    async transactionGetFromArtist(_, { artistID }){
      const user = await User.findById(artistID);
      if(!user){
        throw new GraphQLError("Artist does not exist.", {
          extensions: { code: 'ARTIST_DOESNT_ARTIST'}
        })
      }

      try{
        return Transaction.find({ 'artistID': artistID });
      }catch(error){
        throw new GraphQLError("Failed to get transactions from artist.", {
          extensions: { code: 'ARTIST_TRANSACTION_FETCH_FAIL'}
        })
      }
    },
 
    async transactionGetFromArtwork(_, { artworkID }){
      const artwork = Artwork.findById(artworkID)
      if(!artwork){
        throw new GraphQLError("Artwork does not exist.", {
          extensions: { code: 'ARTWORK_DOESNT_ARTIST'}
        })
      }

      try {
        return Transaction.find({ 'artworkID': artworkID });
      } catch (error) {
        throw new GraphQLError("Failed to get transactions from artwork.", {
          extensions: { code: 'ARTWORK_TRANSACTION_FETCH_FAIL'}
        })
      }
    },

    async transactionGetFromID(_, { ID }){
      try {
        return Transaction.findById(ID);
      } catch (error) {
        throw new GraphQLError("Failed to get transaction from ID.", {
          extensions: { code: 'ID_TRANSACTION_FETCH_FAIL'}
        })
      }
    }
  },
 
  Mutation: {
    async transactionCreate(_, { transactionInput: { buyerID, artworkID, artistID, total, status, address, quantity } }) {
      try {
        const newTransaction = new Transaction({
          buyerID, artworkID, artistID, total, status, address, quantity
        })
    
        // Save the populated transaction
        const savedTransaction = await newTransaction.save();
  
        if(!savedTransaction){
          throw new GraphQLError("Error in creating transaction.", {
            extensions: { code: 'TRANSACTION_CREATION_ERROR_1' },
          });
        }
        return savedTransaction;
      } catch (error) {
        throw new GraphQLError("Error in creating transaction." + error, {
          extensions: { code: 'TRANSACTION_CREATION_ERROR_2' },
        });
      }
    }
  }  
}

export default transactionResolver;