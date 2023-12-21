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
      role
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
      role
      status
      address
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

  const [loginUser, { loading, error, data }] = useMutation(USER_LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data && data.userLogin && data.userLogin.token) {
        if (data.userLogin.status == "activated") {
          if (data.userLogin.role === "user") {
            console.log('Login User successful');
            dispatch({ type: 'LOGIN', payload: data.userLogin });
          } else {
            console.log('User is not authorized to login');
            throw new Error('User is not authorized to login');
          }
        } else {
          console.log('Account needs to be reactivated');
          throw new Error('Account needs to be reactivated');
        }
      } else {
        console.log('Login failed');
        throw new Error('Login failed');
      }
    },
    onError: (error) => {
      console.error('Login error:', error.message);
      throw new Error(error.message);
    },
  });

  return { loginUser };
};


const useAdminLoginMutation = () => {
  const { dispatch } = useAuth();

  const [loginUser, { loading, error, data }] = useMutation(USER_LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data && data.userLogin && data.userLogin.token) {
        if (data.userLogin.role === "admin") {
          console.log('Login User successful');
          dispatch({ type: 'LOGIN', payload: data.userLogin });
        } else {
          console.log('User is not authorized to login');
          throw new Error('User is not an admin');
        }
      } else {
        console.log('Login failed');
        throw new Error('Login failed');
      }
    },
    onError: (error) => {
      console.error('Login error:', error.message);
      throw new Error(error.message);
    },
  });

  return { loginUser };
};

const useLogoutMutation = () => {
  const { dispatch } = useAuth();

  const logoutUser = () => {
    dispatch({ type: 'LOGOUT', payload: null });
  };

  return { logoutUser };
};


const useRegisterMutation = () => {
  const [registerUser, { loading, error, data }] = useMutation(REGISTER_MUTATION);

  const register = async (registerUserInput) => {
    try {
      const result = await registerUser({
        variables: {
          registerUserInput: {
            ...registerUserInput,
            gender: "N/A",
            birthDate: "N/A",
            address: "N/A",
            role: "user",
            status: "activated",
            createdOn: new Date().toISOString().split('T')[0],
          },
        },
      });

      return { result, error: null }; 

    } catch (error) {
      console.error('Registration error:', error.message);
      return { result: null, error: error.message };
    }
  };

  return { register };
};





const useUpdateMutation = () => {
  const [updateUser, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_MUTATION);

  return { updateUser, updateLoading, updateError };
};

export { useLoginMutation, useAdminLoginMutation, useLogoutMutation,  useRegisterMutation, useUpdateMutation };
