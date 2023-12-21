// toastcontext.jsx
import React, { createContext, useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToastPositive = (message, options = {}) => {
    const defaultOptions = {
      position: 'bottom-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    };
  
    const mergedOptions = { ...defaultOptions, ...options };
  
    const toastId = toast.success(message, mergedOptions);
    setToasts((prevToasts) => [...prevToasts, toastId]);
  };

  const showToastNegative = (message, options = {}) => {
    const defaultOptions = {
      position: 'bottom-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    };
  
    const mergedOptions = { ...defaultOptions, ...options };
  
    const toastId = toast.error(message, mergedOptions);
    setToasts((prevToasts) => [...prevToasts, toastId]);
  };

  const removeToast = (toastId) => {
    toast.dismiss(toastId);
    setToasts((prevToasts) => prevToasts.filter((id) => id !== toastId));
  };

  return (
    <ToastContext.Provider value={{ showToastPositive, showToastNegative, removeToast }}>
      {children}
      <ToastContainer autoClose={3000} />
    </ToastContext.Provider>
  );
};

export const useToasts = () => useContext(ToastContext);
