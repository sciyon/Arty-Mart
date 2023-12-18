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

const LOGOUT_MUTATION = gql`
  mutation UserLogout {
    userLogout {
      success
    }
  }
`;

const useLoginMutation = () => {
  const { dispatch } = useAuth();

  const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data && data.userLogin && data.userLogin.token) {
        console.log('Login successful');
        dispatch({ type: 'LOGIN', payload: data.userLogin });
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

const useLogoutMutation = () => {
  const { dispatch } = useAuth();

  const logoutUser = () => {
    dispatch({ type: 'LOGOUT', payload: null });
  };

  return { logoutUser };
};

export { useLoginMutation, useLogoutMutation };
