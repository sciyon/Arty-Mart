import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

import User from '../models/users.js';

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

    async userGetFollowers(_, { ID }){
      try{
        const user = await User.findById(ID).populate('followers');
        return user.followers;
      }catch(error){
        throw new GraphQLError("Failed to fetch followers.", {
          extensions: { code: 'FETCH_FOLLOWERS_FAILED'}
        });
      }
    }, 
    
    async userGetFollowing(_, { ID }){
      try{
        const user = await User.findById(ID);
        const following = await User.find({ followers: user._id});
        return following;
      }catch(error){
        throw new GraphQLError("Failed to fetch following.", {
          extensions: { code: 'FETCH_FOLLOWING_FAILED'}
        });
      }
    }, 
  },

  Mutation: {
    async userRegister(_, { registerUserInput: { email, password, fname, lname, gender, birthDate, address, role, status, createdOn } }){
      
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

      
      const newUser =  new User({ email, password, token, fname, lname, gender, birthDate, address, role, status,  createdOn });

      await newUser.save();

      return newUser;
    },

    async userUpdate(_, { ID, updateUserInput: { email, password, fname, lname, gender, birthDate, address }}){
      try {
        const update = await User.findOneAndUpdate(
          { _id: ID }, 
          { 
            $set: { 
              email, 
              password,
              fname, 
              lname, 
              gender, 
              birthDate, 
              address
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

    async followerAdd(_, { followingInput: { followingID, followerID }}){
      try{
        const user = await User.findByIdAndUpdate(followingID, {$push: {followers: followerID}}, {new: true});
        return user;
      }catch(error){
        throw new GraphQLError("Failed to add follower.", {
          extensions: { code: 'ADD_FOLLOWER_FAILED'}
        });
      }
    },
    
    async followerRemove(_, { followingInput: { followingID, followerID }}){
      try{
        const user = await User.findByIdAndUpdate(followingID, {$pull: {followers: followerID}}, {new: true});
        return user;
      }catch(error){
        throw new GraphQLError("Failed to remove follower.", {
          extensions: { code: 'REMOVE_FOLLOWER_FAILED'}
        });
      }
    },
    
  }
}

export default resolvers;