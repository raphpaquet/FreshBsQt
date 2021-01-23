import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from 'react-stripe-elements'
import axios from 'axios'
import './CheckoutForm.css'


const CheckoutForm = ({ selectedProduct, stripe, history }) => {
  if (selectedProduct === null) history.push('/')

 
  const [receiptUrl, setReceiptUrl] = useState('')

   // session Storage to get the price
   const userPrice = JSON.parse(sessionStorage.getItem('total_price'))
   const totalPrice = (userPrice['totalPrice']).toFixed(2)

  const handleSubmit = async event => {
    event.preventDefault()

    const { token } = await stripe.createToken()

    console.log(selectedProduct)

    const order = await axios.post('http://localhost:3001/api/stripe/charge', {
      amount: 992,
      source: token.id,
      receipt_email: 'customer@example.com'
    })

    setReceiptUrl(order.data.charge.receipt_url)
  }

  if (receiptUrl) {
    return (
      <div className="success">
        <h2>Payment Successful!</h2>
        <a href={receiptUrl}>View Receipt</a>
        <Link to="/">Home</Link>
      </div>
    )
  }

  return (
  <div className="checkout-page">
    <div className="summary">
      <h1>Order Summary</h1>
      <span>list of products</span>
    </div>

    <div className="delivery">
    {/* <form className="delivery-form" action="/checkout" method="POST">
        <h1 className="facturation-title">Delivery</h1>
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
        <div className="button-register">
          <button 
            type="submit" 
            class="submit-button" 
            onClick={handleSubmitClick}>
              Submit
          </button>
        </div>
      </form> */}
    </div>

    <div className="checkout-form">
      <p>Amount: ${totalPrice}</p>
      <form onSubmit={handleSubmit}>
      <label>
          Full Name
          <input name="name" type="text"></input>
        </label>
        <label>
          Card details
          <CardNumberElement />
        </label>
        <label>
          Expiration date
          <CardExpiryElement />
        </label>
        <label>
          CVC
          <CardCVCElement />
        </label>
        <button type="submit" className="order-button">
          Pay
        </button>
      </form>
    </div>
  </div>
  )
}

export default injectStripe(CheckoutForm)
