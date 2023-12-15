import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { UserIcon, CalendarDaysIcon, CakeIcon} from "@heroicons/react/24/solid";
import joshHutcherson from '../images/joshHutcherson.jpg'; //Skeleton rani na image, we make it dynamic soon lezgo

import SignedOut from '../layouts/signedOut.jsx';

const Social = () => {
  const [activeColumn, setActiveColumn] = useState('posts');

  const handleColumnClick = (column) => {
    setActiveColumn(column);
  };

  const renderContent = () => {
    // Conditionally render content based on the active column
    switch (activeColumn) {
      case 'posts':
        return <div>Content for Posts</div>;
      case 'followers':
        return <div>Content for Followers</div>;
      case 'following':
        return <div>Content for Following</div>;
      case 'likes':
        return <div>Content for Likes</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <SignedOut />
      <div className='relative w-100% h-20 bg-tier2 top-14 flex justify-center items-center'>
        <div className='font-medium uppercase ml-16 text-xl'>
          Social
        </div>
      </div>
      <div className='relative ml-36 mr-16'>
        <div className="flex items-center mb-6">
          {/* User Information */}
          <div>
            <div className='mb-8'> {/* Skeleton rani, will make dynamic once naa na ang backend */}
              <img
                src={joshHutcherson} 
                alt='Josh Hutcherson'
                className='h-28 w-28 border-2 border-tier4 rounded-full object-cover'
              />
            </div>
            <div className='mb-4'>Username </div>
            <div className='flex items-center mb-4'>
              <div className='flex-1 flex items-center mr-20'>
                <UserIcon className="h-4 w-4 text-white cursor-pointer hover:scale-90 hover:text-red-300 mr-2" />
                <div>Gender: </div>
              </div>
              <div className='flex-1 ml-12 flex items-center'>
                <CakeIcon className="h-4 w-4 text-white cursor-pointer hover:scale-90 hover:text-red-300 mr-2" />
                <div>Birthday: </div>
              </div>
            </div>
            <div className='flex items-center'>
              <CalendarDaysIcon className="h-4 w-4 text-white cursor-pointer hover:scale-90 hover:text-red-300 mr-2" />
              <div>Joined on: </div>
            </div>
          </div>
        </div>

        {/* Navigation for columns */}
        <div className="flex pl-5 pr-8 py-2 border-b-2 mb-6 border-tier4">
          <div
            className={`flex-1 ml-8 uppercase cursor-pointer text-lg font-medium text-center ${activeColumn === 'posts' ? 'text-tier3' : ''}`}
            onClick={() => handleColumnClick('posts')}
          >
            Posts
          </div>
          <div
            className={`flex-1 ml-8 uppercase cursor-pointer text-lg font-medium text-center ${activeColumn === 'followers' ? 'text-tier3' : ''}`}
            onClick={() => handleColumnClick('followers')}
          >
            Followers
          </div>
          <div
            className={`flex-1 ml-8 uppercase cursor-pointer text-lg font-medium text-center ${activeColumn === 'following' ? 'text-tier3' : ''}`}
            onClick={() => handleColumnClick('following')}
          >
            Following
          </div>
          <div
            className={`flex-1 ml-8 uppercase cursor-pointer text-lg font-medium text-center ${activeColumn === 'likes' ? 'text-tier3' : ''}`}
            onClick={() => handleColumnClick('likes')}
          >
            Likes
          </div>
        </div>

        {/* Render content based on the active column */}
        {renderContent()}
      </div>
    </>
  );
};

export default Social;
