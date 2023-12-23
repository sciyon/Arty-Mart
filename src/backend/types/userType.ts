const userType = `#graphql
  type User{
    _id: String,
    email: String,
    password: String,
    token: String,
    fname: String, 
    lname: String,
    profileURL: String,
    gender: String,
    birthDate: String,
    role: String,
    status: String,
    followers: [String],
    createdOn: String
  }

  type LoginResponse {
    id: String!
    token: String!
  }

  
  input RegisterUserInput{
    email: String,
    password: String,
    token: String,
    fname: String, 
    lname: String,
    profileURL: String,
    gender: String,
    birthDate: String,
    role: String,
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
    profileURL: String,
    gender: String,
    birthDate: String,
    status: String,
    role: String
}
  
  input FollowingInput{
    followingID: String,
    followerID: String
  }

  type Query {
    userGet(ID: ID!): User
    userGetLimit(limit: Int): [User]
    userGetFollowers(ID: ID!): [User]
    userGetFollowing(ID: ID!): [User]
  }
  
  type Mutation { 
    userRegister(registerUserInput: RegisterUserInput): User!
    userUpdate(ID: ID!, updateUserInput: UpdateUserInput): User
    userDelete(ID: ID!): String!
    userLogin(loginUserInput: LoginUserInput): User!
    followerAdd(followingInput: FollowingInput): User!
    followerRemove(followingInput: FollowingInput): User!
  }
`;

export default userType;