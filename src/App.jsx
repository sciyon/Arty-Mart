import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EntryMessage from './toaster.jsx';

import './App.css';

function App() {
  useEffect(() => {
    EntryMessage();
  }, []);

  return (
    <>
      <ToastContainer />
    </>
  );
}

export default App;
