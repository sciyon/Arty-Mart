import { Route,Routes } from 'react-router-dom';

import Navbar from '../layouts/navbar.jsx';
import Home from './Home.jsx';
import Store from './Store.jsx';
import Contact from './Contact.jsx';


function App() {
  return (
<div>
    <Navbar/>
      <div>
        <Routes>        
        <Route path="/"  element={<Home/>} />
        <Route path="/Store"  element={<Store/>} />
        <Route path="/Contact"  element={<Contact/>}/>
        </Routes>
      </div>
    </div>
   
  );
}

export default App;
