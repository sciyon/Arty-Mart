import { Route,Routes } from 'react-router-dom';

import Home from './Home.jsx';
import Store from './Store.jsx';
import Create from './Create.jsx';
import Trending from './Trending.jsx';
import Social from './Social.jsx';
import Product from './Product.jsx';
import Transaction from './Transaction.jsx';

function App() {
  return (
    <div>
      <div>
        <Routes>        
          <Route path="/"  element={<Home/>} />
          <Route path="/Store"  element={<Store/>} />
          <Route path="/Create"  element={<Create/>} />
          <Route path="/Trending"  element={<Trending/>} />
          <Route path="/Social"  element={<Social/>} />
          <Route path="/Product"  element={<Product/>} />
          <Route path="/Transaction"  element={<Transaction/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
