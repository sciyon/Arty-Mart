import React from 'react';
import '../index.css';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Image, Shimmer } from 'react-shimmer';

import { useQuery } from '@apollo/client';
import { GETALLARTWORKS_QUERY } from '../backend/connect/artworkConnectQueries.ts';

const ImagesMasonry = () => {
  const { data, loading, error, refetch } = useQuery(GETALLARTWORKS_QUERY, {
    variables: { limit: 100 },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const artworks = data?.artworkGetByLimit; // Adjust the field based on your GraphQL query

  if (!artworks) {
    return <div>No artworks found</div>;
  }

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4, 1500: 5 }}
    >
      <Masonry columnsCount={5} gutter="15px">
        {artworks.map((artwork, i) => (
          <Image
            key={i}
            src={`https://res.cloudinary.com/dyqbjfpka/image/upload/${artwork.imageURL}.jpg`}
            className='image'
            fallback={<Shimmer />}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ImagesMasonry;
