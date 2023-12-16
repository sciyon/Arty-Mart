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

export default typeDefs;
