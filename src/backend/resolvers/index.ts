import usersResolvers from './usersResolver.js';
import artistResolver from './artistResolver.js';
import followerResolver from './followerResolver.js';

const resolvers = {
  Query:{
    ...usersResolvers.Query,
    ...artistResolver.Query,
    ...followerResolver.Query,
  },

  Mutation:{
    ...usersResolvers.Mutation,
    ...artistResolver.Mutation,
    ...followerResolver.Mutation
  },
};

export default resolvers;
