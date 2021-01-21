import './App.css';
import './Shop.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ItemDropDown from './components/ItemDropDown';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Map from './components/Map';
import ProductList from './components/ProductList';
import { products } from './components/products';
import Product from './components/Product'
import { createBrowserHistory } from 'history'
import Checkout from './components/Checkout'
import { useLocalStorage } from './hooks/useLocalStorage'
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


  return (
    <Router history={history}>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/shop">
            <Shop 
              
            />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/checkout">
            <Checkout
              selectedProduct={selectedProduct}
              history={history}
            />
          </Route>
          <Route path="/products">
            <Product
              products={products}
              selectProduct={setSelectedProduct}
              history={history}
            />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


function Shop () {
  return (
    <ItemDropDown />

  )
}





