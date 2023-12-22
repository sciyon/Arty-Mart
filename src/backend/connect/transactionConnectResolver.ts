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

export default transactionCreateMutation;
