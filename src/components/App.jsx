import { Route,Routes } from 'react-router-dom';

import Home from './Home.jsx';
import Store from './Store.jsx';
import Login from './Login.jsx';

function App() {
  return (
<div>
    <div>
        <Routes>        
        <Route path="/"  element={<Home/>} />
        <Route path="/Store"  element={<Store/>} />
        <Route path="/Login"  element={<Login/>} />
        </Routes>
      </div>
    </div>
   
  );
}

export default App;
