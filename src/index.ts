import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { connect } from 'mongoose';
import * as dotenv from "dotenv";

<<<<<<< HEAD
import typeDefs from "./backend/typedefs.js";
=======
import typeDefs from "./backend/types/index.js";
>>>>>>> 6a3188feb9a7c5b42b16ed3716d00bf12ac076c1
import resolvers from "./backend/resolvers/index.js";

dotenv.config();
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