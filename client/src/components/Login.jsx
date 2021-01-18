import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useHistory, withRouter } from "react-router-dom";
import NavMenu from './NavMenu'


// will need to setUser to response.data // 

export default function Login(props) {

  const history = useHistory();
  const [error, setError] = useState("");
  const [state , setState] = useState({
    email : "",
    password : "",
    successMessage: null
  })
  const handleChange = (e) => {
    const { id , value } = e.target   
    setState(prevState => ({
        ...prevState,
        [id] : value
    }))
  }
  
  const handleSubmitClick = (e) => {
    e.preventDefault();
    const userData = {
      "email": state.email,
      "password": state.password
    }
    if (!userData.email || !userData.password) {
      setError("Please enter your email and password")
    } else {
      axios.post('/api/users/login', userData)
        .then(function (response) {
          if(response.status === 200) {
            setState(prevState => ({
              ...prevState,
              'successMessage' : 'Login successful. Redirecting to home page'
            }))
            redirectToHome();
            setError("")
          }
          else if (response.code === 204) {
            setError("Email and password don't match");
          }
          else {
            setError("Email doesn't exist");
          }
        })
      .catch(function (error) {
        console.log(error)
      });
    }
  }

  const redirectToHome = () => {
    history.push('/')
  }

  const redirectToRegister = () => {
    history.push('/register')
  }


  return (
  <div className="login-page">
    <div className="home-nav">
        <img className="logo" style={{ "height": "60px", "width": "60px" }}></img>
        <div className="dropdown-bars">
          <NavMenu />
        </div>
      </div>
    <video autoPlay loop muted id="background-video">
        <source src="/video/bread.mp4" type="video/mp4" />
      </video>
    <div className="login">
      <form className="login-form" action="/login" method="POST">
        <h1 className="login-title">Login</h1>
        <span>
          <label for="firstName"></label>
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
        <div className="button-login">
          <button 
            type="submit" 
            class="submit-button" 
            onClick={handleSubmitClick}>
            Submit
          </button>
        </div>
      </form>
      <div className="questionLogin">
        <span className="login-login">Don't have an account?</span>
        <span id="login-log" onClick={() => redirectToRegister()}>Register</span>
      </div>
    </div>
  </div>
  )
}