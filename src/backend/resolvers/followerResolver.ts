import { GraphQLError } from 'graphql';

import Artist from "../models/artists.js"
import User from '../models/users.js';
import Follower from '../models/follower.js';

const followerResolver = {
  Query:{
    async followerGetAll(_, { userID }){
      return Follower.find({ user: userID });
    }
  },

  Mutation:{
    async followerCreate(_, { followerInput : { user, artist, followedOn }}){
      
      const userCheck = await User.findById(user);
      if(!userCheck){
        throw new GraphQLError("User does not exist.", {
          extensions: { code: 'USER_DOESNT_EXIST'}
        });
      }

      const artistCheck = await Artist.findById(artist);
      if(!artistCheck){
        throw new GraphQLError("Artist does not exist.", {
          extensions: { code: 'ARTIST_DOESNT_EXIST'}
        });
      }

      const newFollower = new Follower({ user, artist, followedOn });

      try {
        const saved = await newFollower.save();
        if (!saved) {
          throw new GraphQLError("Failed to create follower.", {
            extensions: { code: 'CREATE_FOLLOWER_FAILED' }
          });
        }
        return saved;
      } catch (error) {
        throw new GraphQLError("Failed to create follower.", {
          extensions: { code: 'CREATE_FOLLOWER_FAILED' }
        });
      }
    },

    async followerDelete(_, { ID }) {
      try {
        const result = await Follower.deleteOne({ _id: ID });
    
        if (result.deletedCount === 1) {
          return ID;

        } else {
          throw new GraphQLError("Follower does not exist.", {
            extensions: { code: 'FOLLOWER_DOESNT_EXIST'}
          });
        }
      } catch (error) {
        throw new GraphQLError("Failed to delete follower.", {
          extensions: { code: 'DELETE_FOLLOWER_FAILED'}
        });
      }
    }
    
  }
}

export default followerResolver;