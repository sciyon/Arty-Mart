import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { TEInput, TERipple } from 'tw-elements-react';
import { XCircleIcon } from '@heroicons/react/24/solid';

import LOGO from '../images/logoNew.png';
import { useRegisterMutation } from '../backend/connect/usersConnectResolvers.ts';
import { useToasts } from '../toastcontext.jsx';

function Register({ isOpen, onClose }) {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { showToastPositive, showToastNegative } = useToasts(); 

  const { register } = useRegisterMutation();

  const RegisterAcc = async () => {
    if (firstname && lastname && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const { result, error: registrationError } = await register({
          email,
          password,
          fname: firstname,
          lname: lastname,
        });
  
        if (result) {
          showToastPositive(firstname + ' is successfully registered');
          onClose(1);
        } else {
          showToastNegative(registrationError || 'Registration credentials invalid');
        }
      } else {
        showToastNegative('Password does not match');
      }
    } else {
      showToastNegative('Please fill out the important fields');
    }
  
    setFirstName('');
    setLastName('');
    setPassword('');
    setEmail('');
    setConfirmPassword('');
  };

  const CloseRegister = () => {
    setFirstName('');
    setLastName('');
    setPassword('');
    setEmail('');
    setConfirmPassword('');
    onClose(1);
  };

  const CloseRegisterOpenLogin = () => {
    setFirstName('');
    setLastName('');
    setPassword('');
    setEmail('');
    setConfirmPassword('');
    onClose(3);
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80"></div>
      <div className="z-10 w-full max-w-md p-4 bg-white rounded-2xl shadow-md relative">
        <button
          className="absolute top-2 right-2 text-white text-1xl font-semibold transition-transform transform-gpu hover:text-red-300"
          onClick={CloseRegister}
        >
          <XCircleIcon className="w-8 h-8 text-red-400 hover:text-red-600" />
        </button>
        <div className="text-center">
          <img className="mx-auto w-16" src={LOGO} alt="logo" />
          <h4 className="mb-6 mt-1 pb-1 text-lg font-semibold text-black">
            We are The Arty Mart Team
          </h4>
        </div>
        <p className="mb-4 text-black">Please register your account</p>
        {/* <!--Logo--> */}
        <form>
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
            {/* <!--Email input--> */}
            <TEInput
              type="email"
              placeholder="Email"
              className='text-black'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="mb-4">
            {/* <!--Password input--> */}
            <TEInput
              type="text"
              placeholder="Confirm Password"
              className='text-black'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></TEInput>
          </div>
          <div className="flex justify-end">
            <TERipple rippleColor="light" className="w-full">
              <button
                className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                type="button"
                onClick={RegisterAcc}
                style={{
                  background:
                    'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                }}
              >
                Register
              </button>
            </TERipple>
          </div>
          {/* <!--Register button--> */}
          <div className="flex items-center justify-between pb-6 mt-8 mb-4">
            <p className="mb-0 mr-2 text-black">Already have an account?</p>
            <TERipple rippleColor="light">
              <button
                className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                onClick={CloseRegisterOpenLogin}
                style={{
                  background:
                    'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                }}
              >
                Login
              </button>
            </TERipple>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default Register;
