import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { Mongoose } from 'mongoose';

import User from '../models/users.js';
import { CastError } from 'mongoose';

const resolvers = {
  Query: {
    async userGet(_, { ID }){
      try{
        const foundUser = await User.findById(ID);
        if(!foundUser){
          throw new GraphQLError("User doesnt exist.", {
            extensions: { code: 'USER_DOESNT_EXIST'}
          })
        }
        return foundUser;
      }catch(error){
        if(error.name === 'CastError'){
          throw new GraphQLError("Invalid ID.", {
            extensions: { code: 'INVALID_ID'}
          })
        }
        throw new GraphQLError("User fetch failed.", {
          extensions: { code: 'USER_FETCH_FAIL'}
        })
      }
    },
    async userGetLimit(_, { limit }){
      return User.find().limit(limit);
    },
  },

  Mutation: {
    async userRegister(_, { registerUserInput: { email, password, fname, lname, gender, birthDate, roles, status, createdOn } }){
      
      const oldUser = await User.findOne({ email });
      
      if(oldUser){
        throw new GraphQLError("A user already uses the email " + email, {
          extensions: { code: 'USER_ALREADY_EXISTS'}
        })
      }
      
      password = await bcrypt.hash(password, 10);

      const token = jwt.sign(
        { email },
        "UNSAFE_STRING",
        {
          expiresIn: "2h"
        }
      );

      
      const newUser =  new User({ email, password, fname, lname, gender, birthDate, roles, status, createdOn, token  });

      await newUser.save();

      return newUser;
    },

    async userUpdate(_, { ID, updateUserInput: { email, password, fname, lname, gender, birthDate, roles, status }}){
      try {
        const update = await User.findOneAndUpdate(
          { _id: ID }, 
          { 
            $set: { 
              email, 
              fname, 
              lname, 
              gender, 
              birthDate, 
            }
          }, 
          { new: true }
        );
      
        if(!update){
          throw new GraphQLError("Failed to update user.", {
            extensions: { code: 'UPDATE_USER_FAILED_1' }
          });
        }
        return update;
      
      } catch (error) {
        throw new GraphQLError("Failed to update user.", {
          extensions: { code: 'UPDATE_USER_FAILED_2' }
        });
      }
    },    

    async userDelete(_, { ID }) {
      await User.deleteOne({ _id: ID });
      
      return ID;
    },
    

    
    async userLogin(_, { loginUserInput: { email, password } }){

      const user = await User.findOne({ email });

      if(user){
        if(await bcrypt.compare(password, user.password)){
          const token = jwt.sign(
            { email },
            "UNSAFE_STRING",
            {
              expiresIn: "2h"
            }
          );
  
          user.token = token;
  
          return user;

        }else{
          throw new GraphQLError("Incorrect password.",{
            extensions: { code: 'INCORRECT_PASSWORD'}
          })

        }
      }else{
        throw new GraphQLError("Account not found.",{
          extensions: { code: 'ACCOUNT_NOT_FOUND'}
        })

      }
    },
  }
}

export default resolvers;