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
