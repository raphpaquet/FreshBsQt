import React, { useState } from 'react';
import NavMenu from './NavMenu'

export default function Register(props) {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    city: "",
  }) 

  const [error, setError] = useState("");

  // Update user state based on their input
  const handleChange = (e) => {
    console.log(e.target.value)
    const { id, value } = e.target
    setState(prev => ({
      ...prev, 
      [id] : value
    }))
  }


 const onSubmit = (e) => {
   e.preventDefault();
   const userData = {
     "firstName": state.firstName,
     "lastName": state.lastName,
     "email": state.email,
     "password": state.password,
     "phoneNumber": state.phoneNumber,
     "address": state.address,
     "city": state.city
   }
  }



  return (
  <div className="register-page">
    <div className="home-nav">
        <img className="logo" style={{ "height": "60px", "width": "60px" }}></img>
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
          <label for="firstName"></label>
          <input 
            name="firstName" 
            type="text"  
            placeholder="First Name"
            value={state.firstName}
            onChange={handleChange}
            required
          />
        </span>
        <span>
          <label for="lastName"></label>
          <input 
            name="lastName" 
            type="text"  
            placeholder="Last Name"
            value={state.lasttName}
            onChange={handleChange}
            required
          />
        </span>
        <span>
          <label for="email"></label>
          <input 
            name="email" 
            type="text"  
            placeholder="Email"
            value={state.email}
            onChange={handleChange}
            required
          />
        </span>
        <span>
          <label for="password"></label>
          <input 
            name="password" 
            type="text"  
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
            required
          />
        </span>
        <span>
          <label for="address"></label>
          <input 
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
            name="city" 
            type="text"  
            placeholder="City"
            value={state.city}
            onChange={handleChange}
            required
          />
        </span>
        <span>
          <label for="phoneNumber"></label>
          <input 
            name="phoneNumber" 
            type="number"  
            placeholder="Phone Number"
            value={state.phoneNumber}
            onChange={handleChange}
            required
          />
        </span>
        <div className="button-register">
          <button type="submit" class="submit-button" onClick={onSubmit}>Submit</button>
        </div>
      </form>
    </div>
  </div>
    )
  }
