import usersResolvers from './usersResolver.js';
import artworkResolver from './artworkResolver.js';
import reviewResolver from './reviewResolver.js';
import commentResolver from './commentResolver.js';
import likeResolver from './likesResolver.js';
import transactionResolver from './transactionResolver.js';

const resolvers = {
  Query:{
    ...usersResolvers.Query,
    ...artworkResolver.Query,
    ...reviewResolver.Query,
    ...commentResolver.Query,
    ...likeResolver.Query,
    ...transactionResolver.Query
  },

  Mutation:{
    ...usersResolvers.Mutation,
    ...artworkResolver.Mutation,
    ...reviewResolver.Mutation,
    ...commentResolver.Mutation,
    ...likeResolver.Mutation,
    ...transactionResolver.Mutation
  },
};

export default resolvers;
