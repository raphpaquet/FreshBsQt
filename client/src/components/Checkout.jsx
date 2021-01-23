import React, { useEffect } from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'

const Checkout = ({ selectedProduct, history, user }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <StripeProvider apiKey="pk_test_51I6Jt9HsmgbtTrbqfCLFE3iOym9EzX83fUD26QzcT23sPMbAdp0lCcj0gev2ldujHpqI7HbTMa3unA5acP6UaN3U00AcA7HfMG">
      <Elements>
        <CheckoutForm user = {user} selectedProduct={selectedProduct} history={history} />
      </Elements>
    </StripeProvider>
  )
}

export default Checkout