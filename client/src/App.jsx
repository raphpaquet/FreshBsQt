import './App.css';
import './Shop.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ItemDropDown from './components/ItemDropDown';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
// import logout from './components/logout';
import Map from './components/Map';
import { products } from './components/products';
import Product from './components/Product';
import { createBrowserHistory } from 'history';
import Checkout from './components/Checkout';
import AlertComponent from './components/AlertComponent';
import './components/Register.css';
import './components/Home.css';
import './components/NavBar.css';
import './components/Map.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



const history = createBrowserHistory();


export default function App () {


  const [selectedProduct, setSelectedProduct] = useState(null)
  const [errorMessage, upadteErrorMessage] = useState(null)


  
  //stores user state
  const [user, setUser] = useState(null)

  // axios request to users authetification which verifies 
  //if the session is present and returns a user object when it is
  useEffect(()=>{
    axios.post('/api/users/auth')
      .then((res) => {
        setUser(res.data)
      })
  }, [])



  return (
    <Router history={history}>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/shop">
            <Shop 
              user = {user}
            />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/login">
            <Login 
            setUser = {setUser}
             showError={upadteErrorMessage}
            />

          </Route>
          <Route path="/register">
            <Register 
            setUser = {setUser}
            showError={upadteErrorMessage}/>
          </Route>
          {/* <Route path="/logout">
            <Logout />
          </Route> */}
          <Route path="/checkout">
            <Checkout
              user = {user}
              selectedProduct={selectedProduct}
              history={history}
            />
          </Route>
          <Route path="/products">
            <Product
              products={products}
              // selectProduct={setSelectedProduct}
              // history={history}
            />
          </Route>
          <Route path="/" exact>
            <Home 
            user = {user}
            setUser = {setUser}
            />
          </Route>
        </Switch>
        <AlertComponent errorMessage={errorMessage} hideError={upadteErrorMessage} />
      </div>
    </Router>
  );
}


function Shop () {
  
  return (
    <ItemDropDown/>


   )
 }





