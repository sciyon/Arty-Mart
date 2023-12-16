import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server'

const auth = (context) => {
  const authHeader = context.req.headers.authorization;
  
  if(authHeader){
    const token = authHeader.split('Bearer')[1];
    if(token){
      try{
        const user = jwt.verify(token, "UNSAFE STRING");
        return user;
      }catch(err){
        throw new AuthenticationError('Invalid or expired token.')
      }
    }else{
      throw new AuthenticationError('Authentication token must be \'Bearer [token].')
    }
  }else{
    throw new AuthenticationError('Authorization header must be provided.')
  }
}

export default auth;