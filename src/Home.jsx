import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EntryMessage from './toaster.jsx';
import Navbar from './navbar.jsx';

function App() {

  //[user login not viewers][subject to change so that it only appears after logging in]
  useEffect(() => {
    EntryMessage();
  }, []);

  return (
    <div>
      <ToastContainer />
        <Navbar />
    </div>
  );
}

export default App;