// usersConnect.ts
import { gql, useMutation } from "@apollo/client";
import { useAuth } from '../middleware/authContext.jsx';

const LOGIN_MUTATION = gql`
  mutation UserLogin($email: String!, $password: String!) {
    userLogin(loginUserInput: { email: $email, password: $password }) {
      _id
      email
      token 
      fname
      lname
      gender
      birthDate
      roles
      status
      createdOn
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation UserRegister($registerUserInput: RegisterUserInput!) {
    userRegister(registerUserInput: $registerUserInput) {
      _id
      email
      fname
      lname
      gender
      birthDate
      roles
      status
      createdOn
    }
  }
`;

const UPDATE_MUTATION = gql`
  mutation UserUpdate($id: ID!, $updateUserInput: UpdateUserInput!) {
    userUpdate(ID: $id, updateUserInput: $updateUserInput) {
      email
      fname
      lname
      gender
      birthDate
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

const useRegisterMutation = () => {
  const [registerUser, { loading, error }] = useMutation(REGISTER_MUTATION);

  const register = (registerUserInput) => {
    registerUserInput.gender = "N/A";
    registerUserInput.birthDate = "000000";
    registerUserInput.status = "activated";
    registerUserInput.roles = "user";

    return registerUser({
      variables: {
        registerUserInput,
      },
    });
  };

  return { register, loading, error };
};

const useUpdateMutation = () => {
  const [updateUser, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_MUTATION);

  return { updateUser, updateLoading, updateError };
};

export { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateMutation };
