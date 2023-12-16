import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { connect } from 'mongoose';
import * as dotenv from "dotenv";

import typeDefs from "./backend/typedefs.js";
import resolvers from "./backend/resolvers.js";

require('dotenv').config();
const MONGODB = process.env.MONGODB_URI;

await connect(MONGODB);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 5000 }
});

console.log(`Server is running at ${url}`);