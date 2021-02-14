const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const postCharge = require('./src/stripe')
require('dotenv').config()
const router = express.Router()

const stripePayment = () => {
  router.post('/', postCharge)
  router.all('*', (_, res) =>
    res.json({ message: 'please make a POST request to /stripe/charge' })
  )
  app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })
  app.use(bodyParser.json())
  app.use('/api', router)
  app.use(express.static(path.join(__dirname, '../build')))
  
  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '../build/index.html'))
  })

  return router
}

module.exports = stripePayment
