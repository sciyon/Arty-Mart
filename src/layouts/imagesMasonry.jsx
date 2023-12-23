// ImagesMasonry.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Image, Shimmer } from 'react-shimmer';

import { useQuery } from '@apollo/client';
import { GETALLARTWORKS_QUERY } from '../backend/connect/artworkConnectQueries.ts';
import { useSession } from '../session.jsx';

const ImagesMasonry = ({ limit }) => {
  
  const { data, loading, error, refetch } = useQuery(GETALLARTWORKS_QUERY, {
    variables: { limit: 100 },
  });

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

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4, 1500: 5 }}
    >
      <Masonry columnsCount={5} gutter="15px">
        {/* Conditionally render based on the limit */}
        {limit === 1 ? (
          <div 
            onClick={() => handleArtworkClick(artworks[0]._id)}>
            <Image
              src={`https://res.cloudinary.com/dyqbjfpka/image/upload/${artworks[0].imageURL}.jpg`}
              className='image'
              fallback={<Shimmer />}
            />
          </div>
        ) : (
          // Render all artworks
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
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ImagesMasonry;
