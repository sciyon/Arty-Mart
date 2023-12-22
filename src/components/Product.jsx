import React, { useState, useEffect } from 'react';
import { TEInput, TERipple } from 'tw-elements-react';
import SignedIn from '../layouts/signedin.jsx';
import { useSession } from '../session.jsx';
import { useQuery } from '@apollo/client';
import { GETARTWORKSID_QUERY } from '../backend/connect/artworkConnectQueries.ts';
import {
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";

const Product = () => {
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [address, setAddress] = useState('');

  // State variables for other properties
  const [title, setTitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [categories, setCategories] = useState('');
  const [price, setPrice] = useState('');

  const { selectedSessionID } = useSession();

  // Query to fetch artwork details by ID
  const { data, refetch } = useQuery(GETARTWORKSID_QUERY, {
    variables: { id: selectedSessionID },
  });

  useEffect(() => {
    refetch();
  }, [selectedSessionID, refetch]);

  useEffect(() => {
    const artworkData = data?.artworkGetByID;
    setTitle(artworkData?.title || '');
    setImageURL(artworkData?.imageURL || '');
    setDescription(artworkData?.description || '');
    setType(artworkData?.type || '');
    setCategories(artworkData?.categories || '');
    setPrice(artworkData?.price || '');
  }, [data]);

  const artwork = data?.artworkGetByID;

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSend = () => {
    console.log('Comment sent:', comment);
  };

  return (
    <>
      <SignedIn />
      <div className='relative w-full h-20 bg-tier2 top-14 flex justify-center items-center'>
        <div className='font-medium uppercase ml-16 text-xl'>
          { title }
        </div>
      </div>
      <div className='relative top-24 ml-36 mr-16 flex'>

        {/* First Column */}
        <div className="flex-1 ml-8 relative overflow-y-auto">
          <div className='relative mb-5 flex items-center justify-center'>
            <img
              src={`https://res.cloudinary.com/dyqbjfpka/image/upload/${ imageURL }.jpg`}
              className='h-80 w-80 object-cover rounded-2xl border-2 border-tier4'
            />
          </div>
          <div className="flex pl-5 pr-8 py-2 border-b-2 mb-4 border-tier4" />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <button
                className={`mx-2 text-2xl ${liked ? 'text-red-900' : ''}`}
                onClick={handleLikeClick}
              >
                <HeartIcon className="w-8 h-8 pt-1" />
              </button>
              Like
            </div>
          </div>
          <div className="flex pl-5 pr-8 py-2 border-b-2 mb-4 border-tier4" />
          <p className='mb-4'>Please give an honest review</p>
          <div className="flex">
            <div className='flex-1 w-[90%] pr-4'>
              <TEInput
                type="text"
                placeholder="Comment"
                className='text-white mb-4 w-full'
                value={comment}
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                className="text-white mx-2"
                onClick={handleSend}
              >
                <PaperAirplaneIcon className="w-8 h-8 pt-1 hover:scale-90 hover:text-tier3" />
              </button>
            </div>
          </div>
          <div className="flex pl-5 pr-8 border-b-2 mb-4 border-tier4" />
        </div>

        {/* Second Column */}
        <div className="flex-1 ml-8 static">
          <div className="sticky top-32">
            {/* Description */}
            <div className="flex flex-col pl-5">
              <p className='mb-4'>Description</p>
                <div className='w-full mb-[30px]'>
                  <textarea
                    id="description"
                    className='text-black rounded px-6 pb-2 w-full h-56 pt-2.5 text-xs font-medium resize-none'
                    value={description.replace(/\n/g, '<br>')}
                  />
                </div>
            </div>

            <div className="flex pl-5 pr-8 py-2 border-b-2 mb-4 border-tier4">
              <div className="flex-1 mr-4"> {/* Added margin-right */}
                <p className='mb-2 flex'>Type</p>
                <TEInput 
                  className='mb-4 flex'
                  placeholder={ type }
                  readOnly
                />
              </div>
              <div className="flex-1 mr-4"> {/* Added margin-right */}
                <p className='mb-2 flex'>Category</p>
                <TEInput 
                  className='mb-4 flex'
                  placeholder={ categories}
                  readOnly
                />
              </div>
              <div className="flex-1">
                <p className='mb-2 flex'>Price</p>
                <TEInput 
                  className='mb-4 flex'
                  placeholder={ price }
                  readOnly
                />
              </div>
            </div>

            <div className="flex pl-5 pr-8 py-2 border-b-2 mb-8 border-tier4">
              <div className="flex-1 flex">
                <div className='w-1/3 mr-4'> {/* Set width to 1/3 and added margin-right */}
                  <p className='mb-4'>Quantity</p>
                  <TEInput
                    type="text"
                    placeholder="Quantity"
                    className='text-white mb-4 w-full'
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                  />
                </div>
                <div className='w-2/3'> {/* Set width to 2/3 */}
                  <p className='mb-4'>Address</p>
                  <TEInput
                    type="text"
                    placeholder="Address"
                    className='text-white mb-4 w-full'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <TERipple rippleColor="light" className="w-1/2 flex items-center justify-center mx-auto">
                <button
                  className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                  type="button"
                  style={{
                    background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                  }}
                >
                  Order Now
                </button>
              </TERipple>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Product;
