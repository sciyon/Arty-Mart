const typeDefs = `#graphql
  type User{
    _id: String,
    email: String,
    password: String,
    token: String,
    fname: String, 
    lname: String,
    birthDate: String,
    roles: [String],
    status: String,
    createdOn: String
  }

  input RegisterUserInput{
    email: String,
    password: String,
    token: String,
    fname: String, 
    lname: String,
    birthDate: String,
    roles: [String],
    status: String,
    createdOn: String
  }

  input LoginUserInput{
    email: String,
    password: String
  }

  input UpdateUserInput{
    email: String,
    password: String,
    fname: String, 
    lname: String,
    birthDate: String,
    roles: [String],
    status: String
  }

  type LoginResponse {
    id: String!
    token: String!
  }

  type Query {
    getUser(ID: ID!):User!
    getUsers(limit: Int): [User]
  }

  type Mutation { 
    userRegister(registerUserInput: RegisterUserInput): User!
    userUpdate(ID: ID!, updateUserInput: UpdateUserInput): String!
    userDelete(ID: ID!): String!
    userLogin(loginUserInput: LoginUserInput): User!
  }
`;

export default typeDefs;