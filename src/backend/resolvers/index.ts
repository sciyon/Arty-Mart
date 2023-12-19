import usersResolvers from './usersResolver.js';
import artistResolver from './artistResolver.js';
import followerResolver from './followerResolver.js';
import artworkResolver from './artworkResolver.js';
import reviewResolver from './reviewResolver.js';
import commentResolver from './commentResolver.js';
import likeResolver from './likesResolver.js';
import addressResolver from './addressResolver.js';

const resolvers = {
  Query:{
    ...usersResolvers.Query,
    ...artistResolver.Query,
    ...followerResolver.Query,
    ...artworkResolver.Query,
    ...reviewResolver.Query,
    ...commentResolver.Query,
    ...likeResolver.Query,
    ...addressResolver.Query
  },

  Mutation:{
    ...usersResolvers.Mutation,
    ...artistResolver.Mutation,
    ...followerResolver.Mutation,
    ...artworkResolver.Mutation,
    ...reviewResolver.Mutation,
    ...commentResolver.Mutation,
    ...likeResolver.Mutation,
    ...addressResolver.Mutation
  },
};

export default resolvers;
