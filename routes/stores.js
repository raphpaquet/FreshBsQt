const express = require('express');
const router = express.Router();
const db = require('../db')


module.exports = ({
  getStore
}) => {
  router.get('/', (req, res) => {
    getStore()
    .then((shops) => res.json(shops))
    .catch((err) => res.json({
      error: err.message
    }));
  })
  return router;
};