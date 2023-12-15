import React, { useState } from 'react';
import { TEInput, TERipple } from 'tw-elements-react';

import SignedIn from '../layouts/signedin.jsx';

import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  HeartIcon,
  StarIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import joshHutcherson1 from '../images/joshHutcherson.jpg';
import chessTransactionBG from '../images/chessTransactionBG.jpg';
import monaLisa from '../images/monaLisa.jpg';

const Product = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [selectedStars, setSelectedStars] = useState(0);
  const [comment, setComment] = useState('');
  const [productQuantity, setProductQuantity] = useState('');

  const images = [joshHutcherson1, chessTransactionBG, monaLisa];

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const handleStarClick = (index) => {
    setSelectedStars(index + 1);
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
          Title of Product
        </div>
      </div>
      <div className='relative top-24 ml-36 mr-16 flex'>

        {/* First Column */}
        <div className="flex-1 ml-8 relative overflow-y-auto">
          <div className='relative flex items-center justify-center'>
            <img
              src={images[currentImageIndex]}
              alt={`Product ${currentImageIndex + 1}`}
              className='h-80 w-80 object-cover rounded-2xl border-2 border-tier4'
            />
            <div className="absolute left-36 top-1/2 transform -translate-y-1/2">
              <button
                className="text-white mx-2 text-2xl"
                onClick={handlePrevClick}
              >
                <ArrowLeftCircleIcon className="w-10 h-10 pt-1 text-white hover:scale-90 hover:text-tier3" />
              </button>
            </div>
            <div className="absolute right-36 top-1/2 transform -translate-y-1/2">
              <button
                className="text-white mx-2 text-2xl"
                onClick={handleNextClick}
              >
                <ArrowRightCircleIcon className="w-10 h-10 pt-1 text-white hover:scale-90 hover:text-tier3" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center mt-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`text-white mx-2 ${index === currentImageIndex ? 'text-red-900 text-2xl ' : 'text-xl'}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div className="flex pl-5 pr-8 py-2 border-b-2 mb-4 border-tier4" />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <button
                className={`text-white mx-2 text-2xl ${liked ? 'text-red-900' : ''}`}
                onClick={handleLikeClick}
              >
                <HeartIcon className="w-8 h-8 pt-1" />
              </button>
              Like
            </div>

            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <button
                  key={index}
                  className={`text-white text-2xl ${index < selectedStars ? 'text-yellow-500' : ''}`}
                  onClick={() => handleStarClick(index)}
                >
                  <StarIcon className="w-8 h-8 pt-1" />
                </button>
              ))}
              <p className='ml-4'> Rate </p>
            </div>
          </div>
          <div className="flex pl-5 pr-8 py-2 border-b-2 mb-4 border-tier4" />
          <p className='mb-4'>Comment</p>
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
                ></textarea>
              </div>
            </div>

            <div className="flex pl-5 pr-8 py-2 border-b-2 mb-4 border-tier4">
              <div className="flex-1">
                <p className='mb-4'>Type</p>
                {/* Add type readonly here */}
              </div>
              <div className="flex-1">
                <p className='mb-4'>Category</p>
                {/* Add category readonly here pwede rasad e color code aron limpyo tanawon hehe */}
              </div>
            </div>
            <div className="flex pl-5 pr-8 py-2 border-b-2 mb-8 border-tier4">
              <div className="flex-1">
                <p className='mb-4'>Price</p>
              </div>
              <div className="flex-1 flex">
                <div className='flex-1'>
                  <p className='mb-4 w-1/2'>Quantity</p>
                </div>
                <div className='flex-1'>
                  <TEInput
                    type="text"
                    placeholder="Quantity"
                    className='text-white mb-4 w-full'
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
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
