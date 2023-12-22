import { gql, useMutation } from "@apollo/client";
import { useAuth } from '../middleware/authContext.jsx';

export const GETALLARTWORKS_QUERY = gql`
    query ArtworkGetAllByArtist($limit: Int!) {
        artworkGetByLimit(limit: $limit) {
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
        likes
        }
    }
`;

export const GETARTWORKSID_QUERY = gql`
    query ArtworkGetByID($id: ID!) {
        artworkGetByID(ID: $id) {
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
        likes
        }
    }
`;
