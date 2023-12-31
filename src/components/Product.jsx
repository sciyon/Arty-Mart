import React, { useState, useEffect } from 'react';
import { TEInput, TERipple } from 'tw-elements-react';
import defaultProfile from '../images/defaultProfile.jpg'; //Skeleton rani na image, we make it dynamic soon lezgo

import SignedIn from '../layouts/signedin.jsx';
import { useSession } from '../session.jsx';
import { useQuery } from '@apollo/client';
import { GETUSER_QUERY } from '../backend/connect/usersConnectQueries.ts';
import { GETARTWORKSID_QUERY } from '../backend/connect/artworkConnectQueries.ts';
import  { transactionCreateMutation } from '../backend/connect/transactionConnectResolvers.ts';
import  { updateArtworkLikesMutation, removeArtworkLikesMutation } from '../backend/connect/artworkConnectResolvers.ts';
import {
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from '../backend/middleware/authContext.jsx';
import { useToasts } from '../toastcontext.jsx';

const Product = () => {

  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [address, setAddress] = useState('');
  const [chosenQuantity, setChosenQuantity] = useState('');
  const { authState } = useAuth();
  const { isLoggedIn, user } = authState;

  const [artID, setArtID] = useState('');
  const [artistID, setArtistID] = useState('');
  const [title, setTitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [categories, setCategories] = useState('');
  const [price, setPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [likes, setLikes] = useState('');

  const { selectedSessionID } = useSession();
  const { showToastPositive, showToastNegative } = useToasts(); 

  const { data, refetch } = useQuery(GETARTWORKSID_QUERY, {
    variables: { id: selectedSessionID },
  });
  const [userLiked, setUserLikes] = useState((data?.likes && user?._id && data.likes.includes(user._id)) ? 'true' : 'false');

  useEffect(() => {
    const artworkData = data?.artworkGetByID;
    setArtID(artworkData?._id || '');
    setArtistID(artworkData?.artist || '');
    setTitle(artworkData?.title || '');
    setImageURL(artworkData?.imageURL || '');
    setDescription(artworkData?.description || '');
    setType(artworkData?.type || '');
    setCategories(artworkData?.categories || '');
    setPrice(artworkData?.price || '');
    setProductQuantity(artworkData?.quantity || '');
    setLikes((artworkData?.likes && artworkData.likes.length) || 0);
  }, [data]);


  const { updateLikes } = updateArtworkLikesMutation();
  const { removeLikes } = removeArtworkLikesMutation();
  
  const handleLikeClick = async () => {
    if (isLoggedIn) {
      try {
        const likeInput = {
          artworkID: artID,
          userID: user?._id,
        };
  
        if (liked) {
          const { result, error } = await removeLikes(likeInput);
  
          if (result) {
            console.log('Like removed successfully:', result);
            setUserLikes(result.data.likeArtworkRemove.likes.includes(user._id) ? 'true' : '')
          } else if (error) {
            console.error('Error removing like:', error);
          }
        } else {
          const { result, error } = await updateLikes(likeInput);
  
          if (result) {
            console.log('Like added successfully:', result);
            setUserLikes('true')
          } else if (error) {
            console.error('Error adding like:', error);
            setUserLikes('')
          }
        }
  
        setLiked((prevLiked) => !prevLiked);
  
        await refetch();
  
      } catch (error) {
        console.error('An unexpected error occurred:', error);
       setUserLikes('')
      }
    } else {
      showToastNegative('User must be logged in to like artwork');
    }
  };  

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSend = () => {
    console.log('Comment sent:', comment);
  };

  const handleQuantityChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= productQuantity) {
      setChosenQuantity(newValue);
    }
  };

  const { transactionNew } = transactionCreateMutation(); 

  const { data: data2, refetch: refetchData2 } = useQuery(GETUSER_QUERY, {
    variables: { id: artistID },
  });  

  const user2 = data2?.userGet 

  useEffect(() => {
    refetch();
    refetchData2();
  }, [selectedSessionID, refetch, refetchData2]);

  const handleOrderNowClick = async () => {
    if (isLoggedIn) {
      if (chosenQuantity && address) {
        if (user._id != artistID){
          const totalPrice = price * chosenQuantity;
        
          const { result, error: transactionCreateError } = await transactionNew({
            buyerID: user._id,
            artworkID: artID,
            artistID: artistID,
            total: totalPrice,
            address: address,
            quantity: chosenQuantity,
          });
    
          if (result) {
            showToastPositive('Order placed successfully');
          } else if (transactionCreateError) {
            console.error('Transaction creation error:', transactionCreateError.message);
            showToastNegative('Transaction creation error');
          }
        } else {
          showToastNegative('User cannot order their own artworks');
        }
      } else {
        showToastNegative('Fill up the important details');
      }
    } else {
      showToastNegative('User must log in to order');
    }

    setAddress('')
    setChosenQuantity('')
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
                  className={`mx-2 text-2xl ${
                    userLiked == 'true' ? 'text-red-900' : ''
                  }`}
                  onClick={handleLikeClick}
                >
                  <HeartIcon className="w-8 h-8 pt-1" />
                </button>
                <p>{`Likes: ${likes}`}</p>
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
            <div className="flex flex-row">
              {/* Left Column */}
              <div className="flex-1 pr-5">
                <p className="mb-3">{'Artist: ' + ' ' + user2?.email }</p>
                <p className="mb-3">{'Profile Picture:'}</p>
                <img
                  src={
                    user2 && user2.profileURL !== "N/A"
                      ? `https://res.cloudinary.com/dyqbjfpka/image/upload/${user2.profileURL}.jpg`
                      : defaultProfile
                  }
                  className='h-48 w-full object-cover rounded-2xl border-2 border-tier4'
                />
              </div>

              {/* Right Column */}
              <div className="flex-1 pl-5">
                <p className="mb-4">Description</p>
                <div className="w-full mb-[30px]">
                  <textarea
                    id="description"
                    className="text-black rounded px-6 pb-2 w-full h-56 pt-2.5 text-xs font-medium resize-none"
                    value={description.replace(/\n/g, '<br>')}
                  />
                </div>
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

            <form>
              <div className="flex pl-5 pr-8 py-2 border-b-2 mb-8 border-tier4">
                <div className="flex-1 flex">
                  <div className='w-1/3 mr-4'> {/* Set width to 1/3 and added margin-right */}
                    <p className='mb-4'>{'Quantity: ' + productQuantity}</p>
                    <TEInput
                      type="number"
                      placeholder="Quantity"
                      value={chosenQuantity}
                      onChange={handleQuantityChange}
                      className='text-white mb-4 w-full'
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
            </form>
            <div>
              <TERipple rippleColor="light" className="w-1/2 flex items-center justify-center mx-auto">
                <button
                  className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                  type="button"
                  style={{
                    background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                  }}
                  onClick={handleOrderNowClick}
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
