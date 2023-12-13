import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { TEInput, TERipple } from 'tw-elements-react';
import { XCircleIcon } from '@heroicons/react/24/solid';
import Register from "./RegisterModal.jsx";

function Profile({ isOpen, onClose }) {
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState(''); // 'male', 'female', or 'not_say'
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [joinDate, setJoinDate] = useState(''); // Assuming this is provided externally

  const CloseProfile = () => {
    setUsername('');
    setGender('');
    setEmail('');
    setBirthday('');
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80"></div>
      <div className="z-10 w-full max-w-md p-4 bg-white rounded-lg shadow-md relative">
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
          <div className="mb-4">
            <TEInput
              type="text"
              placeholder="Username"
              className='text-black'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
          <p className="mb-1 mt-1 pb-1 text-black">
            Gender
          </p>
            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
              <input
                type="radio"
                name="gender"
                id="male"
                checked={gender === 'male'}
                onChange={() => setGender('male')}
              />
              <label
                className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer text-black"
                htmlFor="male"
              >
                Male
              </label>
            </div>
            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
              <input
                type="radio"
                name="gender"
                id="female"
                checked={gender === 'female'}
                onChange={() => setGender('female')}
              />
              <label
                className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer text-black"
                htmlFor="female"
              >
                Female
              </label>
            </div>
            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
              <input
                type="radio"
                name="gender"
                id="not_say"
                checked={gender === 'not_say'}
                onChange={() => setGender('not_say')}
              />
              <label
                className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer text-black"
                htmlFor="not_say"
              >
                Not Say
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
            <p className='text-black ml-1'>Joined On: {joinDate}</p>
        </div>
        <div className="flex justify-end">
            <TERipple rippleColor="light" className="w-full">
              <button
                className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                type="button"
                onClick={CloseProfile}
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
