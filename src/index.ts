import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { connect } from 'mongoose';

import User from '../models/users.js';

const MONGODB = 'mongodb+srv://root:root@cluster0.xmxsh4t.mongodb.net/Artstore?retryWrites=true&w=majority';


const typeDefs = `#graphql
  type User{
    _id: String,
    fname: String, 
    lname: String,
    email: String,
    password: String,
    roles: [String]!,
    status: String,
    createdOn: String
  }

  input UserInput{
    fname: String, 
    lname: String,
    email: String,
    password: String,
    roles: [String]!,
    status: String,
    createdOn: String
  }

  type Query {
    getUser(ID: ID!):User!
    getUsers(limit: Int): [User]
  }

  type Mutation { 
    createUser(userInput: UserInput): String!
    updateUser(ID: ID!, userInput: UserInput): String!
    deleteUser(ID: ID!): String!
  }
`;

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
      const res = await new User({ fname, lname, email, password, roles, status, createdOn  }).save();

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

await connect(MONGODB);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 5000 }
});

console.log(`Server is running at ${url}`);