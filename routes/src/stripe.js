const stripe = require('stripe')('sk_test_51I6Jt9HsmgbtTrbqZeHwe4pU1cmN7qxM1W3cN6W3OHrxGnHoT2zwfaFuhz6iJuD5HDgLwGPlOg2cFmYjPHqJt4pl00FiCiboql')

async function postCharge(req, res) {
  try {
    const { amount, source, receipt_email } = req.body

    const charge = await stripe.charges.create({
      amount,
      currency: 'cad',
      source,
      receipt_email
    })

    if (!charge) throw new Error('charge unsuccessful')

    res.status(200).json({
      message: 'charge posted successfully',
      charge
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = postCharge