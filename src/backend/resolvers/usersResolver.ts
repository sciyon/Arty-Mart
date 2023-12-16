import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

import User from '../models/users.js';

const resolvers = {
  Query: {
    async getUser(_, { ID }){
      return User.findById(ID);
    },
    async getUsers(_, { limit }){
      return User.find().limit(limit);
    },
  },

  Mutation: {
    async userRegister(_, { registerUserInput: { email, password, fname, lname, birthDate, roles, status, createdOn } }){
      
      const oldUser = await User.findOne({ email });
      
      if(oldUser){
        throw new GraphQLError("A user already uses the email" + email, {
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

      
      const newUser =  new User({ email, password, fname, lname, birthDate, roles, status, createdOn, token  });

      await newUser.save();

      return newUser;
    },

    async userUpdate(_, { ID, updateUserInput: { email, password, fname, lname, birthDate, roles, status } }) {
      await User.updateOne({ _id: ID}, { $set: { email, password, fname, lname, birthDate, roles, status } });

      return ID;
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