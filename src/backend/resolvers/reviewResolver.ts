import { GraphQLError } from 'graphql';

import Review from '../models/reviews.js';

const reviewResolver = {
  Query:{

    async reviewGetAllFromUser(_, { userID }){
      try{
        
        const reviews = Review.find({ user: userID });
        if(!reviews){
          throw new GraphQLError("Error in getting all user reviews.", {
            extensions: { code: 'USER_REVIEWS_FETCH_ERROR_1'}
          })
        }
        return reviews;

      }catch(error){
        throw new GraphQLError("Error in getting all user reviews.", {
          extensions: { code: 'USER_REVIEWS_FETCH_ERROR_2'}
        })
      }
    },

    async reviewGetAllFromArtwork(_, { artworkID }){
      try{
        
        const reviews = Review.find({ artwork: artworkID });
        if(!reviews){
          throw new GraphQLError("Error in getting all artwork reviews.", {
            extensions: { code: 'ARTWORK_REVIEWS_FETCH_ERROR_1'}
          })
        }
        return reviews;

      }catch(error){
        throw new GraphQLError("Error in getting all user reviews.", {
          extensions: { code: 'ARTWORK_REVIEWS_FETCH_ERROR_2'}
        })
      }
    }

  }, 

  Mutation:{

    async reviewCreate(_, { reviewInput: { artwork, user, rating, title, body, createdOn, modified, modifiedOn, imageURL, videoURL, status } }){

      const newReview = new Review({ artwork, user, rating, title, body, createdOn, modified, modifiedOn, imageURL, videoURL, status })

      try{

        const saved = await newReview.save();
        if(!saved){
          throw new GraphQLError("Error in saving artwork reviews.", {
            extensions: { code: 'SAVE_REVIEW_FAILED_1'}
          })
        }
        return saved;

      }catch(error){

        throw new GraphQLError("Error in saving artwork reviews.", {
          extensions: { code: 'SAVE_REVIEW_FAILED_2'}
        })

      }
    },

    async reviewUpdate(_, { ID, reviewInput: { artwork, user, rating, title, body, createdOn, modified, modifiedOn, imageURL, videoURL, status } }){
      try{

        const updated = await Review.updateOne({ _id: ID }, {$set: { artwork, user, rating, title, body, createdOn, modified, modifiedOn, imageURL, videoURL, status }});
        if(!updated){
          throw new GraphQLError("Failed to update review.", {
            extensions: { code: 'UPDATE_REVIEW_FAILED_1' }
          });
        }
        return updated;

      }catch (error){

        throw new GraphQLError("Failed to update review.", {
          extensions: { code: 'UPDATE_REVIEW_FAILED_2' }
        });

      }
    },

    async artworkDelete(_, { ID }) {
      try {
        const deleted = await Review.deleteOne({ _id: ID });

        if(!deleted){
          throw new GraphQLError("Failed to delete review.", {
            extensions: { code: 'DELETE_ARTWORK_FAILED_1' }
          });
        }
        
        return ID;
      } catch (error) {
        throw new GraphQLError("Failed to delete review.", {
          extensions: { code: 'DELETE_ARTWORK_FAILED_2' }
        });
      }
    }

  }
}

export default reviewResolver;