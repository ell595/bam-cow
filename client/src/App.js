import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

// Components
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Details from './components/Details';
import Cart from './components/Cart';
import NavBar from './components/NavBar';
import Shipping from './components/Shipping';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };
  const [id, setId] = useState(null);

  async function getId() {
    if (!localStorage.temp_id) {
      const id = Math.ceil(Math.random() * (2000000 - 10000000) + 10000000);
      localStorage.setItem('temp_id', id);
      setId(id);
  } else {
      const id = localStorage.temp_id;
      setId(id);
      console.log('cheese');
  }
  }

  async function isAuth() {
    try {
      let token = localStorage.token;
      const response = await fetch("http://localhost:3000/auth/is-verify", {
        method: "GET",
        headers: {token : token}
      });

      const parseResponse = await response.json();
      
      parseResponse === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      console.log(isAuthenticated);

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    isAuth();
  })

  useEffect(() => {
    getId();
    console.log(id);
  })

  return (
    <Fragment>
      <header>
        <NavBar isAuthenticated={isAuthenticated}/>
      </header>
      <BrowserRouter>
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login setAuth={setAuth}/> : <Navigate to="/dashboard" replace setAuth={setAuth}/> } />
            <Route path="/register" element={!isAuthenticated ? <Register setAuth={setAuth}/> : <Navigate to="/login" replace setAuth={setAuth}/>}/>
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard setAuth={setAuth}/> : <Navigate to="/login" replace setAuth={setAuth}/>}/>
            <Route path="/" element={<Home />} />
            <Route path="/products/:product_id" element={<Details id={id}/>}/>
            <Route path="/cart" element={<Cart id={id}/>} />
            <Route path="/shipping" element={<Shipping />} />
          </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
