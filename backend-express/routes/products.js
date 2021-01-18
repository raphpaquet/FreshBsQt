var express = require('express');
var router = express.Router();
const db = require('../db')


const { getUsers,
  getUserByEmail,
  addUser,
  getProducts} = require('../helpers/dbHelpers')(db);

getProducts()


module.exports = router