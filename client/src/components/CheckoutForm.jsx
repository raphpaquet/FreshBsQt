import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from 'react-stripe-elements'
import axios from 'axios'
import './CheckoutForm.css'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import { defaultLoadScriptProps } from '@react-google-maps/api/dist/LoadScript'


const CheckoutForm = ({ selectedProduct, stripe, history, user }) => {
  const [toggled, setToggled] = useState(false)
  const [state, setState] = useState({
    first_name:"",
    last_name:"",
    address:"",
    city:"",
  })

  useEffect(()=>{
    if(toggled) {
      setState((previousState)=>{
        return {...previousState, first_name: user.first_name, last_name: user.last_name, address: user.address, city: user.city}
      })
    } else {
      setState((previousState)=>{
        return {...previousState, first_name: "", last_name: "", address: "", city: ""}
      })
    }
  }, [toggled])

  const handleChange = (e) => {
    const { id, value } = e.target
    console.log(e.target.value)
    setState(prevState => ({
      ...prevState, 
      [id] : value
    }))
  }

  if (selectedProduct === null) history.push('/')

 
  const [receiptUrl, setReceiptUrl] = useState('')

  // const history = useHistory()
  const backToShop = history.push('/shop')


   // session Storage to get the price
   const userPrice = JSON.parse(sessionStorage.getItem('total_price'))
   const totalPrice = (userPrice['totalPrice']).toFixed(2)

   

  const handleSubmit = async event => {
    event.preventDefault()

    const { token } = await stripe.createToken()

    console.log(selectedProduct)

    const order = await axios.post('/api/stripe/charge', {
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
    <video autoPlay loop muted id="background-video">
          <source src="/video/pie.mp4" type="video/mp4" />
        </video>
    <button className="back-to-shop">
      <ArrowBackIcon onClick={backToShop}/>
    </button>
    <div className="page-title">
        <h1>Summary</h1>
        <ShoppingBasketIcon />
    </div>
    <div className="checkout-info">
      <div className="summary">
        <span className="summary-title">list of products</span>
        <ul style={{listStyle:"none", display:"flex", flexDirection:"column", padding:"8px"}}>
          <li>Rasberries 5.99</li>
          <li>Rasberries 5.99</li>
          <li>Rasberries 5.99</li>
        </ul>
      </div>

      <div className="delivery">
        <span className="facturation-title">Delivery</span>
        <form className="delivery-form" action="/checkout" method="POST">
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
          <span>
            <input 
              type="checkbox" 
              id="defaultAddress"
              value={toggled}
              onChange={(event)=> {
                setToggled(event.target.checked)
              }}
              name="defaultAddress">
            </input>
            <label for="defaultAddress" style={{letterSpacing:"0em", textTransform:"lowercase", margin:"0"}}>Use my default information</label>
          </span>
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
        </form>
      </div>
    </div>

    <div className="checkout-form">
      <p style={{border:"1px solid lightgray", padding:"2px"}}>Credit Cart Details</p>
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
        <button type="submit" className="pay-btn submit-button">
          Pay
        </button>
      </form>
      <h3>Thanks for shopping local</h3>
    </div>
  </div>
  )
}

export default injectStripe(CheckoutForm)
