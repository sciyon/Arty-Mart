import usersResolvers from './usersResolver.js';

const resolvers = {
  Query:{
    ...usersResolvers.Query
  },

  Mutation:{
    ...usersResolvers.Mutation
  },
};

export default resolvers;