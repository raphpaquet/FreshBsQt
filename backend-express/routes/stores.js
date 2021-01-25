const express = require('express');
const router = express.Router();
const db = require('../db')


module.exports = ({
  getStores
}) => {
  router.get('/', (req, res) => {
    getStores()
    .then((stores) => res.json(stores))
    .catch((err) => res.json({
      error: err.message
    }));
  })
  return router;
};