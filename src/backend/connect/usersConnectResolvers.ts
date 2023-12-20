// usersConnect.ts
import { gql, useMutation } from "@apollo/client";
import { useAuth } from '../middleware/authContext.jsx';

const USER_LOGIN_MUTATION = gql`
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
      status
    }
  }
`;

const useLoginMutation = () => {
  const { dispatch } = useAuth();

  const [loginUser, { loading, error }] = useMutation(USER_LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data && data.userLogin && data.userLogin.token) {
        if (data.userLogin.roles === "user") {
          console.log('Login User successful');
          dispatch({ type: 'LOGIN', payload: data.userLogin });
        } else {
          console.log('User is not authorized to login');
        }
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

const useAdminLoginMutation = () => {
  const { dispatch } = useAuth();

  const [loginUser, { loading, error }] = useMutation(USER_LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data && data.userLogin && data.userLogin.token) {
        if (data.userLogin.roles === "admin") {
          console.log('Login Admin successful');
          dispatch({ type: 'LOGIN', payload: data.userLogin });
        } else {
          console.log('User is not authorized to login');
        }
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
    registerUserInput.birthDate = "N/A";
    registerUserInput.status = "activated";
    registerUserInput.roles = "user";
    registerUserInput.createdOn = new Date().toISOString().split('T')[0]

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

export { useLoginMutation, useAdminLoginMutation, useLogoutMutation,  useRegisterMutation, useUpdateMutation };
