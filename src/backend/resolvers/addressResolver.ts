import { GraphQLError } from 'graphql';

import User from '../models/users.js';
import Address from '../models/address.js';

const addressResolver = {
  Query:{
    async addressGetByUserID(_, { userID }){
      try{

        const user = await User.findById(userID);
        if(!user){
          throw new GraphQLError("User does not exist.", {
            extensions: { code: 'USER_DOESNT_EXIST'}
          })
        }

        const result = Address.find({ user: userID });
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
  },

  Mutation:{
    async addressCreate(_, { addressInput: { user, isPrimary, createdOn, street, city, stateOrProvince, zipCode, country } }){

      const userCheck = await User.findById(user);
      if(!userCheck){
        throw new GraphQLError("User does not exist.", {
          extensions: { code: 'USER_DOESNT_EXIST_1'}
        });
      }

      const newAddress = new Address({ 
        user, 
        isPrimary, 
        createdOn: new Date(createdOn), 
        street, 
        city, 
        stateOrProvince, 
        zipCode: Number(zipCode), 
        country 
      });

      try {
        const saved = await newAddress.save();
        if (!saved) {
          throw new GraphQLError("Failed to create address.", {
            extensions: { code: 'CREATE_ADDRESS_FAILED_1' }
          });
        }
        return saved;

      } catch (error) {
        throw new GraphQLError("Failed to create address.", {
          extensions: { code: 'CREATE_ADDRESS_FAILED_2' }
        });
      }
    },

    async addressUpdate(_, { ID, addressInput: { user, isPrimary, createdOn, street, city, stateOrProvince, zipCode, country }}){
      try {
        const update = await Address.findOneAndUpdate(
          { _id: ID }, 
          { $set: { user, isPrimary, createdOn, street, city, stateOrProvince, zipCode, country }}, 
          { new: true }
        );
      
        if(!update){
          throw new GraphQLError("Failed to update address.", {
            extensions: { code: 'UPDATE_ADDRESS_FAILED_1' }
          });
        }
        return update;
      
      } catch (error) {
        throw new GraphQLError("Failed to update address.", {
          extensions: { code: 'UPDATE_ADDRESS_FAILED_2' }
        });
      }
    },
    
    async addressDelete(_, { ID }) {
      await Address.deleteOne({ _id: ID });
      
      return ID;
    }
  }
}

export default addressResolver;