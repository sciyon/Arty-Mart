// resolvers.js
import User from '../models/users.js';

const resolvers = {
  Query: {
    async getUser(_, { ID }){
      return User.findById(ID);
    },
    async getUsers(_, { limit }){
      return User.find().limit(limit);
    },
  },

  Mutation: {
    async createUser(_, { userInput: { fname, lname, email, password, roles, status, createdOn } }){
      const res = await new User({ fname, lname, email, password, roles, status, createdOn }).save();

      return res._id;
    },
    async updateUser(_, { ID, userInput: { fname, lname, email, password, roles, status } }) {
      await User.updateOne({ _id: ID}, { $set: { fname, lname, email, password, roles, status } });

      return ID;
    },
    async deleteUser(_, { ID }) {
      await User.deleteOne({ _id: ID });
      
      return ID;
    }
  }
}

export default resolvers;
