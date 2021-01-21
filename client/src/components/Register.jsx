import React, { useState } from 'react';
import NavMenu from './NavMenu';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Register(props) {
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    address: "",
    city: "",
  }) 

  const [error, setError] = useState("");
  const history = useHistory();

  // hook used to handle values entered by the user
  const handleChange = (e) => {
    const { id, value } = e.target
    console.log(e.target.value)
    setState(prevState => ({
      ...prevState, 
      [id] : value
    }))
  }

  const userData = {
    "first_name": state.first_name,
    "last_name": state.last_name,
    "email": state.email,
    "password": state.password,
    "phone_number": state.phone_number,
    "address": state.address,
    "city": state.city
  }

  // function to make a backend API request
  const sendDetailsToServer = () => {
    if (!userData.first_name || !userData.last_name || !userData.email || !userData.password || !userData.address || !userData.phone_number || !userData.city ) {
        setError("Please fill all the forms")
    } else {
      axios.post('/api/users/register', userData)
      .then(function (response) {
        if(response.status === 200){
          setState(prevState => ({
            ...prevState,
            'successMessage' : 'Registration successful. Redirecting to Home page...'
          }))
          setError(null)
          redirectToHome();
        } else {
          setError('Some error occured')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }

  // click event handler for sending request to backend 
  const handleSubmitClick = (e) => {
    e.preventDefault();
    if(userData) {
        sendDetailsToServer()    
    }
  }


  const redirectToHome = () => {
    history.push('/')
  }


  return (
  <div className="register-page">
    <div className="home-nav">
        <img className="logo" src="./images/basket.svg" style={{ 'filter': 'brightness(100)', "height": "60px", "width": "60px" }}></img>
        <div className="dropdown-bars">
          <NavMenu />
        </div>
      </div>
    <video autoPlay loop muted id="background-video">
        <source src="/video/bread.mp4" type="video/mp4" />
      </video>
    <div className="register">
      <form className="register-form" action="/register" method="POST">
        <h1 className="register-title">register</h1>
        <span>
          <label for="first_name"></label>
          <input 
            id="first_name"
            name="first_name" 
            type="text"  
            placeholder="First Name"
            value={state.first_name}
            onChange={handleChange}
            required
          />
        </span>
        <span>
          <label for="last_name"></label>
          <input 
            id="last_name"
            name="last_name" 
            type="text"  
            placeholder="Last Name"
            value={state.last_name}
            onChange={handleChange}
            required
          />
        </span>
        <span>
          <label for="email"></label>
          <input 
            id="email"
            name="email" 
            type="email"  
            placeholder="Email"
            value={state.email}
            onChange={handleChange}
            required
          />
        </span>
        <span>
          <label for="password"></label>
          <input 
            id="password"
            name="password" 
            type="password"  
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
            required
          />
        </span>
        <span>
          <label for="address"></label>
          <input 
            id="address"
            name="address" 
            type="text"  
            placeholder="Address"
            value={state.address}
            onChange={handleChange}
            required
          />
        </span>
        <span>
          <label for="city"></label>
          <input 
            id="city"
            name="city" 
            type="text"  
            placeholder="City"
            value={state.city}
            onChange={handleChange}
            required
          />
        </span>
        <span>
          <label for="phone_number"></label>
          <input 
            id="phone_number"
            name="phone_number" 
            type="number"  
            placeholder="Phone Number"
            value={state.phone_number}
            onChange={handleChange}
            required
          />
        </span>
        <div className="button-register">
          <button 
            type="submit" 
            class="submit-button" 
            onClick={handleSubmitClick}>
              Submit
          </button>
        </div>
      </form>
      <div className="questionLogin">
      <span className="login-register">Already have an account?</span>
      <span><a id="login-reg" href="/login">Please Login</a></span>
      </div>
    </div>
  </div>
    )
  }
