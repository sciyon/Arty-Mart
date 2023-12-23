// ImagesMasonry.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Image, Shimmer } from 'react-shimmer';

import { useQuery } from '@apollo/client';
import { GETALLARTWORKS_QUERY } from '../backend/connect/artworkConnectQueries.ts';
import { useSession } from '../session.jsx';
import { useAuth } from '../backend/middleware/authContext.jsx';

const ImagesMasonry = ({ limit }) => {
  
  const { data, loading, error, refetch } = useQuery(GETALLARTWORKS_QUERY, {
    variables: { limit: 100 },
  });
  const { authState } = useAuth();
  const { isLoggedIn, user } = authState;

  useEffect(() => {
    refetch();
  }, [data, refetch]);

  const { setSessionID } = useSession();
  const navigate = useNavigate();

  const handleArtworkClick = (artworkID) => {
    setSessionID(artworkID);
    navigate('/Product')
  };

  const artworks = data?.artworkGetByLimit;

  if (!artworks) {
    return <div>No artworks found</div>;
  }

  const sortedArtworks = [...artworks].sort((a, b) => b.likes.length - a.likes.length);
  
  const sortedArtworks2 = [...artworks].sort((a, b) => {
    if (a.artist === user?._id && b.artist !== user?._id) {
      return -1; // a comes first
    } else if (a.artist !== user?._id && b.artist === user?._id) {
      return 1; // b comes first
    } else {
      return 0; // no change in order
    }
  });
  
  const sortedArtworks3 = [...artworks].sort((a, b) => {
    const aLikedByUser = a.likes.includes(user?._id);
    const bLikedByUser = b.likes.includes(user?._id);
  
    if (aLikedByUser && !bLikedByUser) {
      return -1; // a comes first
    } else if (!aLikedByUser && bLikedByUser) {
      return 1; // b comes first
    } else {
      return 0; // no change in order
    }
  });

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4, 1500: 5 }}
    >
      <Masonry columnsCount={5} gutter="15px">
        {/* Test Case: limit === 1 */}
        {limit === 1 && (
        artworks.map((artwork, i) => (
          <div 
            key={i} 
            onClick={() => handleArtworkClick(artwork._id)}>
            <Image
              src={`https://res.cloudinary.com/dyqbjfpka/image/upload/${artwork.imageURL}.jpg`}
              className='image'
              fallback={<Shimmer />}
            />
          </div>
        ))
        )}
        
        {/* Test Case: limit === 2 */}
        {limit === 2 && (
          sortedArtworks.map((artwork, i) => (
            <div
              key={i}
              onClick={() => handleArtworkClick(artwork._id)}
            >
              <Image
                src={`https://res.cloudinary.com/dyqbjfpka/image/upload/${artwork.imageURL}.jpg`}
                className='image'
                fallback={<Shimmer />}
              />
            </div>
          ))
        )}

        {/* Test Case: limit === 3 */}
        {limit === 3 &&
        sortedArtworks2
          .filter((artwork) => artwork.artist === user?._id)
          .map((artwork, i) => (
            <div
              key={i}
              onClick={() => handleArtworkClick(artwork._id)}
            >
              <Image
                src={`https://res.cloudinary.com/dyqbjfpka/image/upload/${artwork.imageURL}.jpg`}
                className='image'
                fallback={<Shimmer />}
              />
            </div>
          ))}

        {/* Test Case: limit === 4 */}
        {limit === 4 && (
          console.log('Limit is 4. Artworks:', artworks),
          artworks
            .filter((artwork) => {
              return artwork.likes?.includes(user?._id);
            })
            .map((artwork, i) => (
              <div
                key={i}
                onClick={() => handleArtworkClick(artwork._id)}
              >
                <Image
                  src={`https://res.cloudinary.com/dyqbjfpka/image/upload/${artwork.imageURL}.jpg`}
                  className='image'
                  fallback={<Shimmer />}
                />
              </div>
            ))
        )}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ImagesMasonry;
