import { gql, useMutation } from "@apollo/client";
import { useAuth } from '../middleware/authContext.jsx';

const CREATE_TRANSACTION_MUTATION = gql`
    mutation TransactionCreate($transactionInput: TransactionInput) {
        transactionCreate(transactionInput: $transactionInput) {
        _id
        buyerID
        artworkID
        artistID
        total
        status
        address
        }
    }
`;

const UPDATE_TRANSACTION_MUTATION = gql`
  mutation TransactionUpdate($id: ID!, $updateTransactionInput: UpdateTransactionInput) {
    transactionUpdate(ID: $id, updateTransactionInput: $updateTransactionInput) {
      _id
      buyerID
      artworkID
      artistID
      total
      status
      quantity
      address
    }
  }
`;

const transactionCreateMutation = () => {
  const [transactionCreate, { loading, error, data }] = useMutation(CREATE_TRANSACTION_MUTATION);
  const transactionNew = async (transactionInput) => {
    try {
      const result = await transactionCreate({
        variables: {
            transactionInput: {
            ...transactionInput,
            status: "Pending"
          },
        },
      });
      
      return { result, error: null }; 
    } catch (error) {
      console.error('Publishing of Art error:', error.message);
      return { result: null, error: error.message };
    }
  };

  return { transactionNew }; 
};

const transactionUpdateMutation = () => {
  const [updateTransaction, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_TRANSACTION_MUTATION);

  return { updateTransaction, updateLoading, updateError };
};


export { transactionCreateMutation, transactionUpdateMutation };
