import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { useAuth } from '../backend/middleware/authContext.jsx';
import { useUpdateMutation } from '../backend/connect/usersConnectResolvers.ts';
import { useQuery } from '@apollo/client';
import { GETUSER_QUERY } from '../backend/connect/usersConnectQueries.ts';
import { useToasts } from '../toastcontext.jsx';

import { TEInput, TERipple } from 'tw-elements-react';
import { XCircleIcon } from '@heroicons/react/24/solid';

function Profile({ isOpen, onClose }) {

  const { authState } = useAuth();
  const { user } = authState;

  const { data, refetch } = useQuery(GETUSER_QUERY, {
    variables: { id: user?._id || '' },
  });

  const user2 = data?.userGet;
  
  useEffect(() => {
    refetch();
  }, [user, refetch]);
  
  const [profileFile, setProfileFile] = useState(null);
  const [profileFileName, setProfileFileName] = useState(''); 
  const [firstname, setFirstName] = useState(user2?.fname || user?.fname);
  const [lastname, setLastName] = useState(user2?.lname || user?.lname);
  const [gender, setGender] = useState(user2?.gender || user?.gender);
  const [email, setEmail] = useState(user2?.email || user?.email);
  const [birthday, setBirthday] = useState(user2?.birthDate || user?.birthDate);

  const { updateUser } = useUpdateMutation();
  const { showToastPositive } = useToasts(); 

  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    setProfileFile(file);

    const limitedFileName = file ? (file.name.length > 35 ? file.name.substring(0, 35) + '...' : file.name) : 'No File Chosen';
    setProfileFileName(limitedFileName);
  };

  const CloseProfile = () => {
    setProfileFile(null);
    onClose(1);
  };

  const UpdateProfile = () => {
  
    updateUser({
      variables: {
        id: user._id,
        updateUserInput: {
          email,
          fname: firstname,
          lname: lastname,
          gender,
          birthDate: birthday,
        },
      },
    });    
    
    showToastPositive('Your profile has been updated');
    onClose(1);
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80"></div>
      <div className="z-10 w-full max-w-md p-4 bg-white rounded-2xl shadow-md relative">
        <button
          className="absolute top-2 right-2 text-white text-1xl font-semibold transition-transform transform-gpu hover:text-red-300"
          onClick={CloseProfile}
        >
          <XCircleIcon className="w-8 h-8 text-red-400 hover:text-red-600" />
        </button>
        <div className="text-center">
          <h4 className="mb-6 mt-1 pb-1 text-lg font-semibold text-black">
            Your Personal Profile
          </h4>
        </div>
        <form>
          <div className='mb-4'>
              <p htmlFor="imageUpload" className='mb-1 mt-1 pb-1 text-black mr-1'>Upload Profile Picture:</p>
                <input
                  className="mb-2 w-1/8 inline-block rounded text-xs font-medium uppercase leading-normal text-white"
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleProfileUpload}
                />
              <div className="text-black leading-normal ml-1">{profileFileName}</div>
            </div>
            <div className="mb-4 flex space-x-8">
            {/* <!--First and Last name input--> */}
            <div flex-1>
              <TEInput
                type="text"
                placeholder="First name"
                className='text-black'
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              ></TEInput>
            </div>
            <div flex-1>
              <TEInput
                type="text"
                placeholder="Last name"
                className='text-black'
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              ></TEInput>
            </div>
          </div>
          <div className="mb-4">
          <p className="mb-1 mt-1 pb-1 text-black">
            Gender
          </p>
            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
              <input
                type="radio"
                name="gender"
                id="Male"
                checked={gender === 'Male'}
                onChange={() => setGender('Male')}
              />
              <label
                className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer text-black"
                htmlFor="Male"
              >
                Male
              </label>
            </div>
            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
              <input
                type="radio"
                name="gender"
                id="Female"
                checked={gender === 'Female'}
                onChange={() => setGender('Female')}
              />
              <label
                className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer text-black"
                htmlFor="Female"
              >
                Female
              </label>
            </div>
            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
              <input
                type="radio"
                name="gender"
                id="Others"
                checked={gender === 'Others'}
                onChange={() => setGender('Others')}
              />
              <label
                className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer text-black"
                htmlFor="Others"
              >
                Others
              </label>
            </div>
          </div>
          <div className="mb-4">
            <TEInput
              type="email"
              placeholder="Email"
              className='text-black'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <p className="mb-1 mt-1 pb-1 text-black">
              Birthday
            </p>
            <TEInput
                type="date"
                placeholder='birthday'
                className='text-black'
                name="birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
            />
        </div>
        <div className="mb-4">
            <p className='text-black ml-1'>Joined On: {user?.createdOn || 'N/A'}</p>
        </div>
        <div className="flex justify-end">
            <TERipple rippleColor="light" className="w-full">
              <button
                className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                type="button"
                onClick={UpdateProfile}
                style={{
                  background:
                    'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                }}
              >
                Save Changes
              </button>
            </TERipple>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default Profile;
