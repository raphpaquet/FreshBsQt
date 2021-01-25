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
import { finalCart } from './ItemDropDown'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const CheckoutForm = ({ selectedProduct, stripe, history, user }) => {
  //to handle whether the checkbox is toggled or not
  const [toggled, setToggled] = useState(false)
  const [state, setState] = useState({
    first_name:"",
    last_name:"",
    email:"",
    address:"",
    city:"",
  })

console.log('user' , user)


  const listProductsInCart = () => (finalCart.filter((v, i) => finalCart.indexOf(v) === i).map((product) =>
  ( <tr className="summary-product">
      <img className="summary-image" src={product.image} style={{width:"30px", height:"30px"}}></img>
      <span className="summary-name">{product.name}</span>
      <span className="summary-price">{(product.price).toFixed(2)}$</span>
  </tr>
  )
));


  //handles the conditionals associated to the toggled state 
  useEffect(()=>{
    if(toggled) {
      setState((prevState)=>{
        return {...prevState, first_name: user.first_name, last_name: user.last_name, email: user.email, address: user.address, city: user.city}
      })
    } else {
      setState((prevState)=>{
        return {...prevState, first_name: "", last_name: "", email: "", address: "", city: ""}
      })
    }
  }, [toggled])



  const handleChange = (e) => {
    const { id, value } = e.target
    console.log(e.target.value)
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }
  if (selectedProduct === null) history.push('/')
  const [receiptUrl, setReceiptUrl] = useState('')

  const backToShop = history.push('/')

  // session Storage to get the price
  const userPrice = JSON.parse(sessionStorage.getItem('total_price'))
  const totalPrice = (userPrice['totalPrice']).toFixed(2)
  const stripeTotal = sessionStorage.getItem('stripeTotal')
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
        {<video autoPlay muted id="background-video">
          <source src="/video/shoplocal.mp4" type="video/mp4" style={{right:"8px"}}/>
        </video>}
        <h2>Payment Successful!</h2>
        <h3 className="success-email">A confirmation email has been sent to {user.email}</h3>
        <a href={receiptUrl}>View Receipt</a>
        <Link to="/">Home</Link>
      </div>
    )
  }
  return (
  <div className="checkout-page" style={{ backgroundImage: "url('../images/lemon.jpg')"}}>
    <button className="back-to-shop">
      <ArrowBackIcon onClick={backToShop}/>
    </button>
      <div className="page-title">
          <h1>Summary</h1>
          <ShoppingBasketIcon />
      </div>
    <div className="containers">
      <div className="checkout-info">
        <div className="summary">
          <span className="summary-title">list of products</span>
          <table className="summary-list">{
            listProductsInCart()
          }
          </table>
        </div>
        <div className="delivery">
          <span className="facturation-title">Delivery</span>
          <form className="delivery-form" action="/checkout" method="POST">
            <span>
              <input 
                type="checkbox" 
                id="defaultAddress"
                className={user ? 'shown' : 'hidden'}
                value={toggled}
                onChange={(event)=> {
                  setToggled(event.target.checked)
                }}
                name="defaultAddress">
              </input>
              <label className={user ? 'shown' : 'hidden'} for="defaultAddress" style={{letterSpacing:"0em", textTransform:"lowercase", margin:"0"}}>Use my default information</label>
            </span>
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
                style={{width: '300px'}}
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
                style={{width: '300px'}}
              />
            </span>
            <span>
              <label for="email"></label>
              <input 
                id="email"
                name="email" 
                type="text"  
                placeholder="Email"
                value={state.email}
                onChange={handleChange}
                required
                style={{width: '300px'}}
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
                style={{width: '300px'}}
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
                style={{width: '300px'}}
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
          <button type="submit" className="pay-btn submit-button" style={{marginLeft:"140px"}}>
            Pay
          </button>
        </form>
        <h3>Thanks for using NAME</h3>
      </div>
    </div>
    </div>
  )
}
export default injectStripe(CheckoutForm)