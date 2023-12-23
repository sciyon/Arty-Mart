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
      status
      price
      quantity
    }
  }
`;

const UPDATE_ARTWORK_LIKES_MUTATION = gql`
  mutation LikeArtworkAdd($likeInput: LikeInput) {
    likeArtworkAdd(likeInput: $likeInput) {
      likes
    }
  }
`;

const REMOVE_ARTWORK_LIKES_MUTATION = gql`
  mutation LikeArtworkRemove($likeInput: LikeInput) {
    likeArtworkRemove(likeInput: $likeInput) {
      likes
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

const updateArtworkLikesMutation = () => {
  const [likeArtworkAdd] = useMutation(UPDATE_ARTWORK_LIKES_MUTATION);

  const updateLikes = async (likeInput) => {
    try {
      const result = await likeArtworkAdd({
        variables: {
          likeInput,
        },
      });

      return { result, error: null };
    } catch (error) {
      console.error('Updating Artwork Likes error:', error.message);
      return { result: null, error: error.message };
    }
  };

  return { updateLikes };
};

const removeArtworkLikesMutation = () => {
  const [likeArtworkRemove] = useMutation(REMOVE_ARTWORK_LIKES_MUTATION);

  const removeLikes = async (likeInput) => {
    try {
      const result = await likeArtworkRemove({
        variables: {
          likeInput,
        },
      });

      return { result, error: null };
    } catch (error) {
      console.error('Removing Artwork Likes error:', error.message);
      return { result: null, error: error.message };
    }
  };

  return { removeLikes };
};


export {artCreateMutation, updateArtworkLikesMutation, removeArtworkLikesMutation};
