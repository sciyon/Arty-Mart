import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import LOGO from '../images/logoNew.png';

import { TEInput, TERipple } from 'tw-elements-react';
import { XCircleIcon } from '@heroicons/react/24/solid';

function LoginAdmin({ isOpen, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const CloseLogin = () => {
    setUsername('');
    setPassword('');
  };

  const CloseAdminOpenLogin = () => {
    setUsername('');
    setPassword('');
    onClose(3);
  }


  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80"></div>
      <div className="z-10 w-full max-w-md p-4 bg-white rounded-2xl shadow-md relative">
        <button
          className="absolute top-2 right-2 text-white text-1xl font-semibold transition-transform transform-gpu hover:text-red-300"
          onClick={CloseLogin}
        >
          <XCircleIcon className="w-8 h-8 text-red-400 hover:text-red-600" />
        </button>
        <div className="text-center">
          <img className="mx-auto w-16" src={LOGO} alt="logo" />
          <h4 className="mb-6 mt-1 pb-1 text-lg font-semibold text-black">
            Welcome Back Fellow Arty Mart
          </h4>
        </div>
        <p className="mb-4 text-black">Please login using your admin credentials</p>
        {/* <!--Logo--> */}
        <form>
          <div className="mb-4">
            {/* <!--Username input--> */}
            <TEInput
              type="text"
              placeholder="Username"
              className='text-black'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></TEInput>
          </div>
          <div className="mb-4">
            {/* <!--Password input--> */}
            <TEInput
              type="password"
              placeholder="Password"
              className='text-black'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></TEInput>
          </div>
          <div className="flex justify-end">
            <TERipple rippleColor="light" className="w-full">
              <Link to='/AdminDashboard'>
                <button
                  className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                  type="button"
                  onClick={CloseLogin}
                  style={{
                    background:
                      'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                  }}
                >
                  Log in
                </button>
              </Link>
            </TERipple>
          </div>
          {/* <!--Forgot password link--> */}
          <div className="mb-4 flex items-center justify-center">
            <a 
              className="text-black"
              onClick={CloseAdminOpenLogin}
            >Join as user?</a>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default LoginAdmin;
