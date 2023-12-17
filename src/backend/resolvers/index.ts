import usersResolvers from './usersResolver.js';
import artistResolver from './artistResolver.js';
import followerResolver from './followerResolver.js';
import artworkResolver from './artworkResolver.js';
import reviewResolver from './reviewResolver.js';

const resolvers = {
  Query:{
    ...usersResolvers.Query,
    ...artistResolver.Query,
    ...followerResolver.Query,
    ...artworkResolver.Query,
    ...reviewResolver.Query
  },

  Mutation:{
    ...usersResolvers.Mutation,
    ...artistResolver.Mutation,
    ...followerResolver.Mutation,
    ...artworkResolver.Mutation,
    ...reviewResolver.Mutation
  },
};

export default resolvers;
