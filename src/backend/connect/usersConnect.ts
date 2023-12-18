// usersConnect.ts
import { gql, useMutation } from "@apollo/client";
import { useAuth } from '../middleware/authContext.jsx';

const LOGIN_MUTATION = gql`
  mutation UserLogin($email: String!, $password: String!) {
    userLogin(loginUserInput: { email: $email, password: $password }) {
      _id
      email
      token
    }
  }
`;

const useLoginMutation = () => {
  const { dispatch } = useAuth(); // Access dispatch function from AuthContext

  const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data && data.userLogin && data.userLogin.token) {
        console.log('Login successful');
        dispatch({ type: 'LOGIN', payload: data.userLogin }); // Update auth state globally
      } else {
        console.log('Login failed');
      }
    },
    onError: (error) => {
      console.error('Login error:', error.message);
    },
  });

  return { loginUser, loading, error };
};

export default useLoginMutation;
