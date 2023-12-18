// usersLogin.ts
import { gql, useMutation } from "@apollo/client";

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
  const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION, {

    onCompleted: (data) => {
      if (data && data.userLogin && data.userLogin.token) {
        console.log('Login successful');
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
