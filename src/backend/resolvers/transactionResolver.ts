import { GraphQLError } from 'graphql';

import Transaction from '../models/transaction.js';

const transactionResolver = {
  Query: {
    async transactionGetFromUser(_, { buyerID }){
      return Transaction.find({ 'buyerID': buyerID });
    },
 
    async transactionGetFromArtist(_, { artistID }){
      return Transaction.find({ 'artistID': artistID });
    },
 
    async transactionGetFromArtwork(_, { artworkID }){
      return Transaction.find({ 'artworkID': artworkID });
    },

    async transactionGetFromID(_, { ID }){
      return Transaction.findById(ID);
    }
  },
 
  Mutation: {
    async transactionCreate(_, { transactionInput: { buyerID, artworkID, artistID, total, status } }) {
      try {
        const newTransaction = new Transaction({
          buyerID, artworkID, artistID, total, status
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