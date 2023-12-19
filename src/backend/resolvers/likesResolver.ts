import { GraphQLError } from 'graphql';

import Artwork from '../models/artworks.js';
import User from '../models/users.js';
import Like from '../models/likes.js';

const likeResolver = {
  Query:{
    async likeGetAllLiked(_, { userID }){
      try{

        const liked = Like.find({ user: userID }, { artwork: 1, _id: 0 });
        if(!liked){
          throw new GraphQLError("Error in getting all liked artwork from user.", {
            extensions: { code: 'USER_LIKED_FETCH_ERROR_1'}
          })
        }
        return liked;

      }catch(error){
        throw new GraphQLError("Error in getting all liked artwork from user.", {
          extensions: { code: 'USER_LIKED_FETCH_ERROR_2'}
        })
      }
    },
    
    async likeGetAllLiker(_, { artworkID }){
      try{

        const likers = Like.find({ artwork: artworkID }, { user: 1, _id: 0 });
        if(!likers){
          throw new GraphQLError("Error in getting all liked artwork from user.", {
            extensions: { code: 'USER_LIKED_FETCH_ERROR_1'}
          })
        }
        return likers;

      }catch(error){
        throw new GraphQLError("Error in getting all liked artwork from user.", {
          extensions: { code: 'USER_LIKED_FETCH_ERROR_2'}
        })
      }
    }
  },

  Mutation:{
    async likeCreate(_, { likeInput : { user, artwork, likedOn }}){
     
      const userCheck = await User.findById(user);
      if(!userCheck){
        throw new GraphQLError("User does not exist.", {
          extensions: { code: 'USER_DOESNT_EXIST'}
        });
      }
     
      const artistCheck = await Artwork.findById(artwork);
      if(!artistCheck){
        throw new GraphQLError("Artist does not exist.", {
          extensions: { code: 'ARTIST_DOESNT_EXIST'}
        });
      }
     
      const existingLike = await Like.findOne({ user, artwork });
      if(existingLike){
        throw new GraphQLError("User has already liked this artwork.", {
          extensions: { code: 'USER_ALREADY_LIKED'}
        });
      }
     
      const newLike = new Like({ user, artwork, likedOn });
     
      try {
        const saved = await newLike.save();
        if (!saved) {
          throw new GraphQLError("Failed to like artwork.", {
            extensions: { code: 'CREATE_FOLLOWER_FAILED_1' }
          });
        }
        return saved;
     
      } catch (error) {
        throw new GraphQLError("Failed to like artwork.", {
          extensions: { code: 'CREATE_FOLLOWER_FAILED_2' }
        });
      }
    },
     

    async likeDelete(_, { ID }) {
      try {
        const result = await Like.deleteOne({ _id: ID });
    
        if (result.deletedCount === 1) {
          return ID;

        } else {
          throw new GraphQLError("Like does not exist.", {
            extensions: { code: 'LIKE_DOESNT_EXIST_1'}
          });
        }
      } catch (error) {
        throw new GraphQLError("Like does not exist.", {
          extensions: { code: 'LIKE_DOESNT_EXIST_2'}
        });
      }
    }
  }
}

export default likeResolver;