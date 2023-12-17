import usersResolvers from './usersResolver.js';
import artistResolver from './artistResolver.js';
import followerResolver from './followerResolver.js';
import artworkResolver from './artworkResolver.js';

const resolvers = {
  Query:{
    ...usersResolvers.Query,
    ...artistResolver.Query,
    ...followerResolver.Query,
    ...artworkResolver.Query
  },

  Mutation:{
    ...usersResolvers.Mutation,
    ...artistResolver.Mutation,
    ...followerResolver.Mutation,
    ...artworkResolver.Mutation
  },
};

export default resolvers;
