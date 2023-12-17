import { GraphQLError } from 'graphql';

import Artist from "../models/artists.js"
import User from '../models/users.js';

const artistResolver = {
  Query:{
    async artistGet(_, { ID }){
      return Artist.findById(ID);
    },

    async artistGetLimit(_, { limit }){
      return Artist.find().limit(limit);
    },

    async artistGetFollowersCount(_, { ID }){
      return Artist.findById(ID).select('followers').then(artist => artist.followers);
    }
  },

  Mutation: {
    async artistCreate(_, { createInput: { user, name, language, followers, countryOrigin, createdOn } }){
        
      const oldArtist = await Artist.findOne({ user });

      if(oldArtist){
        throw new GraphQLError("A user already is an artist.", {
          extensions: { code: 'USER_ALREADY_ARTIST'}
        })
      }

      const existingUser = await User.findById(user)

      if(!existingUser){
        throw new GraphQLError("User does not exist.", {
          extensions: { code: 'USER_DOESNT_EXIST'}
        })
      }

      const newArtist = new Artist({
        user,
        name,
        language,
        followers: Number(followers),
        countryOrigin,
        createdOn: new Date(createdOn)
      });

      try {
        const saved = await newArtist.save();
        if (!saved) {
          throw new GraphQLError("Failed to create artist.", {
            extensions: { code: 'CREATE_ARTIST_FAILED' }
          });
        }
        return saved;
      } catch (error) {
        throw new GraphQLError("Failed to create artist.", {
          extensions: { code: 'CREATE_ARTIST_FAILED' }
        });
      }
    },


    async artistUpdate(_, { ID, createInput: {
      user, name, language, followers, countryOrigin
    } }){
      await Artist.updateOne({ _id: ID }, {$set: { user, name, language, followers, countryOrigin }});

      return Artist;
    },
    
    async artistDelete(_, { ID }) {
      await Artist.deleteOne({ _id: ID });
      
      return ID;
    }
  }
}

export default artistResolver;