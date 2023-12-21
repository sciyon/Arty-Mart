import { gql, useMutation } from "@apollo/client";
import { useAuth } from '../middleware/authContext.jsx';

const CREATE_ARTWORK_MUTATION = gql`
  mutation ArtCreate($artworkInput: ArtworkInput) {
    artworkCreate(artworkInput: $artworkInput) {
      _id
      artist
      title
      type
      categories
      description
      createdOn
      imageURL
      videoURL
      status
      price
      quantity
    }
  }
`;

const artCreateMutation = () => {
  const [artCreate, { loading, error, data }] = useMutation(CREATE_ARTWORK_MUTATION);
  const artnew = async (artworkInput) => {
    try {
      const result = await artCreate({
        variables: {
          artworkInput: {
            ...artworkInput,
            imageURL: "empty_temp",
            videoURL: "empty_temp",
            status: "activated",
            createdOn: new Date().toISOString().split('T')[0],
          },
        },
      });
      
      return { result, error: null }; 
    } catch (error) {
      console.error('Publishing of Art error:', error.message);
      return { result: null, error: error.message };
    }
  };

  return { artnew }; 
};

export default artCreateMutation;
