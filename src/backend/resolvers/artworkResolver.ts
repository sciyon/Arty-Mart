import { GraphQLError } from 'graphql';

import User from "../models/users.js"
import Artwork from '../models/artworks.js';

const artworkResolver = {

  Query:{

    async artworkGetByID(_, { ID }){
      try {

        const artworks = Artwork.findById(ID)
        return artworks;

      } catch (error) {

        throw new GraphQLError("Error in fetching artist's artworks.", {
          extensions: { code: 'ARTWORK_FETCH_ERROR'}
        })

      }
    },

    async artworkGetByLimit(_, { limit }){
      return Artwork.find().limit(limit);
    },
    
    async artworkGetAllByArtist(_, { artistID }){
      try {

        const artworks = Artwork.find({ artist: artistID });
        return artworks;

      } catch (error) {

        throw new GraphQLError("Error in fetching artist's artworks.", {
          extensions: { code: 'ARTWORK_FETCH_ERROR'}
        })
      }
    },

    async artworkGetAllByArtistAndStatus(_, { artworkByStatus }){
      try {

        const artworks = await Artwork.find({ 
          artist: artworkByStatus.artist, 
          status: artworkByStatus.status 
        });
        if(!artworks){
          throw new GraphQLError("Failed to get artwork.", {
            extensions: { code: 'FETCH_ARTWORK_FAILED_1' }
          });
        }
        return artworks;

      } catch (error) {

        throw new GraphQLError("Failed to get artwork.", {
          extensions: { code: 'FETCH_ARTWORK_FAILED_2' }
        });

      }
    },

    async artworkGetAllLikes(_, { ID }) {
      try {
        const artwork = await Artwork.findById(ID);
        if (!artwork) {
          throw new GraphQLError("Artwork not found.", {
            extensions: { code: 'ARTWORK_NOT_FOUND' }
          });
        }
        return { likes: artwork.likes };
      } catch (error) {
        throw new GraphQLError("Error in fetching likes.", {
          extensions: { code: 'FETCH_LIKES_ERROR' }
        });
      }
    }
    ,

    async artworkGetAllLiked(_, { userID }) {
      try {
        const likedArtworks = await Artwork.find({ likes: userID });
        return likedArtworks;
      } catch (error) {
        throw new GraphQLError("Error in fetching liked artworks.", {
          extensions: { code: 'FETCH_LIKED_ARTWORKS_ERROR' }
        });
      }
    }    
  },

  Mutation: {

    async artworkCreate(_, { artworkInput: {
      artist, title, type, categories, description, createdOn, imageURL, videoURL, status, price,  quantity
    } }){
      
      const artistExists = await User.findById(artist);
      if(!artistExists){
        throw new GraphQLError("Artist does not exist.", {
          extensions: { code: 'ARTIST_DOESNT_ARTIST'}
        })
      }

      const newArtwork = new Artwork({
        artist, 
        title, 
        type, 
        categories, 
        description, 
        createdOn, 
        imageURL, 
        videoURL, 
        status, 
        price,
        quantity
      })

      try{

        const saved = await newArtwork.save();
        if(!saved){
          throw new GraphQLError("Failed to save artwork.", {
            extensions: { code: 'SAVE_ARTWORK_FAILED' }
          });
        }
        return saved;

      }catch (error){

        throw new GraphQLError("Failed to create artist.", {
          extensions: { code: 'CREATE_ARTIST_FAILED' }
        });
        
      }
    },

    async artworkUpdate(_, { ID, artworkInput: {
      artist, title, type, categories, description, createdOn, imageURL, videoURL, status, price, quantity
    } }){
      try{

        const updated = await Artwork.updateOne({ _id: ID }, {$set: { artist, title, type, categories, description, createdOn, imageURL, videoURL, status, price, quantity }});

        if(!updated){
          throw new GraphQLError("Failed to update artwork.", {
            extensions: { code: 'UPDATE_ARTWORK_FAILED_1' }
          });
        }

        return updated;

      }catch (error){
        throw new GraphQLError("Failed to update artwork.", {
          extensions: { code: 'UPDATE_ARTWORK_FAILED_2' }
        });
      }
    },

    async artworkDelete(_, { ID }) {
      try {
        const deleted = await Artwork.deleteOne({ _id: ID });

        if(!deleted){
          throw new GraphQLError("Failed to delete artwork.", {
            extensions: { code: 'DELETE_ARTWORK_FAILED_1' }
          });
        }
        
        return ID;
      } catch (error) {
        throw new GraphQLError("Failed to delete artwork.", {
          extensions: { code: 'DELETE_ARTWORK_FAILED_2' }
        });
      }
    },

    async likeArtworkAdd(_, { likeInput: { userID, artworkID }}){
      try {
        const updatedArtwork = await Artwork.findOneAndUpdate(
          { _id: artworkID },
          { $addToSet: { likes: userID } },
          { new: true }
        );
        return updatedArtwork;
      } catch (error) {
        throw new GraphQLError("Error in adding like.", {
          extensions: { code: 'ADD_LIKE_ERROR' }
        });
      }
    },
    
    async likeArtworkRemove(_, { likeInput: { userID, artworkID }}){
      try {
        const updatedArtwork = await Artwork.findOneAndUpdate(
          { _id: artworkID },
          { $pull: { likes: userID } },
          { new: true }
        );
        return updatedArtwork;
      } catch (error) {
        throw new GraphQLError("Error in removing like.", {
          extensions: { code: 'REMOVE_LIKE_ERROR' }
        });
      }
    }
    
  }
}

export default artworkResolver;