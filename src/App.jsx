import { Route,Routes } from 'react-router-dom';
import Navbar from './navbar.jsx';

import Home from './Home.jsx';
import Contact from './Contact.jsx';

function App() {
  return (
   <>
    <Navbar/>
      <div>
        <Routes>        
        <Route path="/"  element={<Home/>} />
        <Route path="/Contact"  element={<Contact/>}/>
        </Routes>
      </div>
    </>
   
  );
}

export default App;
