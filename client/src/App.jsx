import './App.css';
import './Shop.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ItemDropDown from './components/ItemDropDown';
import Home from './components/Home';
import Register from './components/Register'
import Login from './components/Login'
import Map from './components/Map'
import './components/Register.css';
import './components/Home.css';
import './components/NavBar.css';
import './components/Map.css'
import useApplicationData from './hooks/useApplicationData'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProductList from './components/ProductList';


export default function App () {


  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/shop">
            <Shop />
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
            <Checkout />
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




function Checkout () {
  return <h2>This is the checkout page</h2>
}
