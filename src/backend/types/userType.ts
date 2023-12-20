const userType = `#graphql
  type User{
    _id: String,
    email: String,
    password: String,
    token: String,
    fname: String, 
    lname: String,
    gender: String,
    birthDate: String,
    roles: String,
    status: String,
    createdOn: String
  }

  input RegisterUserInput{
    email: String,
    password: String,
    token: String,
    fname: String, 
    lname: String,
    gender: String,
    birthDate: String,
    roles: String,
    status: String,
    createdOn: String
  }

  input LoginUserInput{
    email: String,
    password: String
  }

  input UpdateUserInput{
    email: String,
    fname: String, 
    lname: String,
    gender: String,
    birthDate: String,
    status: String
  }

  type LoginResponse {
    id: String!
    token: String!
  }

  type Query {
    userGet(ID: ID!): User
    userGetLimit(limit: Int): [User]
  }

  type Mutation { 
    userRegister(registerUserInput: RegisterUserInput): User!
    userUpdate(ID: ID!, updateUserInput: UpdateUserInput): User
    userDelete(ID: ID!): String!
    userLogin(loginUserInput: LoginUserInput): User!
  }
`;

export default userType;