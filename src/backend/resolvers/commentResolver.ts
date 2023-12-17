import { GraphQLError } from 'graphql';

import Comment from '../models/comments.js';

const commentResolver = {
  Query:{

    async commentGetAllFromUser(_, { userID }){
      try{
        
        const comments = Comment.find({ user: userID });
        if(!comments){
          throw new GraphQLError("Error in getting all comments from users.", {
            extensions: { code: 'USER_COMMENTS_FETCH_ERROR_1'}
          })
        }
        return comments;

      }catch(error){
        throw new GraphQLError("Error in getting all comments from users.", {
          extensions: { code: 'USER_COMMENTS_FETCH_ERROR_2'}
        })
      }
    },

    async commmentGetAllFromArtwork(_, { artworkID }){
      try{
        const comments =  Comment.find({ artwork: artworkID });
        if(!comments){
          throw new GraphQLError("Error in getting all comments from artwork.", {
            extensions: { code: 'ARTWORK_COMMENTS_FETCH_ERROR_1'}
          })
        }
        return comments;

      }catch(error){
        throw new GraphQLError("Error in getting all comments from artwork.", {
          extensions: { code: 'ARTWORK_COMMENTS_FETCH_ERROR_2'}
        })
      }
    }

  }, 

  Mutation:{

    async commentCreate(_, { commentInput: { user, artwork, comment, madeOn, edited, editedOn } }){

      const newComment = new Comment({ user, artwork, comment, madeOn, edited, editedOn })

      try{

        const saved = await newComment.save();
        if(!saved){
          throw new GraphQLError("Error in saving artwork comment.", {
            extensions: { code: 'SAVE_COMMENT_FAILED_1'}
          })
        }
        return saved;

      }catch(error){

        throw new GraphQLError("Error in saving artwork comment.", {
          extensions: { code: 'SAVE_COMMENT_FAILED_2'}
        })
      }
    },

    async commentUpdate(_, { ID, commentInput: { user, artwork, comment, madeOn, edited, editedOn } }){
      try{

        const updated = await Comment.updateOne({ _id: ID }, {$set: { user, artwork, comment, madeOn, edited, editedOn }});
        if(!updated){
          throw new GraphQLError("Failed to update comment.", {
            extensions: { code: 'UPDATE_COMMENT_FAILED_1' }
          });
        }
        return updated;

      }catch (error){

        throw new GraphQLError("Failed to update comment.", {
          extensions: { code: 'UPDATE_COMMENT_FAILED_2' }
        });
      }
    },

    async commentDelete(_, { ID }) {
      try {
        const deleted = await Comment.deleteOne({ _id: ID });

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

export default commentResolver;