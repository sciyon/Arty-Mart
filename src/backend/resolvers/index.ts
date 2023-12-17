import usersResolvers from './usersResolver.js';
import artistResolver from './artistResolver.js';

const resolvers = {
  Query:{
    ...usersResolvers.Query,
    ...artistResolver.Query
  },

  Mutation:{
    ...usersResolvers.Mutation,
    ...artistResolver.Mutation
  },
};

export default resolvers;
